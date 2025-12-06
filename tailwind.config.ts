import type { Config } from 'tailwindcss';

const config: Config = {
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
      sans: ['var(--font-sans)'],
      body: ['var(--font-body)'],
      display: ['var(--font-display)'],
      pattaya: ['var(--font-pattaya)'],
      inter: ['Inter', 'sans-serif'],
      fitzgerald: ['var(--font-fitzgerald-bold)'],
    },
    extend: {
      fontSize: {
        '2xs': ['0.7rem', { lineHeight: '1rem' }],
        '3xs': ['0.6rem', { lineHeight: '0.9rem' }],
      },
      colors: {
        // Earth tone color system
        sage: {
          DEFAULT: '#33361c',
          50: '#f8f9f6',
          100: '#f0f2ea',
          200: '#dde2d1',
          300: '#c4ccb0',
          400: '#a6b088',
          500: '#8b9669',
          600: '#6f7d50',
          700: '#5a6441',
          800: '#484f37',
          900: '#33361c',
        },
        mud: {
          DEFAULT: '#371d13',
          50: '#f9f6f4',
          100: '#f2ebe6',
          200: '#e3d3c9',
          300: '#d0b5a4',
          400: '#b8927b',
          500: '#a47458',
          600: '#925e41',
          700: '#794d36',
          800: '#5d3c2a',
          900: '#371d13',
        },
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
        moss: {
          DEFAULT: '#2c3325',
          50: '#f7f8f6',
          100: '#eef0ec',
          200: '#dae0d5',
          300: '#bdc8b5',
          400: '#9aab8f',
          500: '#7c9070',
          600: '#647558',
          700: '#515e47',
          800: '#424c3b',
          900: '#2c3325',
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
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        pattaya: ['Pattaya', 'serif'],
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'navbar-float': '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
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