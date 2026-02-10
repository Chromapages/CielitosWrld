import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      body: ['var(--font-roboto)', 'Roboto', '-apple-system', 'sans-serif'],
      heading: ['var(--font-newsreader)', 'Newsreader', 'Georgia', 'serif'],
      display: ['var(--font-pattaya)', 'Pattaya', 'Georgia', 'serif'],
      pattaya: ['var(--font-pattaya)', 'cursive'],
      inter: ['Inter', 'sans-serif'],
      archivo: ['var(--font-archivo)', 'sans-serif'],
    },
    extend: {
      // Premium Typography System
      fontSize: {
        // Display: Hero headlines
        'display': ['clamp(48px, 8vw, 96px)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        // H1: Major sections
        'h1': ['clamp(36px, 6vw, 60px)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        // H2: Section titles
        'h2': ['clamp(28px, 4vw, 40px)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        // H3: Subsections
        'h3': ['clamp(20px, 3vw, 28px)', { lineHeight: '1.3', fontWeight: '600' }],
        // H4: Card titles
        'h4': ['clamp(18px, 2.5vw, 24px)', { lineHeight: '1.4', fontWeight: '600' }],
        // Body Large
        'body-lg': ['20px', { lineHeight: '1.7', fontWeight: '400' }],
        // Body Default
        'body': ['18px', { lineHeight: '1.7', fontWeight: '400' }],
        // Body Small (mobile)
        'body-sm': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        // Caption
        'caption': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        // Caption Small
        'caption-sm': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
        // Legacy sizes
        '2xs': ['0.7rem', { lineHeight: '1rem' }],
        '3xs': ['0.6rem', { lineHeight: '0.9rem' }],
      },
      colors: {
        // Unified Brand System
        brand: colors.stone,

        // Accent System

        orange: {
          DEFAULT: '#822c01',
          50: '#fef6f0',
          100: '#fdeadd',
          200: '#fad1bb',
          300: '#f5b08e',
          400: '#ed855f',
          500: '#e6653a',
          600: '#d74d21',
          700: '#b33a16',
          800: '#96320f',
          900: '#822c01',
        },

        // Keep existing shadcn colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      // Premium Multi-layer Shadows
      boxShadow: {
        'navbar-float': '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
        // Elevation Hierarchy
        'elevation-1': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'elevation-2': '0 2px 4px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.08)',
        'elevation-3': '0 2px 4px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.04)',
        'elevation-4': '0 4px 6px rgba(0, 0, 0, 0.07), 0 12px 24px rgba(0, 0, 0, 0.10), 0 24px 48px rgba(0, 0, 0, 0.05)',
        // Dark mode shadows
        'elevation-dark-1': '0 2px 4px rgba(0, 0, 0, 0.3)',
        'elevation-dark-2': '0 2px 4px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.4)',
        'elevation-dark-3': '0 2px 4px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.4), 0 16px 32px rgba(0, 0, 0, 0.2)',
      },
      aspectRatio: {
        '2/3': '2 / 3',
        '3/2': '3 / 2',
        '4/5': '4 / 5',
        '5/4': '5 / 4',
        '16/9': '16 / 9',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // 8px Grid Spacing System
      spacing: {
        'space-1': '8px',    // xs
        'space-2': '16px',   // sm
        'space-3': '24px',   // md
        'space-4': '32px',   // lg
        'space-5': '40px',   // xl
        'space-6': '48px',   // 2xl
        'space-8': '64px',   // 3xl
        'space-10': '80px',  // 4xl
        'space-12': '96px',  // 5xl
        'space-15': '120px', // 6xl
        'space-20': '160px', // 7xl
      },
      // Section Padding
      padding: {
        'section-sm': '16px',
        'section': '24px',
        'section-lg': '40px',
        'section-xl': '64px',
        'section-2xl': '120px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addUtilities }: any) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ],
};
export default config;