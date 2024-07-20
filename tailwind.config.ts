import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/_posts/**/*.{js,ts,jsx,tsx,mdx}",
    "./examples/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: [
    'variant', [
      '&:is(.dark *)',
      'media (prefers-color-scheme: dark) { & * }'
    ]
  ],
  theme: {
    extend: {
      aspectRatio: {
        'project-closed': '195 / 244',
      },
      colors: {
        'foreground': 'var(--color--foreground)',
        'background': 'var(--color--background)',
        'primary': 'var(--color--primary)',
        'secondary': 'var(--color--secondary)',
        'underline': 'var(--color--underline)',
      },
      spacing: {
        '18': '4.5rem',
      },
      lineHeight: {
        '12': '3rem',
      },
    },
  },
  plugins: [],
};
export default config;
