export const site = {
  name: "SCINT",
  fullName: "SCINT 北臺灣學生資訊社群",
  url: "https://scint.org",
  ogImage: "/assets/og-image.png",
  foundedYear: 2023,
  email: "contact@scint.org",
};

export const links = {
  discord: "https://discord.scint.org/",
  instagram: "https://www.instagram.com/scint.tw/",
  facebook: "https://www.facebook.com/scint.tw/",
  github: "https://github.com/official-scint",
  linktree: "https://linktr.ee/scint.tw",
  join: "https://join.scint.org",
  eventsApi: "https://api.scint.org/events",
};

export const partners = [
  {
    name: "HackMD",
    image: "/assets/sponsors/hackmd-on-light.png",
    imageDark: "/assets/sponsors/hackmd-on-dark.png",
    url: "https://hackmd.io/",
  },
  {
    name: "NCSE",
    image: "/assets/sponsors/ncse-on-dark.png",
    url: "https://sponsor.ncse.tw/",
  },
  {
    name: "台灣駭客協會 HIT",
    image: "/assets/sponsors/hit.png",
    imageDark: "/assets/sponsors/hit-on-dark.png",
    url: "https://hacker.org.tw/",
    scale: 1.3,
  },
  {
    name: "開放文化基金會 OCF",
    image: "/assets/sponsors/ocf.png",
    imageDark: "/assets/sponsors/ocf-on-dark.png",
    url: "https://ocf.tw/",
    scale: 0.55,
  },
  {
    name: "GOSCUP",
    image: "/assets/sponsors/goscup.png",
    imageDark: "/assets/sponsors/goscup-on-dark.png",
    url: "https://www.goscup.com/",
    scale: 1.2,
  },
  {
    name: "AIS3 Club",
    image: "/assets/sponsors/ais3.png",
    url: "https://ais3.org/",
    scale: 0.85,
  },
];

export const socials = [
  { label: "Discord", href: links.discord },
  { label: "Instagram", href: links.instagram },
  { label: "Facebook", href: links.facebook },
  { label: "GitHub", href: links.github },
  { label: "Email", href: `mailto:${site.email}` },
];
