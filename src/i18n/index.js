import { zh } from "./locales/zh.js";
import { en } from "./locales/en.js";

export const LANGS = ["zh", "en"];
export const DEFAULT_LANG = "zh";

export const content = { zh, en };

export const getContent = (lang) => content[lang] ?? content[DEFAULT_LANG];

export const path = (lang, to = "/") =>
  lang === DEFAULT_LANG ? to : `/en${to === "/" ? "/" : to}`;
