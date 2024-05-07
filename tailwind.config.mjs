/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./src/**/*.{js,jsx}'],
  variants: {
    extend: {
      opacity: ['group-hover'],
      transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
      backdropFilter: ['responsive'], // this line is important
    },
  },
  theme: {
    extend: {
      transitionProperty: {
        opacity: 'opacity',
        transform: 'transform',
      },
      backdropFilter: {
        none: 'none',
        blur: 'blur(20px)',
      },
      colors: {
        primary: '#1F2023',
        secondary: '#161718',
        borderGray: '#303236',
        borderPurple: '#5858e6',
        generatorParam: '#232426',
        sliderLabel: '#d7d8db',
        dimWhite: 'rgba(255, 255, 255, 0.7)',
        dimBlue: 'rgba(9, 151, 124, 0.1)',
      },
      screens: {
        xs: '480px',
      },
      fontFamily: {
        inter: [
          'Inter',
          '-apple-system',
          'system-ui',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Inter var',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)',
        cardhover: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)',
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
  important: true,
});
