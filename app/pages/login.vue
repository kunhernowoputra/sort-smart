<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-[var(--background)] transition-colors duration-300">
    <!-- Theme Toggle -->
    <div class="absolute top-6 right-6 z-50">
      <ThemeToggle />
    </div>

    <!-- Left Panel: Branding & Illustration -->
    <div class="hidden md:flex md:w-[40%] bg-[#1a3c2e] relative overflow-hidden flex-col justify-center p-12 text-white">
      <!-- Illustration Overlay -->
      <div class="absolute inset-0 opacity-40 mix-blend-overlay">
        <img 
          src="/Users/kunhernowoputra/.gemini/antigravity/brain/5fb2ce0c-3829-4767-8471-b0904b5d0f42/eco_waste_illustration_1773293422303.png" 
          class="w-full h-full object-cover"
        />
      </div>
      
      <!-- Content Overlay -->
      <div class="relative z-10 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
        <div class="flex items-center space-x-3">
          <div class="p-3 bg-emerald-500/20 rounded-2xl backdrop-blur-md border border-[var(--primary)]/30">
            <IconLeaf class="w-8 h-8 text-[var(--primary)]" />
          </div>
          <h1 class="text-3xl font-black tracking-tighter">SortSmart AI</h1>
        </div>
        
        <div class="space-y-4">
          <h2 class="text-5xl font-black leading-tight">Platform Sortasi <span class="text-[var(--primary)]">Sampah Masa Depan</span></h2>
          <p class="text-emerald-100/70 text-lg font-medium leading-relaxed max-w-md">
            Revolutionizing waste management with AI-powered classification and real-time monitoring. Join us in building a sustainable future.
          </p>
        </div>

        <div class="pt-8 flex items-center space-x-6 text-emerald-400">
          <div class="flex -space-x-3">
            <div v-for="i in 3" :key="i" class="w-10 h-10 rounded-full border-2 border-[#1a3c2e] bg-[var(--surface-lighter)] flex items-center justify-center text-xs font-bold text-white">
              {{ ['UI', 'AI', 'UX'][i-1] }}
            </div>
          </div>
          <span class="text-sm font-bold tracking-widest uppercase">Trusted by 50+ Cities</span>
        </div>
      </div>

      <!-- Abstract Shapes -->
      <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-[var(--primary)]/20 blur-[100px] rounded-full"></div>
    </div>

    <!-- Right Panel: Login Form -->
    <div class="flex-1 flex items-center justify-center p-6 md:p-20 relative bg-gradient-to-br from-white to-emerald-50 dark:from-slate-950 dark:to-slate-900 transition-all">
      <div class="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
        <!-- Mobile Logo -->
        <div class="md:hidden flex items-center justify-center space-x-2 mb-12">
          <IconLeaf class="w-8 h-8 text-[var(--primary)]" />
          <span class="text-2xl font-black text-[var(--text)]">SortSmart AI</span>
        </div>

        <div class="bg-white dark:bg-[var(--surface)] p-8 md:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(46,204,113,0.15)] dark:shadow-none border border-[var(--border)] relative overflow-hidden group">
          <!-- Glass Reflection Decor -->
          <div class="absolute -top-24 -right-24 w-48 h-48 bg-[var(--primary)]/5 blur-[40px] rounded-full group-hover:bg-[var(--primary)]/10 transition-all duration-1000"></div>
          
          <div class="relative z-10 text-center mb-10">
            <div class="inline-flex p-3 bg-emerald-500/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
              <IconRecycle class="w-8 h-8 text-[var(--primary)]" />
            </div>
            <h2 class="text-2xl font-black text-[var(--text)]">Selamat Datang Kembali</h2>
            <p class="text-[var(--text-muted)] text-sm mt-2">Masuk ke dashboard pengelolaan sampah Anda</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6 relative z-10">
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Email Address</label>
              <div class="relative group">
                <IconMail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors" />
                <input 
                  v-model="email"
                  type="email" 
                  placeholder="name@company.com"
                  class="w-full bg-[var(--surface-lighter)] border border-[var(--border)] rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[var(--primary)]/50 focus:ring-4 focus:ring-[var(--primary)]/10 transition-all text-[var(--text)] placeholder:text-[var(--text-muted)] font-medium"
                  required
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Password</label>
              <div class="relative group">
                <IconLock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors" />
                <input 
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'" 
                  placeholder="••••••••"
                  class="w-full bg-[var(--surface-lighter)] border border-[var(--border)] rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-[var(--primary)]/50 focus:ring-4 focus:ring-[var(--primary)]/10 transition-all text-[var(--text)] placeholder:text-[var(--text-muted)] font-medium"
                  required
                />
                <button 
                  type="button" 
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  <IconEye v-if="!showPassword" class="w-4 h-4" />
                  <IconEyeOff v-else class="w-4 h-4" />
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between px-1">
              <label class="flex items-center cursor-pointer group">
                <input type="checkbox" class="hidden" v-model="rememberMe" />
                <div class="w-5 h-5 border-2 border-[var(--border)] rounded-lg flex items-center justify-center transition-all group-hover:border-[var(--primary)]/50" :class="{'bg-[var(--primary)] border-[var(--primary)]': rememberMe}">
                  <IconCheck v-if="rememberMe" class="w-3 h-3 text-white font-black" />
                </div>
                <span class="ml-3 text-sm text-[var(--text-muted)] font-medium">Ingat saya</span>
              </label>
              <a href="#" class="text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] font-bold transition-colors">Lupa Password?</a>
            </div>

            <button 
              type="submit"
              :disabled="isLoading"
              class="w-full py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-black rounded-2xl hover:scale-[1.02] hover:shadow-xl hover:shadow-[var(--primary)]/20 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.1em] text-sm shadow-lg shadow-[var(--primary)]/10 mt-8"
            >
              <span v-if="!isLoading">Masuk Sekarang</span>
              <IconLoading v-else class="w-6 h-6 animate-spin" />
            </button>
          </form>

          <div class="mt-8 text-center text-sm text-[var(--text-muted)] relative z-10">
            Belum punya akun? <a href="#" class="text-[var(--text)] font-black hover:text-[var(--primary)] transition-colors">Hubungi Admin</a>
          </div>
        </div>

        <div v-if="error" class="mt-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm text-center font-bold animate-in slide-in-from-top-4">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const { login } = useAuth()
const email = ref('admin@sortsmart.ai')
const password = ref('password')
const showPassword = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true
  
  const result = await login(email.value, password.value)
  
  if (result.success) {
    await navigateTo('/')
  } else {
    error.value = result.error
  }
  
  isLoading.value = false
}

// Icons
const hIcon = (path) => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, path)

const IconMail = () => hIcon([
  h('rect', { width: '20', height: '16', x: '2', y: '4', rx: '2' }),
  h('path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' })
])

const IconLock = () => hIcon([
  h('rect', { width: '18', height: '11', x: '3', y: '11', rx: '2', ry: '2' }),
  h('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' })
])

const IconLeaf = () => hIcon([
  h('path', { d: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.7 10-10 10Z' }),
  h('path', { d: 'M19 2c-1.5 3-3.08 4.25-5 5.5' }),
  h('path', { d: 'M11 20c1.15-5.36 2.38-7.7 5.5-12.5' })
])

const IconRecycle = () => hIcon([
  h('path', { d: 'M4.5 12.5c.32 1.3 1.14 2 2.5 2H18' }),
  h('polyline', { points: '14 11 18 15 14 19' }),
  h('path', { d: 'M19.5 11.5c-.32-1.3-1.14-2-2.5-2H6' }),
  h('polyline', { points: '10 13 6 9 10 5' })
])

const IconCheck = () => hIcon([
  h('polyline', { points: '20 6 9 17 4 12' })
])

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

const IconLoading = () => hIcon([
  h('path', { d: 'M21 12a9 9 0 1 1-6.219-8.56' })
])
</script>

<style scoped>
/* Custom animations or local overrides if strictly necessary */
.animate-in {
  animation-fill-mode: forwards;
}
</style>
