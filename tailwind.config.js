/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/components/**/*.{vue,js,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        eco: {
          base:     '#050f0a',
          accent:   '#00ff88',
          mid:      '#00c96b',
          text:     '#f0faf4',
          muted:    '#6b8f7a',
        },
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
      },
      keyframes: {
        cardEntrance: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        logoPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(0,255,136,0.4))', transform: 'scale(1)' },
          '50%':      { filter: 'drop-shadow(0 0 20px rgba(0,255,136,0.8))', transform: 'scale(1.05)' },
        },
        typewriter: {
          from: { width: '0' },
          to:   { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-8px)' },
          '40%, 80%': { transform: 'translateX(8px)' },
        },
        shimmer: {
          from: { left: '-100%' },
          to:   { left: '100%' },
        }
      },
      animation: {
        'card-entrance': 'cardEntrance 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'logo-pulse':    'logoPulse 2s ease-in-out infinite',
        'typewriter':    'typewriter 2.5s steps(40) forwards',
        'blink':         'blink 1s step-end infinite',
        'shake':         'shake 0.4s ease',
        'shimmer':       'shimmer 0.5s ease forwards',
      }
    },
  },
  plugins: [],
}
