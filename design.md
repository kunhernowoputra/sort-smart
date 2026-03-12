# SortSmart AI — Login Page Design Specification
> Version 2.1 | Tailwind v3 + Nuxt Fonts | Atlas Design System

---

## 🎯 Overview

| Property | Value |
|---|---|
| Project | SortSmart AI |
| Page | Login |
| Style | Dark Luxury Eco-Tech |
| Stack | Nuxt 3 + Tailwind v3 (`@nuxtjs/tailwindcss ^6.14.0`) + Nuxt Fonts |
| Target Score | 9.5/10 |

---

## 📦 Step 1 — Install Nuxt Fonts

```bash
npx nuxi module add fonts
```

Lalu di `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts'
  ],
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 700, 800] }
    ]
  }
})
```

Di `tailwind.config.ts`, extend fontFamily:

```ts
import type { Config } from 'tailwindcss'

export default {
  content: [],
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
        }
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
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-8px)' },
          '40%, 80%': { transform: 'translateX(8px)' },
        }
      },
      animation: {
        'card-entrance': 'cardEntrance 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'logo-pulse':    'logoPulse 2s ease-in-out infinite',
        'typewriter':    'typewriter 2.5s steps(40) forwards',
        'shake':         'shake 0.4s ease',
      }
    }
  }
} satisfies Config
```

---

## 🎨 Color Reference (Tailwind Classes)

| Elemen | Class |
|---|---|
| Background | `bg-[#050f0a]` |
| Accent green | `text-[#00ff88]` |
| Card bg | `bg-white/[0.04]` |
| Card border | `border-[rgba(0,255,136,0.12)]` |
| Text primary | `text-[#f0faf4]` |
| Text muted | `text-[#6b8f7a]` |
| Input bg | `bg-white/[0.05]` |
| Input border | `border-white/[0.08]` |

---

## 📐 Layout

```vue
<template>
  <div class="min-h-screen bg-[#050f0a] flex font-sans">

    <!-- Left Panel (hidden on mobile) -->
    <div class="hidden md:flex w-1/2 relative flex-col justify-between p-12 overflow-hidden">
      <canvas ref="canvasRef" class="absolute inset-0 w-full h-full pointer-events-none" />
      <!-- branding content -->
    </div>

    <!-- Right Panel -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
      <!-- form card -->
    </div>

  </div>
</template>
```

---

## 🖼️ Left Panel

```vue
<!-- Logo -->
<div class="flex items-center gap-3 relative z-10">
  <div class="w-10 h-10 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/20
              flex items-center justify-center animate-logo-pulse">
    <!-- SVG leaf icon -->
  </div>
  <span class="text-[#f0faf4] font-bold text-lg">SortSmart AI</span>
</div>

<!-- Headline -->
<div class="relative z-10 space-y-4">
  <h1 class="text-5xl font-extrabold leading-tight">
    <span class="text-[#f0faf4]">Future of</span><br>
    <span class="bg-gradient-to-r from-[#00c96b] to-[#00ff88] bg-clip-text text-transparent">
      Waste Sorting.
    </span>
  </h1>

  <!-- Typewriter tagline -->
  <p class="text-[#6b8f7a] text-base overflow-hidden whitespace-nowrap
            animate-typewriter border-r-2 border-[#00ff88] w-fit">
    Platform Sortasi Sampah Masa Depan
  </p>

  <!-- Feature Pills -->
  <div class="flex gap-2 pt-2 flex-wrap">
    <span v-for="pill in ['♻️ AI Sorting', '📊 Real-time', '🌿 Eco Impact']" :key="pill"
          class="px-3 py-1.5 rounded-full text-xs font-medium
                 bg-white/5 border border-white/10 text-[#f0faf4]">
      {{ pill }}
    </span>
  </div>
</div>

<!-- Social Proof -->
<div class="flex items-center gap-3 relative z-10">
  <div class="flex -space-x-2">
    <img v-for="i in 4" :key="i"
         class="w-8 h-8 rounded-full border-2 border-[#050f0a]"
         :src="`https://i.pravatar.cc/32?img=${i}`" />
  </div>
  <div>
    <p class="text-[#f0faf4] text-sm font-semibold">50+ Cities Trust Us</p>
    <p class="text-[#6b8f7a] text-xs">Building sustainable ecosystems.</p>
  </div>
</div>
```

---

## 📋 Form Card

```vue
<div class="w-full max-w-md p-8 rounded-3xl
            bg-white/[0.04] backdrop-blur-2xl
            border border-[rgba(0,255,136,0.12)]
            shadow-[0_32px_64px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]
            animate-card-entrance">

  <!-- Logo pulse -->
  <div class="flex justify-center mb-6">
    <div class="w-14 h-14 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/20
                flex items-center justify-center animate-logo-pulse">
      <!-- SVG icon -->
    </div>
  </div>

  <!-- Title gradient -->
  <h2 class="text-2xl font-bold text-center mb-1
             bg-gradient-to-r from-white to-[#00ff88] bg-clip-text text-transparent">
    Selamat Datang Kembali
  </h2>

  <!-- Subtitle -->
  <p class="text-[#6b8f7a] text-sm text-center mb-8">
    Masuk ke dashboard pengelolaan sampah Anda
  </p>

  <!-- Email Field -->
  <div class="mb-4">
    <label class="block text-[#f0faf4] text-sm font-medium mb-1.5">Email Address</label>
    <div class="relative">
      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b8f7a] pointer-events-none">
        <!-- email icon -->
      </span>
      <input type="email"
             placeholder="admin@sortsmart.ai"
             class="w-full pl-10 pr-4 py-3 rounded-xl text-sm
                    bg-white/[0.05] border border-white/[0.08] text-[#f0faf4]
                    placeholder:text-[#6b8f7a]
                    focus:outline-none focus:border-[#00ff88]/50
                    focus:ring-2 focus:ring-[#00ff88]/10
                    transition-all duration-300" />
    </div>
  </div>

  <!-- Password Field -->
  <div class="mb-5">
    <label class="block text-[#f0faf4] text-sm font-medium mb-1.5">Password</label>
    <div class="relative">
      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b8f7a] pointer-events-none">
        <!-- lock icon -->
      </span>
      <input :type="showPassword ? 'text' : 'password'"
             class="w-full pl-10 pr-10 py-3 rounded-xl text-sm
                    bg-white/[0.05] border border-white/[0.08] text-[#f0faf4]
                    placeholder:text-[#6b8f7a]
                    focus:outline-none focus:border-[#00ff88]/50
                    focus:ring-2 focus:ring-[#00ff88]/10
                    transition-all duration-300" />
      <button @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2
                     text-[#6b8f7a] hover:text-[#00ff88] transition-colors duration-200">
        <!-- eye / eye-off icon -->
      </button>
    </div>
  </div>

  <!-- Remember + Forgot -->
  <div class="flex items-center justify-between mb-6">
    <label class="flex items-center gap-2 text-sm text-[#6b8f7a] cursor-pointer select-none">
      <input type="checkbox"
             class="rounded border-white/10 bg-white/5 accent-[#00ff88]" />
      Ingat saya
    </label>
    <a href="#" class="text-sm text-[#00ff88] font-medium hover:underline">
      Lupa Password?
    </a>
  </div>

  <!-- CTA Button -->
  <button @click="handleLogin" :disabled="loading"
          class="w-full py-3.5 rounded-xl font-bold text-sm tracking-widest
                 text-[#050f0a] relative overflow-hidden
                 bg-gradient-to-r from-[#00c96b] via-[#00ff88] to-[#00c96b]
                 bg-[length:200%_auto]
                 hover:bg-right-center hover:scale-[1.01]
                 active:scale-[0.99]
                 transition-all duration-300
                 disabled:opacity-60 disabled:cursor-not-allowed">
    <span v-if="!loading">MASUK SEKARANG</span>
    <span v-else class="flex items-center justify-center gap-2">
      <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
      Memproses...
    </span>
  </button>

  <!-- Footer -->
  <p class="text-center text-sm text-[#6b8f7a] mt-6">
    Belum punya akun?
    <span class="text-[#f0faf4] font-semibold cursor-pointer hover:text-[#00ff88] transition-colors">
      Hubungi Admin
    </span>
  </p>

</div>
```

---

## ✨ Script Setup

```vue
<script setup lang="ts">
import { useParticles } from '~/composables/useParticles'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const showPassword = ref(false)
const loading = ref(false)

useParticles(canvasRef)

async function handleLogin() {
  loading.value = true
  // logic login
  await new Promise(r => setTimeout(r, 1500))
  loading.value = false
}
</script>
```

---

## 🎯 Composable Particle System

Buat file `composables/useParticles.ts`:

```ts
export function useParticles(canvasRef: Ref<HTMLCanvasElement | null>) {
  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: [1, 2, 3][Math.floor(Math.random() * 3)],
      opacity: 0.2 + Math.random() * 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }))

    // Mouse parallax
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      canvas.style.transform = `translate(${x}px, ${y}px)`
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x = (p.x + p.vx + canvas.width) % canvas.width
        p.y = (p.y + p.vy + canvas.height) % canvas.height
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 136, ${p.opacity})`
        ctx.fill()
      })
      requestAnimationFrame(animate)
    }
    animate()
  })
}
```

---

## 📁 File Structure

```
pages/
  login.vue
composables/
  useParticles.ts
tailwind.config.ts
nuxt.config.ts
```

---

## ⚡ Micro-interactions Summary

| Element | Class / Behavior |
|---|---|
| Input focus | `focus:border-[#00ff88]/50 focus:ring-2 focus:ring-[#00ff88]/10` |
| Button hover | `hover:scale-[1.01] hover:bg-right-center` |
| Button active | `active:scale-[0.99]` |
| Card load | `animate-card-entrance` |
| Logo | `animate-logo-pulse` |
| Tagline | `animate-typewriter` |
| Error shake | add `animate-shake` class via JS on validation fail |
| Password toggle | `hover:text-[#00ff88] transition-colors` |

---

*Generated by Atlas — AI Designer*