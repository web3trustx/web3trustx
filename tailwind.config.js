/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Web3TrustX Official Colors
        primary: {
          DEFAULT: '#00B5AD',
          light: '#00E5DB',
          dark: '#008F89',
        },
        dark: {
          DEFAULT: '#0A1220',
          lighter: '#1A2332',
          lightest: '#2A3342',
        },
        accent: {
          cyan: '#00B5AD',
          blue: '#4A90E2',
          purple: '#8B5CF6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cyber': 'linear-gradient(135deg, #0A1220 0%, #1A2332 50%, #0A1220 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00B5AD, 0 0 10px #00B5AD' },
          '100%': { boxShadow: '0 0 10px #00B5AD, 0 0 20px #00B5AD, 0 0 30px #00B5AD' },
        }
      }
    },
  },
  plugins: [],
}
