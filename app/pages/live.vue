<template>
  <div class="space-y-8">
    <header>
      <h2 class="text-3xl font-bold text-[var(--text)] mb-2">Live Stream: Line A</h2>
      <p class="text-[var(--text-muted)]">Real-time Computer Vision waste classification monitoring.</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Camera Feed -->
      <div class="lg:col-span-3 space-y-4">
        <div class="aspect-video bg-black rounded-3xl overflow-hidden border border-[var(--border)] relative group">
          <!-- Mock Video Feed Placeholder -->
          <div class="absolute inset-0 bg-slate-900 flex items-center justify-center">
            <div class="text-slate-700 font-mono text-sm animate-pulse italic">
              CONNECTING TO EDGE_NODE_01...
            </div>
          </div>
          
          <!-- Mock Frame (Placeholder Image) -->
          <img 
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1200" 
            class="w-full h-full object-cover opacity-60 grayscale-[0.5]"
          />

          <!-- AI Overlays (Bounding Boxes) -->
          <div class="absolute inset-0 pointer-events-none p-12">
            <!-- Box 1: PET -->
            <div class="absolute top-[20%] left-[30%] w-[15%] h-[25%] border-2 border-emerald-500 rounded-lg animate-pulse">
              <div class="absolute -top-6 left-0 bg-emerald-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                PET BOTTLE • 98.4%
              </div>
            </div>
            
            <!-- Box 2: HDPE -->
            <div class="absolute top-[50%] left-[60%] w-[12%] h-[20%] border-2 border-blue-500 rounded-lg opacity-80">
              <div class="absolute -top-6 left-0 bg-blue-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                HDPE • 92.1%
              </div>
            </div>

            <!-- Box 3: Organik -->
            <div class="absolute top-[10%] left-[70%] w-[10%] h-[15%] border-2 border-amber-500 rounded-lg opacity-60">
              <div class="absolute -top-6 left-0 bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                ORGANIC • 88.7%
              </div>
            </div>
          </div>

          <!-- Feed Controls -->
          <div class="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <div class="flex items-center space-x-2">
              <div class="px-3 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-white flex items-center border border-white/10">
                <span class="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                REC • 1080P • 30FPS
              </div>
              <div class="px-3 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-white/10">
                LATENCY: 142MS
              </div>
            </div>
            <div class="flex space-x-2">
              <button class="p-2 rounded bg-black/60 backdrop-blur-md hover:bg-white/10 transition-colors border border-white/10">
                <IconSettings class="w-4 h-4 text-white" />
              </button>
              <button class="p-2 rounded bg-black/60 backdrop-blur-md hover:bg-white/10 transition-colors border border-white/10">
                <IconMaximize class="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex space-x-4">
            <button class="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
              Calibration Mode
            </button>
            <button class="px-6 py-2.5 rounded-xl bg-[var(--surface-lighter)] border border-[var(--border)] text-[var(--text)] font-bold text-sm hover:bg-[var(--border)] transition-all">
              Filter: All Categories
            </button>
          </div>
          <div class="text-xs text-[var(--text-muted)] italic">
            Connected to Edge Node ID: #SG-0812-JKT
          </div>
        </div>
      </div>

      <!-- Detection Log Bar -->
      <div class="glass-dark rounded-3xl border border-[var(--border)] flex flex-col overflow-hidden">
        <div class="p-6 border-b border-[var(--border)]">
          <h3 class="font-bold text-[var(--text)] uppercase tracking-widest text-xs">Real-time Detection</h3>
        </div>
        <div class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          <div v-for="n in 12" :key="n" class="p-3 rounded-2xl bg-[var(--surface-lighter)] border border-[var(--border)] flex items-center justify-between group hover:border-emerald-500/30 transition-all animate-in fade-in slide-in-from-right-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-[10px]">
                {{ Math.random() > 0.5 ? 'PET' : 'HDPE' }}
              </div>
              <div>
                <p class="text-xs font-bold text-[var(--text)]">Waste Item #{{ 400 + n }}</p>
                <p class="text-[10px] text-[var(--text-muted)]">Confidence: {{ (90 + Math.random() * 9).toFixed(1) }}%</p>
              </div>
            </div>
            <p class="text-[10px] font-mono text-[var(--text-muted)]">14:23:4{{ n }}</p>
          </div>
        </div>
        <div class="p-4 bg-white/5 border-t border-white/5">
          <div class="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
            <span>Flow Rate</span>
            <span>2.4 Items/sec</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const IconSettings = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.72V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' }),
  h('circle', { cx: '12', cy: '12', r: '3' })
])

const IconMaximize = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M8 3H5a2 2 0 0 0-2 2v3' }),
  h('path', { d: 'M21 8V5a2 2 0 0 0-2-2h-3' }),
  h('path', { d: 'M3 16v3a2 2 0 0 0 2 2h3' }),
  h('path', { d: 'M16 21h3a2 2 0 0 0 2-2v-3' })
])
</script>


