const socialIconMap = {
  facebook: "fa-brands fa-facebook",
  instagram: "fa-brands fa-instagram",
  website: "fa-solid fa-globe",
  discord: "fa-brands fa-discord",
};

function onMounted() {
  const navbar = document.querySelector(".navbar-links");
  const navbarButton = document.querySelector(".navbar-toggle");

  document.querySelectorAll(".navbar a[href^='#']").forEach((element) => {
    element.addEventListener("click", (event) => {
      const targetId = element.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;
      targetElement.scrollIntoView({ behavior: "smooth" });
      navbar?.classList.remove("active");
      navbarButton?.setAttribute("aria-expanded", "false");
      event.preventDefault();
    });
  });

  navbarButton?.addEventListener("click", () => {
    const isActive = navbar?.classList.toggle("active") ?? false;
    navbarButton.setAttribute("aria-expanded", String(isActive));
  });
}

async function fetchJson(url, fallbackValue) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(error);
    return fallbackValue;
  }
}

function stripConfiguredHtml(value) {
  return String(value)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .trim();
}

function setParagraphWithBreaks(element, value) {
  element.replaceChildren();
  const parts = stripConfiguredHtml(value).split(/\n+/);
  parts.forEach((part, index) => {
    if (index > 0) element.appendChild(document.createElement("br"));
    element.appendChild(document.createTextNode(part));
  });
}

function createExternalLink(href, className, label) {
  const link = document.createElement("a");
  link.href = href;
  link.className = className;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.ariaLabel = label;
  return link;
}

function loadAbout(config) {
  const cards = document.querySelectorAll("[data-about-list] .content-card p");
  config["about-us"]?.forEach((content, index) => {
    if (cards[index]) setParagraphWithBreaks(cards[index], content);
  });
}

function createClubCard(club) {
  const card = document.createElement("article");
  card.className = "club-card";

  const image = document.createElement("img");
  image.className = "club-image";
  image.src = club.image;
  image.alt = `${club.school} ${club.name}`;
  card.appendChild(image);

  const info = document.createElement("div");
  info.className = "club-info";

  const school = document.createElement("p");
  school.className = "club-school";
  school.textContent = club.school;
  info.appendChild(school);

  const name = document.createElement("p");
  name.className = "club-name";
  name.textContent = club.name;
  info.appendChild(name);

  const socials = document.createElement("div");
  socials.className = "club-socials";
  for (const social of club.socials ?? []) {
    const iconClass = socialIconMap[social.name];
    if (!iconClass) continue;
    const link = createExternalLink(social.url, "", `${club.school} ${social.name}`);
    const icon = document.createElement("i");
    icon.className = iconClass;
    link.appendChild(icon);
    socials.appendChild(link);
  }
  info.appendChild(socials);
  card.appendChild(info);

  return card;
}

function loadClubs(config) {
  const clubs = config.clubs ?? [];
  const featured = document.querySelector("[data-featured-clubs]");
  const list = document.querySelector("[data-club-list]");
  const clubCount = document.querySelector("[data-club-count]");

  if (clubCount) clubCount.textContent = String(clubs.length);
  featured?.replaceChildren(...clubs.slice(0, 3).map(createClubCard));

  if (!list) return;
  list.replaceChildren();
  for (const club of clubs) {
    const card = document.createElement("div");
    card.className = "club-small-card";
    card.dataset.name = `${club.school} ${club.name}`;

    const image = document.createElement("img");
    image.className = "club-avatar";
    image.src = club.image;
    image.alt = `${club.school} ${club.name}`;
    card.appendChild(image);
    list.appendChild(card);
  }
}

function loadSponsors(config) {
  const sponsorGroupElement = document.querySelector("[data-sponsor-list]");
  if (!sponsorGroupElement) return;

  sponsorGroupElement.replaceChildren();
  for (const { image, url } of config.sponsors ?? []) {
    const sponsorCardElement = createExternalLink(url, "sponsor-card", "合作單位");
    const sponsorImage = document.createElement("img");
    sponsorImage.src = image;
    sponsorImage.alt = "合作單位 logo";
    sponsorCardElement.appendChild(sponsorImage);
    sponsorGroupElement.appendChild(sponsorCardElement);
  }
}

function formatCalendarDate(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function hasValidDate(value) {
  return !Number.isNaN(new Date(value).getTime());
}

function buildCalendarUrl(event) {
  const startTime = new Date(event.scheduled_start_time);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.name ?? "SCINT 活動",
    dates: `${formatCalendarDate(startTime)}/${formatCalendarDate(startTime)}`,
    details: event.description ?? "",
    sf: "true",
    output: "xml",
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

function createEventCard(event) {
  const card = document.createElement("article");
  card.className = "event-card";

  const details = document.createElement("div");
  details.className = "event-details";

  const title = document.createElement("h3");
  title.className = "event-title";
  title.textContent = event.name ?? "SCINT 活動";
  details.appendChild(title);

  if (event.description) {
    const description = document.createElement("p");
    description.className = "event-description";
    description.textContent = event.description;
    details.appendChild(description);
  }

  if (hasValidDate(event.scheduled_start_time)) {
    const buttons = document.createElement("div");
    buttons.className = "event-buttons";
    const calendarLink = createExternalLink(buildCalendarUrl(event), "event-button", "添加到行事曆");
    calendarLink.textContent = "添加到行事曆";
    buttons.appendChild(calendarLink);
    details.appendChild(buttons);
  }
  card.appendChild(details);

  if (event.id && event.image) {
    const image = document.createElement("img");
    image.className = "event-image";
    image.src = `https://cdn.discordapp.com/guild-events/${event.id}/${event.image}?size=2048`;
    image.alt = event.name ?? "活動圖片";
    card.appendChild(image);
  }

  return card;
}

async function loadEvents() {
  const eventsContainer = document.querySelector("[data-events-list]");
  if (!eventsContainer) return;

  const events = await fetchJson("https://api.scint.org/events", []);
  eventsContainer.replaceChildren();

  if (!Array.isArray(events) || events.length === 0) {
    const message = document.createElement("p");
    message.className = "state-message";
    message.textContent = "近期沒有公開活動。你可以加入 Discord 或查看 Linktree 追蹤最新公告。";
    eventsContainer.appendChild(message);
    return;
  }

  eventsContainer.append(...events.map(createEventCard));
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}

async function initDynamicContent() {
  const config = await fetchJson("config.json", {
    "about-us": [],
    clubs: [],
    sponsors: [],
  });

  loadAbout(config);
  loadClubs(config);
  loadSponsors(config);
}

initReveal();
initDynamicContent();
loadEvents();
