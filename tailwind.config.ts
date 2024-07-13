import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'foreground': 'var(--color--foreground)',
        'background': 'var(--color--background)',
        'primary': 'var(--color--primary)',
        'secondary': 'var(--color--secondary)',
      }
    },
  },
  plugins: [],
};
export default config;
