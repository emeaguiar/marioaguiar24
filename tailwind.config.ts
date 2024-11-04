import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/_posts/**/*.{js,ts,jsx,tsx,mdx}',
    './examples/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        glow: 'glow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      aspectRatio: {
        'project-closed': '195 / 244',
      },
      colors: {
        foreground: 'var(--color--foreground)',
        background: 'var(--color--background)',
        primary: 'var(--color--primary)',
        secondary: 'var(--color--secondary)',
        underline: 'var(--color--underline)',
      },
      keyframes: {
        glow: {
          '0%, 100%': {
            opacity: '0.2',
            transform: 'scale(1.5)',
          },
          '50%': {
            opacity: '0.2',
            transform: 'scale(1)',
          },
        },
      },
      spacing: {
        '18': '4.5rem',
      },
      lineHeight: {
        '12': '3rem',
      },
    },
  },
  plugins: [typography],
};
export default config;
