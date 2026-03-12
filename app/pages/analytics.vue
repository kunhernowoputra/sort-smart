<template>
  <div class="space-y-8 pb-12">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold text-[var(--text)] mb-2">Detailed Analytics</h2>
        <p class="text-[var(--text-muted)]">Deep dive into material recovery rates and efficiency.</p>
      </div>
      <div class="flex items-center space-x-3">
        <button class="px-4 py-2 rounded-xl bg-[var(--surface-lighter)] border border-[var(--border)] text-[var(--text)] text-sm font-medium hover:bg-[var(--border)] transition-all flex items-center">
          <IconDownload class="w-4 h-4 mr-2" />
          Export CSV
        </button>
        <button class="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-sm font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center">
          <IconFile class="w-4 h-4 mr-2" />
          Generate ESG Report
        </button>
      </div>
    </header>

    <!-- Detailed Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recovery by Category -->
      <div class="lg:col-span-2 glass-dark rounded-3xl p-8 border border-white/10">
        <h3 class="text-xl font-bold mb-8">Recovery Rate by Category</h3>
        <div class="space-y-6">
          <div v-for="cat in categories" :key="cat.name" class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-[var(--text-muted)] font-medium">{{ cat.name }}</span>
              <span class="text-[var(--text)] font-mono font-bold">{{ cat.rate }}%</span>
            </div>
            <div class="h-2 w-full bg-[var(--surface-lighter)] rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000"
                :style="{ width: cat.rate + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Efficiency Metrics -->
      <div class="glass-dark rounded-3xl p-8 border border-white/10">
        <h3 class="text-xl font-bold mb-8">Efficiency KPIs</h3>
        <div class="space-y-8">
          <div class="flex items-center justify-between group">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <IconZap class="w-5 h-5" />
              </div>
              <div>
                <p class="text-xs text-slate-500 uppercase font-black tracking-widest">Throughput</p>
                <p class="text-lg font-bold">1,240 <span class="text-xs text-slate-500 font-normal italic">Items/hr</span></p>
              </div>
            </div>
            <div class="text-emerald-400 text-xs font-bold">+8%</div>
          </div>

          <div class="flex items-center justify-between group">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <IconClock class="w-5 h-5" />
              </div>
              <div>
                <p class="text-xs text-slate-500 uppercase font-black tracking-widest">Uptime</p>
                <p class="text-lg font-bold">99.2 <span class="text-xs text-slate-500 font-normal italic">%</span></p>
              </div>
            </div>
            <div class="text-emerald-400 text-xs font-bold">+0.4%</div>
          </div>

          <div class="flex items-center justify-between group">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <IconAlert class="w-5 h-5" />
              </div>
              <div>
                <p class="text-xs text-slate-500 uppercase font-black tracking-widest">False Positives</p>
                <p class="text-lg font-bold">1.4 <span class="text-xs text-slate-500 font-normal italic">%</span></p>
              </div>
            </div>
            <div class="text-rose-400 text-xs font-bold">-12%</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Table Preview -->
    <div class="glass-dark rounded-3xl border border-[var(--border)] overflow-hidden">
      <div class="p-8 border-b border-[var(--border)] flex items-center justify-between">
        <h3 class="text-xl font-bold text-[var(--text)]">Recent Classification Data</h3>
        <div class="flex space-x-2">
          <div class="px-4 py-2 rounded-xl bg-[var(--surface-lighter)] border border-[var(--border)] text-xs text-[var(--text-muted)] flex items-center">
            Filter: All Lines
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="text-[10px] text-[var(--text-muted)] uppercase font-black tracking-widest border-b border-[var(--border)]">
              <th class="px-8 py-4">Item ID</th>
              <th class="px-8 py-4">Category</th>
              <th class="px-8 py-4">Confidence</th>
              <th class="px-8 py-4">Line</th>
              <th class="px-8 py-4">Timestamp</th>
              <th class="px-8 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border)]">
            <tr v-for="n in 5" :key="n" class="hover:bg-[var(--surface-lighter)] transition-colors group">
              <td class="px-8 py-4 font-mono text-xs text-emerald-400">#SS-TRX-{{ 1000 + n }}</td>
              <td class="px-8 py-4">
                <span class="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">
                  {{ n % 2 === 0 ? 'PET Plastic' : 'HDPE Plastic' }}
                </span>
              </td>
              <td class="px-8 py-4 text-sm font-medium">9{{ 6 + n }}.2%</td>
              <td class="px-8 py-4 text-sm text-slate-400">Main Line B</td>
              <td class="px-8 py-4 text-sm text-slate-500">2025-03-12 14:42:{{ n }}0</td>
              <td class="px-8 py-4 text-right">
                <button class="p-2 rounded-lg hover:bg-white/5 text-slate-500 group-hover:text-white transition-colors">
                  <IconEye class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const categories = [
  { name: 'PET Plastic', rate: 84 },
  { name: 'HDPE Plastic', rate: 72 },
  { name: 'Paper & Cardboard', rate: 91 },
  { name: 'Metals (Aluminium)', rate: 65 },
  { name: 'Glass', rate: 58 },
  { name: 'Organic Waste', rate: 42 },
]

const IconDownload = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
  h('polyline', { points: '7 10 12 15 17 10' }),
  h('line', { x1: '12', y1: '15', x2: '12', y2: '3' })
])

const IconFile = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' }),
  h('polyline', { points: '14 2 14 8 20 8' })
])

const IconZap = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('polygon', { points: '13 2 3 14 12 14 11 22 21 10 12 10 13 2' })
])

const IconClock = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('circle', { cx: '12', cy: '12', r: '10' }),
  h('polyline', { points: '12 6 12 12 16 14' })
])

const IconAlert = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('circle', { cx: '12', cy: '12', r: '10' }),
  h('line', { x1: '12', y1: '8', x2: '12', y2: '12' }),
  h('line', { x1: '12', y1: '16', x2: '12.01', y2: '16' })
])

const IconEye = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' }),
  h('circle', { cx: '12', cy: '12', r: '3' })
])
</script>
