import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    // Meta
    name: "Pennywise Budget",
    short_name: "Pennywise",
    description: "A terrifyingly simple budget tracker",
    categories: ["money", "finance", "budgeting", "utility"],

    // Localization
    lang: "en",
    start_url: "/manage/dash",

    // Display
    display: "standalone",
    orientation: "natural",

    // Theming
    theme_color: "#ffffff",
    background_color: "#000000",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ],
  }
}