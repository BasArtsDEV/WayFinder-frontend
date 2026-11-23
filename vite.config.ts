import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA as vitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    vitePWA({
      devOptions: {
        enabled: true,
        type: "module",
      },
      filename: "sw.js",
      includeAssets: [
        "app-icon.ico",
        "favicon.svg",
        "icons/*.png",
        "icons/*.svg",
        "fonts/*.woff2",
        "css/*.css",
      ],
      manifest: {
        background_color: "#f0d6a4",
        description:
          "WayFinder - Application de chasses au trésor interactives.",
        display: "standalone",
        icons: [
          {
            purpose: "any",
            sizes: "192x192",
            src: "/icons/pwa-192x192.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "/icons/pwa-512x512.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "/icons/pwa-maskable-512x512.png",
            type: "image/png",
          },
        ],
        lang: "fr",
        name: "WayFinder",
        short_name: "WayFinder",
        start_url: "/",
        theme_color: "#57a841",
      },
      registerType: "prompt",
      srcDir: "src",
      strategies: "injectManifest",
    }),
  ],
});
