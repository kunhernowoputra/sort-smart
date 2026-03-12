<template>
  <div class="min-h-screen font-sans relative transition-colors duration-300 dark:bg-[#050f0a] bg-[#f0faf4] flex selection:bg-[#00ff88]/30 overflow-hidden">
    
    <!-- THEME TOGGLE BUTTON -->
    <button @click="toggle"
            class="absolute top-6 right-8 z-50
                   w-11 h-11 rounded-2xl flex items-center justify-center
                   transition-all duration-300 border
                   dark:bg-white/5 dark:hover:bg-white/10 dark:text-[#00ff88] dark:border-white/10
                   bg-black/[0.03] hover:bg-black/[0.06] text-[#00a855] border-black/5
                   shadow-xl backdrop-blur-md active:scale-95">
      <!-- Sun icon (tampil saat dark mode aktif) -->
      <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg"
           class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707
                 M6.343 17.657l-.707.707m12.728 0l-.707-.707
                 M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
      <!-- Moon icon (tampil saat light mode aktif) -->
      <svg v-else xmlns="http://www.w3.org/2000/svg"
           class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
              d="M20.354 15.354A9 9 0 018.646 3.646
                 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>

    <!-- LEFT PANEL: Always Dark Branding -->
    <div class="hidden md:flex w-1/2 bg-[#050f0a] relative flex-col justify-between p-20 overflow-hidden border-r border-[#00ff88]/5">
      <!-- Particle Background -->
      <canvas ref="canvasRef" class="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" />
      
      <!-- Logo Top -->
      <div class="flex items-center gap-3 relative z-10 animate-in fade-in duration-1000">
        <div class="w-10 h-10 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/20
                    flex items-center justify-center animate-logo-pulse">
          <IconLeaf class="w-6 h-6 text-[#00ff88]" />
        </div>
        <span class="text-[#f0faf4] font-bold text-lg tracking-tight">SortSmart AI</span>
      </div>

      <!-- Main Headline Content -->
      <div class="relative z-10 space-y-10 animate-in fade-in slide-in-from-left-12 duration-1000 delay-200">
        <div class="space-y-6">
          <h1 class="text-6xl font-extrabold leading-[1.1] tracking-tight">
            <span class="text-[#f0faf4]">Future of</span><br>
            <span class="bg-gradient-to-r from-[#00c96b] to-[#00ff88] bg-clip-text text-transparent">
              Waste Sorting.
            </span>
          </h1>

          <!-- Typewriter tagline -->
          <div class="relative h-8">
            <p class="text-[#6b8f7a] text-xl font-medium overflow-hidden whitespace-nowrap
                      animate-typewriter border-r-2 border-[#00ff88] w-fit pr-1">
              Platform Sortasi Sampah Masa Depan
            </p>
          </div>
        </div>

        <!-- Feature Pills -->
        <div class="flex gap-3 flex-wrap pt-4">
          <span v-for="pill in features" :key="pill.name"
                class="px-5 py-2.5 rounded-full text-[13px] font-bold
                       bg-white/5 border border-white/10 text-[#f0faf4]
                       backdrop-blur-md hover:border-[#00ff88]/30 transition-all cursor-default flex items-center gap-2">
            <span>{{ pill.icon }}</span>
            {{ pill.name }}
          </span>
        </div>
      </div>

      <!-- Social Proof Bottom -->
      <div class="flex items-center gap-4 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
        <div class="flex -space-x-3">
          <img v-for="i in 4" :key="i"
               class="w-10 h-10 rounded-full border-2 border-[#050f0a] hover:scale-110 transition-transform cursor-pointer"
               :src="`https://i.pravatar.cc/100?img=${i+30}`" />
        </div>
        <div class="space-y-0.5">
          <p class="text-[#f0faf4] text-sm font-bold">50+ Cities Trust Us</p>
          <p class="text-[#6b8f7a] text-xs font-medium opacity-80">Building sustainable ecosystems.</p>
        </div>
      </div>

      <!-- Noise Texture -->
      <div class="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>

    <!-- RIGHT PANEL: Adaptive Dark/Light Form -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-8 relative transition-colors duration-500">
      
      <!-- Error Shake Alert -->
      <div v-if="error" class="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 animate-shake z-20">
        <div class="bg-red-500/10 border border-red-500/20 text-red-500 text-sm py-4 px-6 rounded-2xl text-center font-bold shadow-xl backdrop-blur-md">
          {{ error }}
        </div>
      </div>

      <!-- Form Card -->
      <div class="w-full max-w-[460px] p-10 md:p-14 rounded-[42px] animate-card-entrance relative transition-all duration-500 group overflow-hidden
                  dark:bg-white/[0.03] dark:backdrop-blur-[40px]
                  dark:border dark:border-[rgba(0,255,136,0.12)]
                  dark:shadow-[0_45px_100px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]
                  bg-white border border-[rgba(0,180,80,0.1)]
                  shadow-[0_45px_100px_rgba(0,0,0,0.08)]">
        
        <!-- Ambient Glow Decor (Dark Mode Only) -->
        <div class="hidden dark:block absolute -top-40 -right-40 w-96 h-96 bg-[#00ff88]/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-[#00ff88]/10 transition-all duration-1000"></div>

        <!-- Mobile Header (Visible only on mobile) -->
        <div class="md:hidden flex flex-col items-center gap-4 mb-10">
          <div class="w-12 h-12 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center animate-logo-pulse">
            <IconLeaf class="text-[#00ff88]" />
          </div>
          <span class="text-2xl font-black dark:text-white text-[#050f0a]">SortSmart AI</span>
        </div>

        <!-- Desktop Header Content -->
        <div class="relative z-10">
          <div class="hidden md:flex justify-center mb-10">
            <div class="w-20 h-20 rounded-[28px] dark:bg-[#00ff88]/10 dark:border-[#00ff88]/20 bg-emerald-50 border-emerald-100 border flex items-center justify-center animate-logo-pulse">
              <IconRecycle class="w-10 h-10 dark:text-[#00ff88] text-[#00a855]" />
            </div>
          </div>

          <!-- Title -->
          <div class="text-center mb-12">
            <h2 class="text-3xl font-[900] tracking-tight mb-3 transition-colors duration-300
                       dark:bg-gradient-to-r dark:from-white dark:to-[#00ff88] 
                       bg-gradient-to-r from-[#050f0a] to-[#00a855]
                       bg-clip-text text-transparent">
              Selamat Datang Kembali
            </h2>
            <p class="text-base font-medium transition-colors duration-300
                      dark:text-[#6b8f7a] text-[#4a7a5a]">
              Masuk ke dashboard pengelolaan sampah Anda
            </p>
          </div>

          <!-- Form Fields -->
          <form @submit.prevent="handleLogin" class="space-y-7">
            <!-- Email -->
            <div class="space-y-2 group/field">
              <label class="block text-[13px] font-bold tracking-wide dark:text-[#f0faf4] text-[#050f0a] ml-1 group-focus-within/field:text-[#00ff88] transition-colors">Email Address</label>
              <div class="relative">
                <IconMail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b8f7a] group-focus-within/field:text-[#00ff88] transition-colors" />
                <input 
                  v-model="email"
                  type="email" 
                  placeholder="admin@sortsmart.ai"
                  class="w-full pl-12 pr-4 py-4.5 rounded-[22px] text-sm font-semibold transition-all duration-300 border focus:outline-none focus:ring-4
                         dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-[#f0faf4] dark:placeholder:text-[#6b8f7a]/40
                         dark:focus:border-[#00ff88]/40 dark:focus:ring-[#00ff88]/5
                         bg-slate-50 border-slate-200 text-[#050f0a] placeholder:text-[#4a7a5a]/40
                         focus:border-[#00a855]/40 focus:ring-[#00a855]/5" 
                  required
                />
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-2 group/field">
              <label class="block text-[13px] font-bold tracking-wide dark:text-[#f0faf4] text-[#050f0a] ml-1 group-focus-within/field:text-[#00ff88] transition-colors">Password</label>
              <div class="relative">
                <IconLock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b8f7a] group-focus-within/field:text-[#00ff88] transition-colors" />
                <input 
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'" 
                  placeholder="••••••••"
                  class="w-full pl-12 pr-12 py-4.5 rounded-[22px] text-sm font-semibold transition-all duration-300 border focus:outline-none focus:ring-4
                         dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-[#f0faf4] dark:placeholder:text-[#6b8f7a]/40
                         dark:focus:border-[#00ff88]/40 dark:focus:ring-[#00ff88]/5
                         bg-slate-50 border-slate-200 text-[#050f0a] placeholder:text-[#4a7a5a]/40
                         focus:border-[#00a855]/40 focus:ring-[#00a855]/5" 
                  required
                />
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl
                         text-[#6b8f7a] hover:text-[#00ff88] dark:hover:bg-white/5 hover:bg-black/5 transition-all"
                >
                  <IconEye v-if="!showPassword" class="w-5 h-5" />
                  <IconEyeOff v-else class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Remember Me & Forgot link -->
            <div class="flex items-center justify-between px-2">
              <label class="flex items-center gap-3 text-sm cursor-pointer select-none group/check">
                <div class="relative w-5 h-5">
                  <input type="checkbox" v-model="rememberMe" class="peer sr-only" />
                  <div class="absolute inset-0 rounded-lg border-2 transition-all duration-300
                              dark:border-white/10 dark:bg-white/5 peer-checked:bg-[#00ff88] peer-checked:border-[#00ff88]
                              border-slate-200 bg-white group-hover/check:border-[#00a855]/50 peer-checked:border-none"></div>
                  <IconCheck class="absolute inset-0 w-5 h-5 dark:text-[#050f0a] text-white scale-0 peer-checked:scale-100 transition-transform duration-300" />
                </div>
                <span class="font-bold dark:text-[#6b8f7a] text-[#4a7a5a] group-hover:text-[#00a855] dark:group-hover:text-white transition-colors">Ingat saya</span>
              </label>
              <a href="#" class="text-sm font-black dark:text-[#00ff88] text-[#00a855] hover:opacity-80 transition-all underline underline-offset-4 decoration-2">
                Lupa Password?
              </a>
            </div>

            <!-- CTA Submit Button -->
            <button 
              type="submit"
              :disabled="loading"
              class="w-full py-5 rounded-[22px] font-[900] text-sm tracking-[0.2em]
                     relative overflow-hidden group/btn shadow-2xl transition-all duration-500
                     hover:scale-[1.02] active:scale-[0.98]
                     disabled:opacity-60 disabled:cursor-not-allowed mt-4
                     dark:bg-gradient-to-r dark:from-[#00c96b] dark:via-[#00ff88] dark:to-[#00c96b]
                     dark:text-[#050f0a] dark:shadow-[#00ff88]/10 dark:hover:shadow-[#00ff88]/30
                     bg-gradient-to-r from-[#00a855] via-[#00c96b] to-[#00a855]
                     text-white shadow-emerald-200 hover:shadow-emerald-300
                     bg-[length:200%_auto] hover:bg-right"
            >
              <!-- Shimmer Sweep Effect -->
              <div class="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"></div>
              
              <span v-if="!loading" class="relative z-10 uppercase">MASUK SEKARANG</span>
              <span v-else class="flex items-center justify-center gap-3 relative z-10">
                <svg class="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                MEMPROSES...
              </span>
            </button>
          </form>

          <!-- Footer Meta -->
          <p class="text-center text-sm font-medium mt-12 relative z-10 transition-colors duration-300
                    dark:text-[#6b8f7a] text-[#4a7a5a]">
            Belum punya akun?
            <span class="dark:text-[#f0faf4] text-[#050f0a] font-[900] cursor-pointer hover:text-[#00ff88] dark:hover:text-[#00ff88] transition-colors underline-offset-4 hover:underline ml-1">
              Hubungi Admin
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Small Decor Accents for Light Mode -->
    <div class="hidden light:block absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-100 blur-[150px] rounded-full pointer-events-none opacity-50"></div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const { login } = useAuth()
const { isDark, toggle } = useColorMode()
const canvasRef = ref(null)

const email = ref('admin@sortsmart.ai')
const password = ref('password')
const showPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')

// Initialize particle system
useParticles(canvasRef)

// Feature list from design spec
const features = [
  { name: 'AI Sorting', icon: '♻️' },
  { name: 'Real-time', icon: '📊' },
  { name: 'Eco Impact', icon: '🌿' }
]

async function handleLogin() {
  error.value = ''
  loading.value = true
  
  try {
    const result = await login(email.value, password.value)
    if (result.success) {
      await navigateTo('/')
    } else {
      error.value = result.error
    }
  } catch (e) {
    error.value = "Terjadi kesalahan sistem. Silakan coba lagi."
  } finally {
    loading.value = false
  }
}

// Icon Functional Components
const hIcon = (path, attrs = {}) => h('svg', { 
  xmlns: 'http://www.w3.org/2000/svg', 
  width: '24', height: '24', viewBox: '0 0 24 24', 
  fill: 'none', stroke: 'currentColor', 
  'stroke-width': '2.5', 'stroke-linecap': 'round', 
  'stroke-linejoin': 'round', ...attrs 
}, path)

const IconMail = () => hIcon([
  h('rect', { width: '20', height: '16', x: '2', y: '4', rx: '2' }),
  h('path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' })
])

const IconLock = () => hIcon([
  h('rect', { width: '18', height: '11', x: '3', y: '11', rx: '2', ry: '2' }),
  h('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' })
])

const IconCheck = (props) => hIcon([
  h('polyline', { points: '20 6 9 17 4 12' })
], { class: props.class, 'stroke-width': '5' })

const IconEye = () => hIcon([
  h('path', { d: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' }),
  h('circle', { cx: '12', cy: '12', r: '3' })
])

const IconEyeOff = () => hIcon([
  h('path', { d: 'M9.88 9.88a3 3 0 1 0 4.24 4.24' }),
  h('path', { d: 'M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68' }),
  h('path', { d: 'M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61' }),
  h('line', { x1: '2', y1: '2', x2: '22', y2: '22' })
])

const IconLeaf = (props) => hIcon([
  h('path', { d: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.7 10-10 10Z' }),
  h('path', { d: 'M19 2c-1.5 3-3.08 4.25-5 5.5' }),
  h('path', { d: 'M11 20c1.15-5.36 2.38-7.7 5.5-12.5' })
], { class: props.class })

const IconRecycle = (props) => hIcon([
  h('path', { d: 'M4.5 12.5c.32 1.3 1.14 2 2.5 2H18' }),
  h('polyline', { points: '14 11 18 15 14 19' }),
  h('path', { d: 'M19.5 11.5c-.32-1.3-1.14-2-2.5-2H6' }),
  h('polyline', { points: '10 13 6 9 10 5' })
], { class: props.class })
</script>

<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(250%) skewX(-15deg); }
}

.animate-card-entrance {
  animation: cardEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-logo-pulse {
  animation: logoPulse 2s ease-in-out infinite;
  filter: drop-shadow(0 0 12px rgba(0, 255, 136, 0.3));
}

.animate-typewriter {
  animation: typewriter 2.5s steps(40) forwards;
}

.animate-shake {
  animation: shake 0.4s ease;
}

/* Ensure font is correctly prioritized from @nuxt/fonts */
:deep(*) {
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
}
</style>
