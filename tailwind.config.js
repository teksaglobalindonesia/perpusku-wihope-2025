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
        navyBlue: '#456882',
        DNavy: '#1B3C53',
        beige: {
          50: '#faf8f5',
          100: '#f3f0e9',
          200: '#e8e0d1', // Light Beige
          300: '#d4c9b2', // Your existing Beige
          400: '#b8a98a', // Beige Dark
          500: '#9c8e6e',
          600: '#827556',
          700: '#685d45',
          800: '#4e4633',
          900: '#343022'
        },
        botanical: {
          50: '#f5f7f2',
          100: '#e5e9db',
          200: '#d0d8c0', // Sage
          300: '#b5c19f', // Olive
          400: '#94a57b', // Forest Green
          500: '#75895e', // Dark Green
          600: '#5a6a47', // Hunter Green
          700: '#434f35',
          800: '#2d3524',
          900: '#181d15'
        },
        dusty: {
          50: '#f9f7f3',
          100: '#f0eae1',
          200: '#e0d5c4', // Dusty Pink
          300: '#d1bda8', // Muted Rose
          400: '#b89d8f', // Dusty Teal
          500: '#9a7f72', // Dusty Green
          600: '#7a645a', // Dusty Blue
          700: '#5d4b43',
          800: '#40332e',
          900: '#261e1b'
        },
        terracotta: {
          50: '#fbf6f2',
          100: '#f4e8de',
          200: '#e8d1be', // Light Terracotta
          300: '#d9b599', // Terracotta
          400: '#c59270', // Burnt Orange
          500: '#a05c3a', // Rust
          600: '#80452d', // Dark Rust
          700: '#603321',
          800: '#402215',
          900: '#24120a'
        },
        vintage: {
          brown: '#6b4f3b', // Dark Brown
          terracotta: '#a05c3a', // Warm accent
          sage: '#8a9b6e', // Muted green
          parchment: '#e8ddc5', // Light parchment
          slate: '#5a6a6e', // Cool contrast
          pparchment: '#f0e6d2', // A slightly warmer parchment color
          ink: '#3a3226' // A deep ink-like color for text
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
        vintage: ['"Cormorant Garamond"', 'serif'],
        mono: ['"Fira Code"', 'monospace']
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
