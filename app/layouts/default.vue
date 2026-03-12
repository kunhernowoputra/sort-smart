<template>
  <div class="min-h-screen flex text-[var(--text)] bg-[var(--background)] font-sans">
    <!-- Desktop Sidebar -->
    <aside class="hidden lg:flex flex-col w-64 border-r border-[var(--border)] glass-dark shadow-2xl">
      <div class="p-6">
        <h1 class="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          SortSmart AI
        </h1>
      </div>
      
      <nav class="flex-1 px-4 space-y-2 mt-4">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path"
          class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-white/5 border border-transparent"
          active-class="bg-emerald-500/10 text-emerald-400 !border-emerald-500/20"
        >
          <component :is="item.icon" class="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span class="font-medium">{{ item.name }}</span>
        </NuxtLink>
      </nav>
      
      <div class="p-4 border-t border-white/5 mt-auto">
        <div class="flex items-center space-x-3 p-2 rounded-xl bg-white/5">
          <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
            AD
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">Admin User</p>
            <p class="text-xs text-slate-500 truncate">admin@sortsmart.ai</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 relative h-screen overflow-hidden">
      <!-- Top Bar -->
      <header class="h-16 flex items-center justify-between px-6 border-b border-[var(--border)] glass backdrop-blur-md z-10">
        <div class="flex lg:hidden items-center space-x-4">
          <button class="p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors">
            <IconMenu class="w-6 h-6" />
          </button>
          <span class="text-lg font-bold text-emerald-400">SortSmart</span>
        </div>
        
        <div class="hidden lg:flex items-center text-sm text-slate-400">
          <span class="hover:text-slate-200 cursor-pointer transition-colors">SortSmart AI</span>
          <span class="mx-2">/</span>
          <span class="text-slate-200 font-medium capitalize">{{ currentRouteName }}</span>
        </div>
        
        <div class="flex items-center space-x-4">
          <ThemeToggle />
          <button class="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-lighter)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors relative">
            <IconBell class="w-5 h-5" />
            <span class="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full"></span>
          </button>
          <button class="p-2 rounded-lg border-2 border-emerald-500 bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all font-bold text-xs uppercase tracking-widest px-6">
            Upload
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

// Icons as simple SVG functional components to avoid heavy dependencies for now
const IconLayout = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }),
  h('line', { x1: '3', y1: '9', x2: '21', y2: '9' }),
  h('line', { x1: '9', y1: '21', x2: '9', y2: '9' })
])

const IconCCTV = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M16 10V7a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h4' }),
  h('path', { d: 'M10 14h.01' }),
  h('rect', { x: '16', y: '13', width: '5', height: '6', rx: '1' }),
  h('path', { d: 'm21 16 3 3' }),
  h('path', { d: 'M14 20h2' })
])

const IconChart = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('line', { x1: '18', y1: '20', x2: '18', y2: '10' }),
  h('line', { x1: '12', y1: '20', x2: '12', y2: '4' }),
  h('line', { x1: '6', y1: '20', x2: '6', y2: '14' })
])

const IconFileText = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' }),
  h('polyline', { points: '14 2 14 8 20 8' }),
  h('line', { x1: '16', y1: '13', x2: '8', y2: '13' }),
  h('line', { x1: '16', y1: '17', x2: '8', y2: '17' }),
  h('line', { x1: '10', y1: '9', x2: '8', y2: '9' })
])

const IconMenu = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('line', { x1: '3', y1: '12', x2: '21', y2: '12' }),
  h('line', { x1: '3', y1: '6', x2: '21', y2: '6' }),
  h('line', { x1: '3', y1: '18', x2: '21', y2: '18' })
])

const IconBell = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' }),
  h('path', { d: 'M10.3 21a1.94 1.94 0 0 0 3.4 0' })
])

const navItems = [
  { name: 'Dashboard', path: '/', icon: IconLayout },
  { name: 'Live Stream', path: '/live', icon: IconCCTV },
  { name: 'Analytics', path: '/analytics', icon: IconChart },
  { name: 'ESG Reports', path: '/reports', icon: IconFileText },
]

const currentRouteName = computed(() => {
  if (route.path === '/') return 'Dashboard Overview'
  return route.path.replace('/', '').replace('-', ' ')
})
</script>


