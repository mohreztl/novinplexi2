
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
      primary: {
        DEFAULT: '#2563eb', // blue-600
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb', // رنگ اصلی
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
        950: '#172554'
      },
      
      // پالت رنگ بنفش (secondary)
      secondary: {
        DEFAULT: '#4f46e5', // indigo-600
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5', // رنگ اصلی (DEFAULT)
        700: '#4338ca',
        800: '#3730a3',
        900: '#312e81',
        950: '#1e1b4b'
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

      boxShadow: {
        neon: "0 0 15px #3498db", // Change the color to your desired neon color
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
