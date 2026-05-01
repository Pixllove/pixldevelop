/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#050508',
          bgAlt: '#0c1118',
          blue: {
            DEFAULT: '#2563eb',
            light: '#60a5fa',
            dark: '#1d4ed8',
            muted: '#1e293b',
          },
          accent: '#3b82f6',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(90deg, #3b82f6 0%, #2563eb 45%, #1d4ed8 100%)',
        'gradient-brand-vertical': 'linear-gradient(180deg, #3b82f6 0%, #1e40af 100%)',
        'mesh-bg':
          'radial-gradient(at 28% 18%, rgba(37,99,235,0.12) 0px, transparent 52%), radial-gradient(at 82% 55%, rgba(15,23,42,0.55) 0px, transparent 48%), radial-gradient(at 50% 100%, rgba(30,58,138,0.12) 0px, transparent 45%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out infinite 2s',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'glow-brand': '0 0 40px rgba(37,99,235,0.35), 0 0 72px rgba(15,23,42,0.6)',
        'glow-sm': '0 0 24px rgba(37,99,235,0.22)',
        card: '0 4px 32px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
