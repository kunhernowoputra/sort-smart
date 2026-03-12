<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-[#050f0a] font-['Inter',sans-serif] overflow-hidden selection:bg-[#00ff88]/30">
    <!-- Top Right Theme Toggle -->
    <div class="absolute top-6 right-8 z-50">
      <ThemeToggle />
    </div>

    <!-- LEFT PANEL: BRANDING & PARTICLES -->
    <div class="hidden md:flex md:w-1/2 relative flex-col justify-center p-20 overflow-hidden border-r border-[#00ff88]/10">
      <!-- Particle Canvas -->
      <canvas ref="particleCanvas" class="absolute inset-0 z-0 opacity-40"></canvas>
      
      <!-- Content Overlay -->
      <div class="relative z-10 space-y-12 animate-in fade-in slide-in-from-left-12 duration-1000">
        <div class="space-y-6">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-[#00ff88]/10 rounded-2xl flex items-center justify-center border border-[#00ff88]/20 glow-pulse">
              <IconLeafPulse class="text-[#00ff88]" />
            </div>
            <span class="text-xl font-bold tracking-tight text-white">SortSmart AI</span>
          </div>
          
          <h1 class="text-6xl font-black leading-[1.1] text-white">
            Future of <br/> 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#00c96b] to-[#00ff88]">Waste Sorting.</span>
          </h1>
          
          <p class="text-2xl font-medium text-[#6b8f7a] h-8 min-h-[32px]">
            {{ typewrittenTagline }}<span class="animate-pulse">|</span>
          </p>
        </div>

        <!-- Feature Pills -->
        <div class="flex flex-wrap gap-3">
          <div v-for="pill in features" :key="pill.name" class="px-4 py-2 rounded-full glass border border-[#00ff88]/10 text-sm font-medium text-[#f0faf4] flex items-center space-x-2 hover:border-[#00ff88]/40 transition-colors cursor-default">
            <span>{{ pill.icon }}</span>
            <span>{{ pill.name }}</span>
          </div>
        </div>

        <!-- Social Proof -->
        <div class="pt-12 flex items-center space-x-4 border-t border-white/5">
          <div class="flex -space-x-3">
            <div v-for="i in 4" :key="i" class="w-10 h-10 rounded-full border-2 border-[#050f0a] bg-[var(--surface-lighter)] flex items-center justify-center text-[10px] font-bold text-white overflow-hidden">
               <img :src="`https://i.pravatar.cc/100?img=${i+10}`" alt="avatar" />
            </div>
          </div>
          <div class="text-sm font-medium">
            <span class="text-white block">50+ Cities Trust Us</span>
            <span class="text-[#6b8f7a]">Building sustainable ecosystems.</span>
          </div>
        </div>
      </div>

      <!-- Noise Texture -->
      <div class="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>

    <!-- RIGHT PANEL: LOGIN FORM -->
    <div class="flex-1 flex items-center justify-center p-8 relative">
      <!-- Mobile Hero -->
      <div class="md:hidden absolute top-12 left-8 right-8 text-center space-y-4">
        <IconLeafPulse class="w-12 h-12 text-[#00ff88] mx-auto glow-pulse" />
        <h2 class="text-2xl font-bold text-white">SortSmart AI</h2>
      </div>

      <div class="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
        <div class="bg-white/5 backdrop-blur-[40px] p-10 md:p-12 rounded-[32px] border border-[var(--border)] relative group overflow-hidden">
          <!-- Ambient Glow -->
          <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#00ff88]/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#00ff88]/10 transition-all duration-1000"></div>

          <div class="text-center mb-10">
            <h2 class="text-3xl font-bold tracking-tight text-white bg-gradient-to-r from-white to-[#6b8f7a] bg-clip-text text-transparent">
              Selamat Datang Kembali
            </h2>
            <p class="text-[#6b8f7a] mt-3 font-medium">Masuk ke dashboard pengelolaan sampah Anda</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6 relative z-10" @shake="isShaking = true">
            <!-- Email Input -->
            <div class="space-y-1.5 relative group">
              <label class="block text-sm font-medium text-[#6b8f7a] transition-all group-focus-within:text-[#00ff88] ml-1">Email Address</label>
              <div class="relative">
                <IconMail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b8f7a] group-focus-within:text-[#00ff88] transition-colors" />
                <input 
                  v-model="email"
                  type="email" 
                  placeholder="name@company.com"
                  class="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#00ff88]/50 focus:ring-4 focus:ring-[#00ff88]/10 transition-all text-white font-medium placeholder:text-[#6b8f7a]/50"
                  required
                />
              </div>
            </div>

            <!-- Password Input -->
            <div class="space-y-1.5 relative group">
              <label class="block text-sm font-medium text-[#6b8f7a] transition-all group-focus-within:text-[#00ff88] ml-1">Password</label>
              <div class="relative">
                <IconLock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b8f7a] group-focus-within:text-[#00ff88] transition-colors" />
                <input 
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'" 
                  placeholder="••••••••"
                  class="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-[#00ff88]/50 focus:ring-4 focus:ring-[#00ff88]/10 transition-all text-white font-medium placeholder:text-[#6b8f7a]/50"
                  required
                />
                <button 
                  type="button" 
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#6b8f7a] hover:text-white transition-colors"
                >
                  <IconEye v-if="!showPassword" class="w-5 h-5" />
                  <IconEyeOff v-else class="w-5 h-5" />
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between px-1">
              <label class="flex items-center cursor-pointer group">
                <input type="checkbox" class="hidden" v-model="rememberMe" />
                <div class="w-5 h-5 border-2 border-white/10 rounded-lg flex items-center justify-center transition-all group-hover:border-[#00ff88]/50 bg-white/[0.03]" :class="{'bg-[#00ff88] border-[#00ff88]': rememberMe}">
                  <IconCheck v-if="rememberMe" class="w-3.5 h-3.5 text-[#050f0a] font-black" />
                </div>
                <span class="ml-3 text-sm text-[#6b8f7a] font-medium group-hover:text-white transition-colors">Ingat saya</span>
              </label>
              <a href="#" class="text-sm font-bold text-[#00ff88] hover:text-[#00c96b] transition-colors">Lupa Password?</a>
            </div>

            <button 
              type="submit"
              :disabled="isLoading"
              class="w-full py-4 bg-gradient-to-r from-[#00c96b] to-[#00ff88] text-[#050f0a] font-black rounded-2xl hover:scale-[1.01] hover:shadow-2xl hover:shadow-[#00ff88]/20 active:scale-[0.99] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm shadow-xl shadow-[#00ff88]/10 group/btn overflow-hidden relative"
            >
              <!-- Shimmer Effect -->
              <div class="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              <span v-if="!isLoading" class="relative z-10">MASUK SEKARANG</span>
              <div v-else class="flex space-x-1">
                <div v-for="i in 3" :key="i" class="w-1.5 h-1.5 bg-[#050f0a] rounded-full animate-bounce" :style="{ animationDelay: (i*0.1)+'s' }"></div>
              </div>
            </button>
          </form>

          <footer class="mt-10 text-center text-sm text-[#6b8f7a]">
            Belum punya akun? <a href="#" class="text-white font-bold hover:text-[#00ff88] transition-colors">Hubungi Admin</a>
          </footer>
        </div>

        <div v-if="error" class="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-bold animate-shake">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, h } from 'vue'

definePageMeta({ layout: false })

const { login } = useAuth()
const email = ref('admin@sortsmart.ai')
const password = ref('password')
const showPassword = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)
const error = ref('')
const isShaking = ref(false)

// Features data
const features = [
  { name: 'AI Sorting', icon: '♻️' },
  { name: 'Real-time', icon: '📊' },
  { name: 'Eco Impact', icon: '🌿' }
]

// Typewriter Logic
const tagline = "Platform Sortasi Sampah Masa Depan"
const typewrittenTagline = ref('')
let taglineIdx = 0

const startTypewriter = () => {
  if (taglineIdx < tagline.length) {
    typewrittenTagline.value += tagline.charAt(taglineIdx)
    taglineIdx++
    setTimeout(startTypewriter, 100)
  }
}

// Particle Canvas Logic
const particleCanvas = ref(null)
let particles = []
let animationFrameId = null

const initParticles = () => {
  const canvas = particleCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  canvas.width = canvas.parentElement.offsetWidth
  canvas.height = canvas.parentElement.offsetHeight

  particles = []
  const count = 60

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2
    })
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => {
      p.x += p.speedX
      p.y += p.speedY

      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 255, 136, ${p.opacity})`
      ctx.fill()
    })
    animationFrameId = requestAnimationFrame(animate)
  }
  animate()
}

onMounted(() => {
  startTypewriter()
  initParticles()
  window.addEventListener('resize', initParticles)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', initParticles)
})

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true
  
  const result = await login(email.value, password.value)
  
  if (result.success) {
    await navigateTo('/')
  } else {
    error.value = result.error
    // Shake effect trigger
  }
  isLoading.value = false
}

// Icon Components
const hIcon = (path, attrs = {}) => h('svg', { 
  xmlns: 'http://www.w3.org/2000/svg', 
  width: '24', height: '24', viewBox: '0 0 24 24', 
  fill: 'none', stroke: 'currentColor', 
  'stroke-width': '2', 'stroke-linecap': 'round', 
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

const IconCheck = () => hIcon([
  h('polyline', { points: '20 6 9 17 4 12' })
], { 'stroke-width': '4' })

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

const IconLeafPulse = (props) => hIcon([
  h('path', { d: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.7 10-10 10Z' }),
  h('path', { d: 'M19 2c-1.5 3-3.08 4.25-5 5.5' }),
  h('path', { d: 'M11 20c1.15-5.36 2.38-7.7 5.5-12.5' })
], { class: props.class })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');

.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  50% { transform: translateX(8px); }
  75% { transform: translateX(-8px); }
}

.animate-shake {
  animation: shake 0.4s ease-in-out;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(200%) skewX(-15deg); }
}
</style>
