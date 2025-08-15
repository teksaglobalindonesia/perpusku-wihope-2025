/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './constants/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './sections/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        // Base colors
        "primary-light": '#FAFAFA',
        "primary-dark": '#222222',

        // Neutral Red
        'neutral-red': {
          50: '#FDF2F2',
          100: '#FCE8E8',
          200: '#F8D1D1',
          300: '#F2A8A8',
          400: '#EA7A7A',
          500: '#DD5555',  // Main neutral red
          600: '#C53030',
          700: '#9B2C2C',
          800: '#742A2A',
          900: '#4A1818',
          950: '#2D0F0F',
        },

        // Neutral Green
        'neutral-green': {
          50: '#F0F9F0',
          100: '#E2F2E2',
          200: '#C6E6C6',
          300: '#9DD49D',
          400: '#6BBF6B',
          500: '#48A548',  // Main neutral green
          600: '#2D7D2D',
          700: '#276627',
          800: '#1E4F1E',
          900: '#163316',
          950: '#0D1A0D',
        },

        // Neutral Blue
        'neutral-blue': {
          50: '#F0F6FF',
          100: '#E0EDFF',
          200: '#B8DCFF',
          300: '#7CC3FF',
          400: '#36A2FF',
          500: '#0A84FF',  // Main neutral blue
          600: '#0066CC',
          700: '#004499',
          800: '#003366',
          900: '#002244',
          950: '#001122',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'var(--background)',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      fontSize: {
        '2xs': ['10px', '16px']
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        roboto: 'var(--font-roboto), sans-serif',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/line-clamp')]
};
