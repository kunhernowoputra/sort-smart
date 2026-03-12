# SortSmart AI — Login Page Design Specification
> Version 2.2 | Tailwind v3 + Nuxt Fonts + Dark/Light Mode | Atlas Design System

---

## 🎯 Overview

| Property | Value |
|---|---|
| Project | SortSmart AI |
| Page | Login |
| Style | Dark Luxury Eco-Tech |
| Stack | Nuxt 4
| Default Mode | Dark Mode |
| Toggle | Manual button di UI |
| Target Score | 9.5/10 |

---

## 📦 Step 1 — Install Nuxt Fonts

```bash
npx nuxi module add fonts
```

`nuxt.config.ts`:

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

---

## 📦 Step 2 — Tailwind Dark Mode Config

`tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'

export default {
  // WAJIB: pakai 'class' agar bisa toggle manual
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
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

## 🎨 Color System — Dark vs Light

| Elemen | Dark Mode | Light Mode |
|---|---|---|
| Background | `bg-[#050f0a]` | `bg-[#f0faf4]` |
| Left panel | `bg-[#050f0a]` | `bg-[#0a2e1a]` (tetap gelap) |
| Card bg | `bg-white/[0.04]` | `bg-white` |
| Card border | `border-[rgba(0,255,136,0.12)]` | `border-[rgba(0,180,80,0.2)]` |
| Text primary | `text-[#f0faf4]` | `text-[#0a1a0f]` |
| Text muted | `text-[#6b8f7a]` | `text-[#4a7a5a]` |
| Input bg | `bg-white/[0.05]` | `bg-white` |
| Input border | `border-white/[0.08]` | `border-gray-200` |
| Input text | `text-[#f0faf4]` | `text-[#0a1a0f]` |
| Accent | `text-[#00ff88]` | `text-[#00a855]` |
| Button | `from-[#00c96b] to-[#00ff88]` | `from-[#00a855] to-[#00c96b]` |
| Button text | `text-[#050f0a]` | `text-white` |
| Shadow | `shadow-[0_32px_64px_rgba(0,0,0,0.4)]` | `shadow-[0_32px_64px_rgba(0,0,0,0.08)]` |

> **Catatan:** Left panel **selalu gelap** di kedua mode karena particle background & branding lebih bagus di atas warna gelap.

---

## 🌙 Composable useColorMode

Buat `composables/useColorMode.ts`:

```ts
export function useColorMode() {
  // Default: dark
  const isDark = ref(true)

  // Sync ke <html> class untuk Tailwind darkMode: 'class'
  const apply = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    // Simpan preferensi ke localStorage
    localStorage.setItem('color-mode', isDark.value ? 'dark' : 'light')
  }

  const toggle = () => {
    isDark.value = !isDark.value
    apply()
  }

  onMounted(() => {
    // Baca dari localStorage, default dark jika belum ada
    const saved = localStorage.getItem('color-mode')
    isDark.value = saved ? saved === 'dark' : true
    apply()
  })

  return { isDark, toggle }
}
```

---

## 🔘 Toggle Button Component

Taruh di pojok kanan atas halaman login:

```vue
<button @click="toggle"
        class="absolute top-5 right-5 z-50
               w-10 h-10 rounded-xl flex items-center justify-center
               transition-all duration-300
               dark:bg-white/10 dark:hover:bg-white/20 dark:text-[#00ff88]
               bg-black/5 hover:bg-black/10 text-[#00a855]">

  <!-- Sun icon (tampil saat dark mode aktif) -->
  <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg"
       class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707
             M6.343 17.657l-.707.707m12.728 0l-.707-.707
             M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
  </svg>

  <!-- Moon icon (tampil saat light mode aktif) -->
  <svg v-else xmlns="http://www.w3.org/2000/svg"
       class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646
             9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
</button>
```

---

## 📐 Layout Wrapper

```vue
<template>
  <div class="min-h-screen font-sans relative transition-colors duration-300
              dark:bg-[#050f0a] bg-[#f0faf4] flex">

    <!-- Toggle Button -->
    <button @click="toggle" class="absolute top-5 right-5 z-50 ...">
      ...
    </button>

    <!-- Left Panel (selalu dark) -->
    <div class="hidden md:flex w-1/2 bg-[#050f0a] relative
                flex-col justify-between p-12 overflow-hidden">
      <canvas ref="canvasRef" class="absolute inset-0 w-full h-full pointer-events-none" />
      <!-- branding -->
    </div>

    <!-- Right Panel -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12
                transition-colors duration-300">
      <!-- form card -->
    </div>

  </div>
</template>
```

---

## 📋 Form Card (Dark + Light)

```vue
<div class="w-full max-w-md p-8 rounded-3xl animate-card-entrance
            transition-all duration-300

            dark:bg-white/[0.04] dark:backdrop-blur-2xl
            dark:border dark:border-[rgba(0,255,136,0.12)]
            dark:shadow-[0_32px_64px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]

            bg-white border border-[rgba(0,180,80,0.15)]
            shadow-[0_32px_64px_rgba(0,0,0,0.08)]">

  <!-- Title -->
  <h2 class="text-2xl font-bold text-center mb-1
             dark:bg-gradient-to-r dark:from-white dark:to-[#00ff88]
             bg-gradient-to-r from-[#0a1a0f] to-[#00a855]
             bg-clip-text text-transparent">
    Selamat Datang Kembali
  </h2>

  <!-- Subtitle -->
  <p class="text-sm text-center mb-8
            dark:text-[#6b8f7a] text-[#4a7a5a]">
    Masuk ke dashboard pengelolaan sampah Anda
  </p>

  <!-- Input -->
  <input type="email"
         class="w-full pl-10 pr-4 py-3 rounded-xl text-sm
                transition-all duration-300

                dark:bg-white/[0.05] dark:border-white/[0.08]
                dark:text-[#f0faf4] dark:placeholder:text-[#6b8f7a]
                dark:focus:border-[#00ff88]/50 dark:focus:ring-[#00ff88]/10

                bg-white border-gray-200
                text-[#0a1a0f] placeholder:text-[#4a7a5a]
                focus:border-[#00a855]/50 focus:ring-[#00a855]/10

                border focus:outline-none focus:ring-2" />

  <!-- Button -->
  <button class="w-full py-3.5 rounded-xl font-bold text-sm tracking-widest
                 relative overflow-hidden transition-all duration-300
                 hover:scale-[1.01] active:scale-[0.99]
                 disabled:opacity-60 disabled:cursor-not-allowed

                 dark:bg-gradient-to-r dark:from-[#00c96b] dark:via-[#00ff88] dark:to-[#00c96b]
                 dark:text-[#050f0a]

                 bg-gradient-to-r from-[#00a855] via-[#00c96b] to-[#00a855]
                 text-white

                 bg-[length:200%_auto] hover:bg-right-center">
    MASUK SEKARANG
  </button>

  <!-- Forgot Password link -->
  <a href="#" class="text-sm font-medium hover:underline
                     dark:text-[#00ff88] text-[#00a855]">
    Lupa Password?
  </a>

</div>
```

---

## ✨ Script Setup Lengkap

```vue
<script setup lang="ts">
import { useColorMode } from '~/composables/useColorMode'
import { useParticles } from '~/composables/useParticles'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const showPassword = ref(false)
const loading = ref(false)

const { isDark, toggle } = useColorMode()

useParticles(canvasRef)

async function handleLogin() {
  loading.value = true
  await new Promise(r => setTimeout(r, 1500))
  loading.value = false
}
</script>
```

---

## 📁 File Structure

```
pages/
  login.vue
composables/
  useColorMode.ts
  useParticles.ts
tailwind.config.ts
nuxt.config.ts
```

---

## ⚡ Micro-interactions Summary

| Element | Dark | Light |
|---|---|---|
| Input focus ring | `dark:focus:ring-[#00ff88]/10` | `focus:ring-[#00a855]/10` |
| Button gradient | green electric | green natural |
| Card bg | glassmorphism | solid white |
| Toggle icon | ☀️ Sun | 🌙 Moon |
| Transition | `transition-colors duration-300` di semua elemen |

---

## 🏆 Quality Bar

> *"Must look like a $10,000 design agency made it."*
> Dark mode: luxury eco-tech. Light mode: clean & professional.
> Setiap elemen harus enak di kedua mode.

---

*Generated by Atlas — AI Designer*