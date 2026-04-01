import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      rubik: ["var(--font-rubik)"],
      roboto: ["var(--font-roboto)"],
      fontAwesome: ["var(--font-awesome)"],
    },
    screens: { 
      xl1800: { max: "1800px" },
      xl1700: { max: "1700px" },
      xl1660: { max: "1660px" },
      xl1600: { max: "1600px" },
      xl1580: { max: "1580px" },
      xl1500: { max: "1500px" },
      xl1470: { max: "1470px" },
      xl1400: { max: "1400px" },
      xl1366: { max: "1366px" },
      xl1299: { max: "1299px" },
      xl1280: { max: "1280px" },
      xl1200: { max: "1200px" },
      md810: { max: "810px" },
      md640: { max: "640px" },
      sm480: { max: "480px" },
      sm404: { max: "404px" },
      sm439: { max: "439px" },
      sm420: { max: "420px" },
      sm360: { max: "360px" },
      xxl: { max: "1399px" },
      xl: { max: "1199px" },
      lg: { max: "991px" },
      md: { max: "767px" },  
      sm: { max: "575px" },
      // Optional: fixed range breakpoints (with min + max)
      "between1920-1200": { raw: "(max-width: 1920px) and (min-width: 1200px)" },
      "between1800-1400": { raw: "(max-width: 1800px) and (min-width: 1400px)" },
      "between1660-1200": { raw: "(max-width: 1660px) and (min-width: 1200px)" },
      "between1660-1400": { raw: "(max-width: 1660px) and (min-width: 1400px)" },
      "between1580-1200": { raw: "(max-width: 1580px) and (min-width: 1200px)" },
      "between1490-1400": { raw: "(max-width: 1490px) and (min-width: 1400px)" },
      "between1366-1200": { raw: "(max-width: 1366px) and (min-width: 1200px)" },
      "between1399-768": { raw: "(max-width: 1399px) and (min-width: 768px)" },
      "between1399-1200": { raw: "(max-width: 1399px) and (min-width: 1200px)" },
      "between1199-992": { raw: "(max-width: 1199px) and (min-width: 992px)" },
      "between991-768": { raw: "(max-width: 991px) and (min-width: 768px)" },
      only1400: { raw: "(min-width: 1400px)" },
      only1280: { raw: "(min-width: 1280px)" },
      only1200: { raw: "(min-width: 1200px)" },
      only992: { raw: "(min-width: 992px)" },
      only767: { raw: "(min-width: 767px)" },
      only641: { raw: "(min-width: 641px)" },
      only576: { raw: "(min-width: 576px)" },
      only320: { raw: "(min-width: 320px)" },
      ipad: { raw: "(width: 768px) and (height: 1024px)" },
    },
    fontSize: {
      '4xs': ['11px', {
        letterSpacing: '0.5px',
        lineHeight: '15px' 
      }],

      '3xs': ['12px', {
        letterSpacing: '0.5px',
        lineHeight: '19.2px'
      }],

      '2xs': ['13px', {
        letterSpacing: '0.5px',
        lineHeight: '19.2px'
      }],

      xs: ['14px', {
        letterSpacing: '0.4px',
        lineHeight: '22.4px',
        wordSpacing: '0.8px'
      }],

      sm: ['16px', {
        letterSpacing: '0.5px',
        lineHeight: '20px'
      }],

      'sm-responsive': [
        'calc(14px + (16 - 14) * ((100vw - 320px) / (1920 - 320)))',
        {
          letterSpacing: '0.5px',
          lineHeight: '20px'
        }
      ],

      base: ['18px', {
        letterSpacing: '0.5px',
        lineHeight: '22px'
      }],

      lg: ['20px', {
        letterSpacing: '0.5px',
        lineHeight: '27px'
      }],

      xl: ['22px', {
        letterSpacing: '0.5px',
        lineHeight: '26px'
      }],

      '2xl': ['24px', {
        letterSpacing: '0.5px',
        lineHeight: '28px'
      }],

      '3xl': ['26px', '35px'],

      '3xl-responsive': [
        'calc(18px + (26 - 18) * ((100vw - 320px) / (1920 - 320)))',
        'calc(22px + (35 - 22) * ((100vw - 320px) / (1920 - 320)))'
      ],

      'fluid-xl': [
        'calc(16px + (50 - 16) * ((100vw - 320px) / (1920 - 320)))',
        {
          lineHeight: 'calc(22px + (59 - 22) * ((100vw - 320px) / (1920 - 320)))'
        }
      ],

      'xl3': 'calc(22px + (36 - 22) * ((100vw - 320px) / (1920 - 320)))',

      'landing-title':
        'calc(18px + (32 - 18) * ((100vw - 320px) / (1920 - 320)))',
    },

    extend: {
      colors: { 
        primary: "var(--primary) ",
        secondary: "var(--text-light-secondary)",
        surface: "var(--light-secondary)",
        stealth: "var(--text-stealth-green)",
        'page-body-bg': 'var(--page-body-bg)',
        'card-color': 'var(--card-color)',
        test: "#ff4c52",
        success: "#65c15c",
        danger: "#ff4c52",
        info: "#40b8f4",
        light: "#f8f9fa", 
        dark: "#343a40", 
        warning: "#f3d04f",
        "light-primary": "var(--light-primary)",
        "card-border-color": "var(--card-border-color)",
        "dark-sidebar" : "var(--dark-sidebar)",
        "table-hover" : "var(--table-hover)",
        "light-border": "var(--light-border)",
        "input-color": "var(--input-color)",
        "dark-body" : "var(--dark-body)",
        "light-background" : "var(--light-background)",
      },
    }
  },
  plugins: [],
};

export default config;

