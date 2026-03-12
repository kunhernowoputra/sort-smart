<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)
const showPassword = ref(false)
const loading = ref(false)
const cursorVisible = ref(true)

const { isDark, toggle } = useColorMode()
useParticles(canvasRef)

// Hide typewriter cursor after animation ends
onMounted(() => {
  setTimeout(() => { cursorVisible.value = false }, 2600)
})

async function handleLogin() {
  loading.value = true
  await new Promise(r => setTimeout(r, 1500))
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen font-sans flex relative transition-colors duration-300
              dark:bg-[#050f0a] bg-[#f0faf4]">

    <!-- ========== TOGGLE BUTTON ========== -->
    <button @click="toggle"
            class="absolute top-5 right-5 z-50 w-10 h-10 rounded-xl
                   flex items-center justify-center transition-all duration-300
                   dark:bg-white/10 dark:hover:bg-white/20 dark:text-[#00ff88]
                   bg-black/5 hover:bg-black/10 text-[#00a855]">
      <!-- Sun icon: tampil saat dark mode -->
      <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg"
           class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707
                 M6.343 17.657l-.707.707m12.728 0l-.707-.707
                 M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
      <!-- Moon icon: tampil saat light mode -->
      <svg v-else xmlns="http://www.w3.org/2000/svg"
           class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646
                 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>

    <!-- ========== LEFT PANEL (selalu dark) ========== -->
    <div class="hidden md:flex w-1/2 relative flex-col justify-between p-12 overflow-hidden
                bg-gradient-to-br from-[#0a2e1a] via-[#051a0d] to-[#020f07]
                border-r border-[rgba(0,255,136,0.08)]">

      <!-- Particle canvas -->
      <canvas ref="canvasRef"
              class="absolute inset-0 w-full h-full pointer-events-none z-0" />

      <!-- Inner glow top -->
      <div class="absolute inset-0 pointer-events-none z-0
                  bg-[radial-gradient(ellipse_at_top_left,rgba(0,255,136,0.06),transparent_60%)]" />

      <!-- Logo -->
      <div class="flex items-center gap-3 relative z-10">
        <div class="w-10 h-10 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/20
                    flex items-center justify-center animate-logo-pulse">
          <svg class="w-5 h-5 text-[#00ff88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0
                     0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <span class="text-[#f0faf4] font-bold text-lg">SortSmart AI</span>
      </div>

      <!-- Headline + Tagline + Pills -->
      <div class="relative z-10 space-y-5">
        <h1 class="text-5xl font-extrabold leading-tight">
          <span class="text-[#f0faf4]">Future of</span><br>
          <span class="bg-gradient-to-r from-[#00c96b] to-[#00ff88]
                       bg-clip-text text-transparent">
            Waste Sorting.
          </span>
        </h1>

        <!-- Typewriter -->
        <div class="flex items-center gap-1">
          <p class="text-[#6b8f7a] text-base overflow-hidden whitespace-nowrap animate-typewriter">
            Platform Sortasi Sampah Masa Depan
          </p>
          <!-- Blinking cursor, auto-hide setelah animasi selesai -->
          <span v-if="cursorVisible"
                class="inline-block w-0.5 h-5 bg-[#00ff88] animate-blink" />
        </div>

        <!-- Feature Pills -->
        <div class="flex gap-2 flex-wrap">
          <span v-for="pill in ['♻️ AI Sorting', '📊 Real-time', '🌿 Eco Impact']"
                :key="pill"
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
               :src="`https://i.pravatar.cc/32?img=${i}`"
               alt="user avatar" />
        </div>
        <div>
          <p class="text-[#f0faf4] text-sm font-semibold flex items-center gap-1.5">
            50+ Cities Trust Us
            <span class="w-1.5 h-1.5 rounded-full bg-[#00ff88] inline-block" />
          </p>
          <p class="text-[#6b8f7a] text-xs">Building sustainable ecosystems.</p>
        </div>
      </div>
    </div>

    <!-- ========== RIGHT PANEL ========== -->
    <div class="w-full md:w-1/2 flex items-center justify-center
                min-h-screen p-6 md:p-12 transition-colors duration-300
                dark:bg-[#050f0a] bg-[#f0faf4]">

      <!-- Form Card -->
      <div class="w-full max-w-md p-8 rounded-3xl animate-card-entrance
                  transition-all duration-300

                  dark:bg-white/[0.04] dark:backdrop-blur-2xl
                  dark:border dark:border-[rgba(0,255,136,0.12)]
                  dark:shadow-[0_32px_64px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]

                  bg-white border border-[#c8ddd0]
                  shadow-[0_20px_60px_rgba(0,0,0,0.08),0_1px_0_rgba(0,168,85,0.1)]">

        <!-- Logo pulse -->
        <div class="flex justify-center mb-5">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center
                      animate-logo-pulse
                      dark:bg-[#00ff88]/10 dark:border dark:border-[#00ff88]/20
                      bg-[#00a855]/10 border border-[#00a855]/20">
            <svg class="w-5 h-5 dark:text-[#00ff88] text-[#00a855]"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0
                       0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        </div>

        <!-- Title gradient -->
        <h2 class="text-[22px] font-bold text-center mb-1 whitespace-nowrap
                   bg-clip-text text-transparent
                   dark:bg-gradient-to-r dark:from-white dark:to-[#00ff88]
                   bg-gradient-to-r from-[#0a1a0f] to-[#00a855]">
          Selamat Datang Kembali
        </h2>

        <!-- Subtitle -->
        <p class="text-sm text-center mb-7
                  dark:text-[#6b8f7a] text-[#4a7a5a]">
          Masuk ke dashboard pengelolaan sampah Anda
        </p>

        <!-- Email Field -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1.5
                        dark:text-[#f0faf4] text-[#0a1a0f]">
            Email Address
          </label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none
                         dark:text-[#6b8f7a] text-[#4a7a5a]">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7
                         a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input type="email"
                   placeholder="admin@sortsmart.ai"
                   class="w-full pl-10 pr-4 py-3 rounded-xl text-sm
                          border transition-all duration-300
                          focus:outline-none focus:ring-2

                          dark:bg-white/[0.05] dark:border-white/[0.08]
                          dark:text-[#f0faf4] dark:placeholder:text-[#6b8f7a]
                          dark:focus:border-[#00ff88]/50 dark:focus:ring-[#00ff88]/10

                          bg-[#f1f5f2] border-[#c8ddd0]
                          text-[#0a1a0f] placeholder:text-[#7a9e8a]
                          focus:bg-white focus:border-[#00a855]
                          focus:ring-[#00a855]/12" />
          </div>
        </div>

        <!-- Password Field -->
        <div class="mb-5">
          <label class="block text-sm font-medium mb-1.5
                        dark:text-[#f0faf4] text-[#0a1a0f]">
            Password
          </label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none
                         dark:text-[#6b8f7a] text-[#4a7a5a]">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0
                         00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input :type="showPassword ? 'text' : 'password'"
                   placeholder="••••••••"
                   class="w-full pl-10 pr-10 py-3 rounded-xl text-sm
                          border transition-all duration-300
                          focus:outline-none focus:ring-2

                          dark:bg-white/[0.05] dark:border-white/[0.08]
                          dark:text-[#f0faf4] dark:placeholder:text-[#6b8f7a]
                          dark:focus:border-[#00ff88]/50 dark:focus:ring-[#00ff88]/10

                          bg-[#f1f5f2] border-[#c8ddd0]
                          text-[#0a1a0f] placeholder:text-[#7a9e8a]
                          focus:bg-white focus:border-[#00a855]
                          focus:ring-[#00a855]/12" />
            <button @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2
                           transition-colors duration-200
                           dark:text-[#6b8f7a] dark:hover:text-[#00ff88]
                           text-[#4a7a5a] hover:text-[#00a855]">
              <!-- Eye open -->
              <svg v-if="showPassword" class="w-4 h-4" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943
                         9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <!-- Eye closed -->
              <svg v-else class="w-4 h-4" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7
                         a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878
                         9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59
                         3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025
                         10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Remember + Forgot -->
        <div class="flex items-center justify-between mb-6">
          <label class="flex items-center gap-2 text-sm cursor-pointer select-none
                        dark:text-[#6b8f7a] text-[#4a7a5a]">
            <input type="checkbox"
                   class="rounded accent-[#00ff88] dark:accent-[#00ff88]
                          bg-white/5 border-white/10 cursor-pointer" />
            Ingat saya
          </label>
          <a href="#" class="text-sm font-medium hover:underline transition-colors
                             dark:text-[#00ff88] text-[#00a855]">
            Lupa Password?
          </a>
        </div>

        <!-- CTA Button with Shimmer -->
        <button @click="handleLogin"
                :disabled="loading"
                class="w-full py-3.5 rounded-xl font-bold text-sm tracking-widest
                       relative overflow-hidden transition-all duration-300
                       hover:scale-[1.01] active:scale-[0.99]
                       disabled:opacity-60 disabled:cursor-not-allowed
                       bg-[length:200%_auto] hover:bg-right-center

                       dark:bg-gradient-to-r dark:from-[#00c96b] dark:via-[#00ff88] dark:to-[#00c96b]
                       dark:text-[#050f0a]

                       bg-gradient-to-r from-[#00a855] via-[#00c96b] to-[#00a855]
                       text-white">

          <!-- Shimmer overlay -->
          <span class="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            <span class="absolute top-0 left-[-100%] w-full h-full
                         bg-gradient-to-r from-transparent via-white/20 to-transparent
                         group-hover:left-full transition-all duration-500" />
          </span>

          <span v-if="!loading">MASUK SEKARANG</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10"
                      stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Memproses...
          </span>
        </button>

        <!-- Footer -->
        <p class="text-center text-sm mt-6
                  dark:text-[#6b8f7a] text-[#4a7a5a]">
          Belum punya akun?
          <span class="font-semibold cursor-pointer transition-colors
                       dark:text-[#f0faf4] dark:hover:text-[#00ff88]
                       text-[#0a1a0f] hover:text-[#00a855]">
            Hubungi Admin
          </span>
        </p>

      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes logoPulse {
  0%, 100% {
    filter: drop-shadow(0 0 8px rgba(0,255,136,0.4));
    transform: scale(1)
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(0,255,136,0.8));
    transform: scale(1.05)
  }
}

@keyframes typewriter {
  from { width: 0 }
  to   { width: 100% }
}

@keyframes blink {
  0%, 100% { opacity: 1 }
  50%      { opacity: 0 }
}

@keyframes cardEntrance {
  from { opacity: 0; transform: translateY(24px) }
  to   { opacity: 1; transform: translateY(0) }
}

.animate-logo-pulse {
  animation: logoPulse 2s ease-in-out infinite;
}

.animate-typewriter {
  animation: typewriter 2.5s steps(40) forwards;
}

.animate-blink {
  animation: blink 1s step-end infinite;
}

.animate-card-entrance {
  animation: cardEntrance 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
}
</style>
