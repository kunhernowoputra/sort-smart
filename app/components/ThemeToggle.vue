<template>
  <button 
    @click="toggleTheme"
    class="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-lighter)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors relative"
    title="Toggle Theme"
  >
    <IconSun v-if="colorMode.preference === 'dark'" class="w-5 h-5" />
    <IconMoon v-else class="w-5 h-5" />
  </button>
</template>

<script setup>
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const IconSun = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('circle', { cx: '12', cy: '12', r: '4' }),
  h('path', { d: 'M12 2v2' }),
  h('path', { d: 'M12 20v2' }),
  h('path', { d: 'm4.93 4.93 1.41 1.41' }),
  h('path', { d: 'm17.66 17.66 1.41 1.41' }),
  h('path', { d: 'M2 12h2' }),
  h('path', { d: 'M20 12h2' }),
  h('path', { d: 'm6.34 17.66-1.41 1.41' }),
  h('path', { d: 'm19.07 4.93-1.41 1.41' })
])

const IconMoon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' })
])
</script>
