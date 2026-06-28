/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00342b',
        'primary-container': '#004d40',
        secondary: '#325ab2',
        background: '#f8f9fa',
        surface: '#ffffff',
        'surface-container': '#edeeef',
        'on-surface': '#191c1d',
        'on-surface-variant': '#3f4945',
        outline: '#707975',
        'border-subtle': '#E0E0E0',
        error: '#D32F2F',
        'status-progress': '#FBC02D',
        'status-completed': '#2E7D32',
        'status-verified': '#1976D2',
        'text-main': '#2E363A',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        soft: '4px',
        card: '8px',
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
};
