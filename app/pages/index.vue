<template>
  <div class="space-y-8 pb-12">
    <!-- Hero Section -->
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
        <p class="text-slate-400">Monitoring waste processing performance across all lines.</p>
      </div>
      <div class="flex items-center space-x-3 text-sm">
        <div class="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center">
          <span class="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
          System Online
        </div>
        <div class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
          Last updated: Just now
        </div>
      </div>
    </header>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Waste Processed" 
        value="12.5" 
        unit="Tons" 
        change="+12%" 
        :trend-up="true"
        icon="IconPackage"
      />
      <StatCard 
        title="Recovery Rate" 
        value="78.4" 
        unit="%" 
        change="+5.2%" 
        :trend-up="true"
        icon="IconRefresh"
        color="emerald"
      />
      <StatCard 
        title="Material Categories" 
        value="24" 
        unit="Active" 
        icon="IconGrid"
        color="blue"
      />
      <StatCard 
        title="System Accuracy" 
        value="94.2" 
        unit="%" 
        change="-0.5%" 
        :trend-up="false"
        icon="IconTarget"
        color="amber"
      />
    </div>

    <!-- Charts and Details -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Chart -->
      <div class="lg:col-span-2 glass-dark rounded-3xl p-8 border border-white/10">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-xl font-bold">Material Composition</h3>
          <select class="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-emerald-500/50">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Monthly</option>
          </select>
        </div>
        
        <div class="h-64 flex items-end justify-between gap-4 px-4">
          <div v-for="(val, i) in [65, 40, 85, 30, 90, 55, 70]" :key="i" class="flex-1 group relative">
            <div 
              class="w-full bg-gradient-to-t from-emerald-500/40 to-emerald-400/80 rounded-t-lg transition-all duration-500 group-hover:from-emerald-400 group-hover:to-emerald-300"
              :style="{ height: val + '%' }"
            >
              <div class="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded whitespace-nowrap transition-opacity">
                {{ val }}%
              </div>
            </div>
            <div class="text-[10px] text-slate-500 text-center mt-3 uppercase tracking-tighter">Day {{ i + 1 }}</div>
          </div>
        </div>
      </div>

      <!-- Recent Alerts/Log -->
      <div class="glass-dark rounded-3xl p-8 border border-white/10">
        <h3 class="text-xl font-bold mb-6">Live Events</h3>
        <div class="space-y-6">
          <div v-for="n in 5" :key="n" class="flex space-x-4 group cursor-pointer">
            <div class="w-1 bg-emerald-500/40 group-hover:bg-emerald-400 rounded-full transition-colors"></div>
            <div class="flex-1">
              <p class="text-sm font-medium">PET Bottle Detected</p>
              <p class="text-xs text-slate-500">Line A • Confidence 98.2%</p>
            </div>
            <p class="text-[10px] text-slate-600 font-mono">14:2{{ n }} PM</p>
          </div>
        </div>
        <button class="w-full mt-8 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors">
          View All Logs
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

// Simulating StatCard component until created
const StatCard = resolveComponent('StatCard')
</script>
