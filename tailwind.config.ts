import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        // Tema claro personalizado
        light: {
          primary: "#1E40AF", // Azul oscuro
          "primary-focus": "#1D4ED8", // Azul más vibrante
          "primary-content": "#ffffff", // Texto en botones primarios

          secondary: "#9333EA", // Púrpura
          "secondary-focus": "#7C3AED",
          "secondary-content": "#ffffff",

          accent: "#FACC15", // Amarillo
          "accent-focus": "#EAB308",
          "accent-content": "#1E3A8A", // Texto en acentos

          neutral: "#374151", // Gris oscuro
          "neutral-focus": "#1F2937",
          "neutral-content": "#ffffff",

          "base-100": "oklch(0.85 0.01 272.45)", // Fondo principal
          "base-200": "#F3F4F6", // Fondo secundario
          "base-300": "#D1D5DB", // Bordes y otros
          "base-content": "#1E293B", // Texto general

          info: "#3B82F6", // Azul para información
          success: "#22C55E", // Verde para éxito
          warning: "#F59E0B", // Amarillo para advertencias
          error: "#EF4444", // Rojo para errores
        },

        // Tema oscuro personalizado
        dark: {
          primary: "#3B82F6", // Azul
          "primary-focus": "#2563EB",
          "primary-content": "#ffffff",

          secondary: "#9333EA",
          "secondary-focus": "#7C3AED",
          "secondary-content": "#ffffff",

          accent: "#FACC15",
          "accent-focus": "#EAB308",
          "accent-content": "#1E293B",

          neutral: "#1E293B", // Gris muy oscuro
          "neutral-focus": "#111827",
          "neutral-content": "#ffffff",

          "base-100": "#1E293B", // Fondo principal oscuro
          "base-200": "#111827", // Fondo más oscuro
          "base-300": "#374151", // Bordes y otros
          "base-content": "#F9FAFB", // Texto general claro

          info: "#60A5FA",
          success: "#34D399",
          warning: "#FBBF24",
          error: "#F87171",
        },
      },
    ],
  },
};
export default config;
