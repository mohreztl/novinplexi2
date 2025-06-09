
/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';
export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{js,jsx}",
  "./components/**/*.{js,jsx}",
  "./app/**/*.{js,jsx}",
  "./src/**/*.{js,jsx}",
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    // screens: {
    //   "2xl": "1400px",
    // },
    screens: {
      '2xl': '86rem',
      lg: '64rem',
      md: '48rem',
      sm: '40rem',
      xl: '80rem',
    },
  },
  
  extend: {
    colors: {
      blues: {
        DEFAULT: '#31508c',
        50: '#f0f5ff',
        100: '#e0eaff',
        200: '#c7d7fe',
        300: '#a5b8fd',
        400: '#8193fa',
        500: '#6370f5',
        600: '#4a50e7',
        700: '#3b3cd3',
        800: '#31508c', // رنگ اصلی
        900: '#172554', // تیره‌تر
        950: '#0f172a'
      },
      
      // پالت رنگ طلایی (gold)
      gold: {
        DEFAULT: '#ffd700',
        50: '#fffdf0',
        100: '#fff9c2',
        200: '#fff38a',
        300: '#ffe74d',
        400: '#ffd700', // رنگ اصلی (DEFAULT)
        500: '#e6c300',
        600: '#ccaa00',
        700: '#b38f00',
        800: '#997500',
        900: '#806000',
        950: '#4d3a00'
      },
      border: "hsl(var(--border))",
      colorOne: "#6482AD",
      colorTwo: "#7FA1C3",
      colorThree: "#E2DAD6",
      colorFour: "#F5EDED",
      myButtonHover: "#405D72",
      lightDark: "#31363F",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },

      boxShadow: {
        neon: "0 0 15px #3498db", // Change the color to your desired neon color
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      text: {
        "0%, 100%": {
          "background-size": "200% 200%",
          "background-position": "left center",
        },
        "50%": {
          "background-size": "200% 200%",
          "background-position": "right center",
        },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      "spin-slow": "spin 20s linear infinite",
    },
    backgroundImage: {
      "gradient-sky": "linear-gradient(to top, rgba(117, 234, 255, 0.61), rgba(255, 0, 0, 0))",
    },
    fontFamily: {
      yekanbakh: 'var(--font-yekanbakh)', // استفاده از متغیر فونت
    },
  },
};
export const plugins = [
  tailwindcssAnimate,

  function ({ addUtilities }) {
    const newUtilities = {
      ".bg-grid-pattern": {
        "background-image": "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)",
        "background-size": "20px 20px",
      },
    };
    addUtilities(newUtilities);
  },
];
