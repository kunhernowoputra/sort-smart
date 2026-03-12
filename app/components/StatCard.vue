<template>
  <div class="glass-dark rounded-3xl p-6 border border-[var(--border)] hover:border-emerald-500/30 transition-all duration-500 group">
    <div class="flex items-center justify-between mb-4">
      <div :class="[
        'w-12 h-12 rounded-2xl flex items-center justify-center transition-colors',
        colorClasses[color] || colorClasses.emerald
      ]">
        <component :is="iconComponent" class="w-6 h-6" />
      </div>
      <div v-if="change" :class="[
        'text-xs font-bold px-2 py-1 rounded-lg flex items-center',
        trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
      ]">
        <span v-if="trendUp" class="mr-1">↑</span>
        <span v-else class="mr-1">↓</span>
        {{ change }}
      </div>
    </div>
    
    <div>
      <p class="text-[var(--text-muted)] text-sm font-medium mb-1">{{ title }}</p>
      <div class="flex items-baseline space-x-2">
        <h4 class="text-2xl font-bold text-[var(--text)] group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
          {{ value }}
        </h4>
        <span v-if="unit" class="text-xs text-[var(--text-muted)] font-bold uppercase">{{ unit }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  value: [String, Number],
  unit: String,
  change: String,
  trendUp: {
    type: Boolean,
    default: true
  },
  icon: String,
  color: {
    type: String,
    default: 'emerald'
  }
})

const colorClasses = {
  emerald: 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20',
  blue: 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20',
  amber: 'bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20',
  purple: 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20',
}

// Map icon string to SVG functional components
const IconPackage = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'm7.5 4.27 9 5.15' }),
  h('path', { d: 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z' }),
  h('path', { d: 'm3.3 7 8.7 5 8.7-5' }),
  h('path', { d: 'M12 22V12' })
])

const IconRefresh = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' }),
  h('path', { d: 'M3 3v5h5' }),
  h('path', { d: 'M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16' }),
  h('path', { d: 'M16 16h5v5' })
])

const IconGrid = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('rect', { x: '3', y: '3', width: '7', height: '7' }),
  h('rect', { x: '14', y: '3', width: '7', height: '7' }),
  h('rect', { x: '14', y: '14', width: '7', height: '7' }),
  h('rect', { x: '3', y: '14', width: '7', height: '7' })
])

const IconTarget = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('circle', { cx: '12', cy: '12', r: '10' }),
  h('circle', { cx: '12', cy: '12', r: '6' }),
  h('circle', { cx: '12', cy: '12', r: '2' })
])

const iconMap = {
  IconPackage,
  IconRefresh,
  IconGrid,
  IconTarget
}

const iconComponent = computed(() => iconMap[props.icon] || IconPackage)
</script>
