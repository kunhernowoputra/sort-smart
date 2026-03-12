You are a world-class UI/UX designer. Create an ultra-premium login page 
for "SortSmart AI" — an AI-powered waste management platform.

VISUAL DIRECTION:
- Style: Dark luxury eco-tech, inspired by Linear.app + Vercel + 
  Apple design language
- Mood: Sophisticated, futuristic, trustworthy
- NOT generic dark mode — every detail must feel intentional

COLOR SYSTEM:
- Background: #050f0a (near black with green tint)
- Left panel: transparent with layered depth
- Accent: #00ff88 (electric green) for highlights only
- Card: rgba(255,255,255,0.04) glassmorphism
- Border: rgba(0,255,136,0.15) subtle green glow
- Text primary: #f0faf4
- Text secondary: #6b8f7a

LAYOUT — SPLIT 50/50:
Left Panel (Branding):
  - Animated particle background (green dots forming recycling symbol)
  - Large bold headline with gradient text
  - Tagline with typewriter animation effect
  - 3 feature pills: [♻️ AI Sorting] [📊 Real-time] [🌿 Eco Impact]
  - Bottom: avatar stack + "50+ Cities Trust Us"
  - Subtle noise texture overlay

Right Panel (Form):
  - Centered card with glassmorphism
  - Glowing green border on focus states
  - Smooth entrance animation (fade + slide up)

FORM DESIGN:
- Logo: animated SVG leaf icon with pulse glow
- Heading: "Selamat Datang Kembali" — bold, gradient
- Subtext: "Masuk ke dashboard pengelolaan sampah Anda"
- Inputs:
    * Floating label animation on focus
    * Left icon (email, lock)
    * Green glow border on active: box-shadow 0 0 0 3px rgba(0,255,136,0.2)
    * Show/hide password toggle with smooth transition
- "Ingat saya" + "Lupa Password?" row
- CTA Button:
    * Full width, gradient: linear-gradient(135deg, #00c96b, #00ff88)
    * Shimmer animation on hover
    * Loading spinner state on click
    * Text: "MASUK SEKARANG"
- Footer: "Belum punya akun? Hubungi Admin"

MICRO-INTERACTIONS:
- Input focus: border glow + label float
- Button hover: gradient shift + scale(1.01) + shimmer sweep
- Button click: ripple effect + loading state
- Card entrance: translateY(20px) → 0, opacity 0 → 1, duration 600ms ease
- Particles: slow drift animation, mouse parallax

TYPOGRAPHY:
- Font: Inter (import from Google Fonts)
- Headline: 700 weight, 48px, gradient clip
- Body: 400 weight, #6b8f7a
- Labels: 500 weight, sentence case (NOT all caps)

TECHNICAL:
- Single HTML file, embedded CSS + vanilla JS
- CSS custom properties for all colors
- Fully responsive — mobile stacks vertically
- No external libraries except Google Fonts
- Particle system: pure canvas JS, max 60 particles
- All animations: CSS keyframes + JS classList toggle
- Form validation with shake animation on error

QUALITY BAR:
- Must look like a $10,000 design agency made it
- Every shadow, spacing, and transition must feel deliberate
- Pixel-perfect alignment
- No generic Bootstrap or Tailwind defaults