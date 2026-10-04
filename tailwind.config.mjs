/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        emberly: {
          orange: '#F26B1D',
          'orange-hover': '#D9590E',
          'orange-tint': '#FFF1E8',
          charcoal: '#3F4650',
          'dark-charcoal': '#2B2F36',
          'mid-gray': '#6B7280',
          'light-gray': '#E5E7EB',
          'warm-white': '#FAF7F4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
        'lift': '0 10px 25px -3px rgba(43, 47, 54, 0.08), 0 4px 6px -4px rgba(43, 47, 54, 0.04)',
        'pill': '0 4px 20px -2px rgba(43, 47, 54, 0.08)',
      },
      maxWidth: {
        'site': '1200px',
      }
    },
  },
  plugins: [],
};
