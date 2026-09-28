export const en = {
  htmlLang: "en",
  label: "English",
  other: { code: "zh", label: "中文", href: "/" },

  meta: {
    title: "SCINT — Student Computing Community, Northern Taiwan",
    brandingTitle: "Brand Manual — SCINT",
    description:
      "SCINT connects high school computing clubs across Taiwan with events, courses, practice contests, and collaboration support.",
    og: "Connecting student computing communities so cross-school exchange and shared resources actually happen.",
    brandingDescription: "SCINT logo, palette, and usage rules.",
    orgName: "SCINT — Student Computing Community, Northern Taiwan",
  },

  nav: [
    { id: "events", label: "Events" },
    { id: "services", label: "Services" },
    { id: "programs", label: "Programs" },
    { id: "clubs", label: "Clubs" },
    { id: "join", label: "Collaborate" },
    { id: "about", label: "About" },
  ],

  ui: {
    skip: "Skip to main content",
    home: "Home",
    menu: "Menu",
    themeToggle: "Toggle day / night edition",
    langToggle: "切換為中文",
    back: "Back to home",
    toTop: "Back to top",
    masthead: "Student Computing Community · Northern Taiwan",
    loading: "Loading events",
    empty: "No public events right now.",
    failed: "Couldn't reach the events feed.",
    goDiscord: "Check announcements on Discord",
    addCalendar: "Add to calendar",
    today: "Today",
    tomorrow: "Tomorrow",
    past: "Ended",
    tba: "TBA",
  },

  hero: {
    title: ["SCINT Northern Taiwan", "Student Computing"],
    lede:
      "SCINT connects high school computing clubs across northern Taiwan — running events, teaching courses, holding contests, and pooling what each of us has. So students don't have to work it out alone, and club officers don't have to start from scratch every year.",
    ctaPrimary: "Join our Discord",
    ctaSecondary: "See upcoming events",
    stats: [
      { k: "Partner clubs", v: "clubs" },
      { k: "Open to", v: "scope" },
      { k: "Years running", v: "years" },
    ],
  },

  sections: {
    events: {
      n: "02",
      en: "Events",
      title: "Upcoming events",
      note: "Synced from the SCINT Discord. Everything listed here is currently open.",
      all: "All event links",
      announce: "Discord announcements",
    },
    services: {
      n: "03",
      en: "Services",
      title: "What we can help with",
      note: "Each service lists who it suits, the support we provide, and what you'll need ready before applying.",
      cta: "Send us a request",
      form: { title: "Service request", item: "Item", category: "Category" },
    },
    programs: {
      n: "04",
      en: "Programs",
      title: "Programs in motion",
      running: (n) => `${n} running`,
      doneHead: "Already wrapped",
    },
    clubs: {
      n: "05",
      en: "Clubs",
      title: (n) => `${n} partner clubs`,
      note: "These blocks can be dragged and thrown; a click knocks one away. Club links are in the roster below.",
      reset: "Drop them again",
    },
    join: {
      n: "06",
      en: "Collaboration",
      title: "Want to build something with SCINT?",
      lede: "Wherever you're based, clubs, communities and organisations are all welcome to propose something. The process is straightforward — roughly these four steps.",
      ctaPrimary: "Open the request form",
      ctaSecondary: "Email us instead",
      partners: "Partners",
    },
    about: {
      n: "07",
      en: "About",
      title: "Resources shouldn't pile up in a handful of schools",
      lede:
        "SCINT began with a few student clubs in northern Taiwan. Through events, courses, contests and club collaborations — online and in person — it has been connecting resources that were scattered across schools.",
      faqTitle: "Still wondering?",
    },
  },

  about: [
    {
      key: "Our principles",
      body: [
        "Computing resources are unevenly distributed: some schools have everything, others struggle to keep a club session running. We want to narrow that gap.",
        "Working it out alone is slow. A group covering for each other is much faster.",
      ],
    },
    {
      key: "Our goals",
      body: [
        "Pool resources into online talks, practice contests and exchanges between clubs.",
        "Lower the barrier to entry, and keep clubs from having to do everything on their own.",
      ],
    },
    {
      key: "Our members",
      body: [
        "Most members come from high school and vocational clubs in the north, with people from computing communities further south as well.",
        "That mix of backgrounds is what gives the community its range, and its energy.",
      ],
    },
  ],


  services: [
    {
      tag: "Events & courses",
      title: "Event co-hosting",
      body: "Support with planning, staffing, promotion and sponsor coordination, matched to where you're short. We're on site on the day too.",
      specs: [
        ["Suits", "Talks, workshops, contests, meetups"],
        ["We bring", "Planning, staff, cross-school promotion"],
        ["You bring", "Goals, timeline, what you need"],
      ],
    },
    {
      tag: "Compute",
      title: "Cloud resources",
      body: "When a club session, event or project needs compute, you can apply to SCINT for VM support.",
      specs: [
        ["Suits", "Courses, events, projects, short-term services"],
        ["We bring", "Virtual machines and related resources"],
        ["You bring", "Purpose, duration, specs required"],
      ],
    },
    {
      tag: "Reach",
      title: "Community promotion",
      body: "We help events reach students through the SCINT channels — before they happen, not after.",
      specs: [
        ["Suits", "Student computing events and announcements"],
        ["We bring", "Social media and Discord promotion"],
        ["You bring", "Key visual, copy, signup details"],
      ],
    },
  ],

  programs: [
    {
      title: "APCS mock exams",
      status: "running",
      body: "A mock exam every month, so the question types and pacing are familiar by the time the real one comes around.",
    },
    {
      title: "One-Day Computing Camp 2026",
      status: "running",
      body: "A tour of all four regions — north, central, south and east. Beginner courses and hands-on work, so students can see what the field actually involves.",
      href: "https://reurl.cc/R2kA4G",
      hrefLabel: "Sign-up link",
    },
    {
      title: "Stage forum",
      status: "running",
      body: "Speakers from different fields talk about what they're working on, showing students a wider view of computing.",
    },
    {
      title: "THJCC security contest",
      status: "running",
      body: "A security competition for high school students, where attack, defence and problem solving are all hands-on.",
    },
    {
      title: "Joint contests & open courses",
      status: "done",
      body: "Contests, courses and workshops introducing programming, security, networking and hardware.",
    },
    {
      title: "CVE workshop",
      status: "done",
      body: "Reading a vulnerability from root cause through to a real case, showing how security research is actually done.",
    },
  ],

  joinSteps: [
    ["01", "Fill in the request form", "Tell us what you'd like to do, the expected timing, the support you need, and how to reach you."],
    ["02", "First contact", "We follow up through the channel you gave us to confirm the details and feasibility."],
    ["03", "Agree the scope", "We align on responsibilities, schedule and resources, with a call if needed."],
    ["04", "Run it, then review", "Afterwards we write up the results, which form the basis for the next collaboration."],
  ],

  faq: [
    {
      q: "Do we have to be a northern club to work with you?",
      a: "No. The name says northern Taiwan, but clubs, communities and organisations anywhere in the country are welcome to propose something.",
    },
    {
      q: "What do we need for event promotion?",
      a: "Event name, time and place, signup link, key visual, a short blurb, and a contact person. The more complete it is, the easier scheduling becomes.",
    },
    {
      q: "Can I join without a club?",
      a: "Yes. Most online talks, mock exams and practice contests are open to individuals — join the Discord and follow the announcements.",
    },
    {
      q: "Where do I follow the latest news?",
      a: "Discord is the fastest; Instagram, Facebook and the Linktree event links are kept in sync.",
    },
  ],

  branding: {
    title: "Brand manual",
    lede: "SCINT's logo, palette and usage rules. Please follow these for club posters, event visuals and press material.",
    surfaceLabel: "Preview on",
    surfaces: { dark: "Dark", light: "Light", brand: "Brand blue" },
    logoHead: { n: "01", en: "Logo", title: "The logo" },
    logoNote:
      "Available as a wordmark lockup and as the mark alone. Never distort, redraw, recolour or add effects to the logo itself.",
    download: "Download PNG",
    paletteHead: { n: "02", en: "Palette", title: "Palette" },
    paletteNote:
      "Every colour comes from the logo: the letters give the blue-to-green spectrum, the bolt gives the gold. Gold used everywhere stops being the accent.",
    usageHead: { n: "03", en: "Usage", title: "Writing it, and what not to do" },
    writing: "Writing the name",
    writingBody: [
      "In plain text, write the short form as SCINT — all five letters capitalised. Where space allows, the full name is 「SCINT 北臺灣學生資訊社群」.",
      "Mind the space between the Latin and Chinese characters.",
    ],
    dontHead: "Please don't",
    logos: [
      { file: "/assets/logo.png", label: "Primary lockup", note: "Wordmark with the mark. Use this by default." },
      { file: "/assets/logo-square.png", label: "Square", note: "Avatars, stickers, fixed-ratio slots." },
      { file: "/assets/logo-circle.png", label: "Circle", note: "Social platform avatars." },
      { file: "/assets/logo-middle.png", label: "Mark only", note: "Tight space, or where SCINT is already written." },
    ],
    examples: {
      ok: ["SCINT 北臺灣學生資訊社群"],
      no: ["Scint北臺灣學生資訊社群", "SCINT北台灣學生資訊社群"],
    },
    donts: [
      "Don't distort, stretch or rotate the logo",
      "Don't recolour it or add a gradient",
      "Don't add shadows, outlines or glows",
      "Don't place it on a low-contrast background",
      "Don't redraw or recreate it yourself",
    ],
  },

  subscribe: {
    head: "Subscribe",
    note: "A notification email when signups open. Nothing else.",
    email: "Email",
    name: "Name (optional)",
    list: "Event updates",
    submit: "Subscribe",
    captcha: {
      label: "I'm not a robot",
      verifying: "Verifying…",
      verified: "Verified",
      error: "Verification failed. Please try again later.",
      expired: "Verification expired. Please verify again.",
      waitAlert: "Verifying, please wait.",
    },
  },

  footer: {
    desc: "Connecting student computing communities, so cross-school exchange and shared resources actually happen.",
    siteHead: "This site",
    contactHead: "Contact",
    siteLinks: [
      { label: "Upcoming events", href: "#events" },
      { label: "Services", href: "#services" },
      { label: "Partner clubs", href: "#clubs" },
    ],
    brandingLink: "Brand manual",
    joinLink: "Collaboration form",
  },
};
