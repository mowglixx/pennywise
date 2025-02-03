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
    start_url: "/manage/dashboard",

    // Display
    display: "standalone",
    orientation: "natural",

    // Theming
    theme_color: "#a44698",
    background_color: "#0b040b",
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