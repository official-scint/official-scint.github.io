import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://scint.org",
  integrations: [react()],
  build: {
    format: "directory",
  },
});
