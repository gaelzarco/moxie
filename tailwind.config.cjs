const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  content: [ "./src/**/*.{js,ts,jsx,tsx}" ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakartaSans)', ...fontFamily.sans],
      },
      width: {
        '750': '750px',
      },
      keyframes: {
        // Toast
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
          to: { transform: 'translateX(0)' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },

        // Hover Card
        slideUpAndFade: {
          '0%': { opacity: 0, transform: 'translateY(-65px)' },
          '100%': { opacity: 1, transform: 'translateY(-40%)' },
        },
        slideRightAndFade: {
          '0%': { opacity: 0, transform: 'translateX(-2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideDownAndFade: {
          '0%': { opacity: 0, transform: 'translateY(-2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          '0%': { opacity: 0, transform: 'translateX(2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        //Toast
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',

        // Hover Card
        slideUpAndFade: 'slideUpAndFade 200ms cubic-bezier(0.16, 0, 0.13, 1)',
        slideDownAndFade: 'slideDownAndFade 200ms cubic-bezier(0.16, 0, 0.13, 1)',
        slideRightAndFade: 'slideRightAndFade 200ms cubic-bezier(0.16, 0, 0.13, 1)',
        slideLeftAndFade: 'slideLeftAndFade 200ms cubic-bezier(0.16, 0, 0.13, 1)',
      },

    },
  },
  variants: {
    width: ["responsive", "hover", "focus"]
},
  plugins: [],
};

module.exports = config;
