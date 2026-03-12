import { mergeProps, unref, computed, createVNode, resolveDynamicComponent, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderVNode } from 'vue/server-renderer';

const _sfc_main$1 = {
  __name: "StatCard",
  __ssrInlineRender: true,
  props: {
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
      default: "emerald"
    }
  },
  setup(__props) {
    const props = __props;
    const colorClasses = {
      emerald: "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20",
      blue: "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20",
      amber: "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20",
      purple: "bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20"
    };
    const IconPackage = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("path", { d: "m7.5 4.27 9 5.15" }),
      h("path", { d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" }),
      h("path", { d: "m3.3 7 8.7 5 8.7-5" }),
      h("path", { d: "M12 22V12" })
    ]);
    const IconRefresh = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }),
      h("path", { d: "M3 3v5h5" }),
      h("path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" }),
      h("path", { d: "M16 16h5v5" })
    ]);
    const IconGrid = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("rect", { x: "3", y: "3", width: "7", height: "7" }),
      h("rect", { x: "14", y: "3", width: "7", height: "7" }),
      h("rect", { x: "14", y: "14", width: "7", height: "7" }),
      h("rect", { x: "3", y: "14", width: "7", height: "7" })
    ]);
    const IconTarget = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("circle", { cx: "12", cy: "12", r: "10" }),
      h("circle", { cx: "12", cy: "12", r: "6" }),
      h("circle", { cx: "12", cy: "12", r: "2" })
    ]);
    const iconMap = {
      IconPackage,
      IconRefresh,
      IconGrid,
      IconTarget
    };
    const iconComponent = computed(() => iconMap[props.icon] || IconPackage);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-dark rounded-3xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-500 group" }, _attrs))}><div class="flex items-center justify-between mb-4"><div class="${ssrRenderClass([
        "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
        colorClasses[__props.color] || colorClasses.emerald
      ])}">`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(iconComponent)), { class: "w-6 h-6" }, null), _parent);
      _push(`</div>`);
      if (__props.change) {
        _push(`<div class="${ssrRenderClass([
          "text-xs font-bold px-2 py-1 rounded-lg flex items-center",
          __props.trendUp ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
        ])}">`);
        if (__props.trendUp) {
          _push(`<span class="mr-1">\u2191</span>`);
        } else {
          _push(`<span class="mr-1">\u2193</span>`);
        }
        _push(` ${ssrInterpolate(__props.change)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><p class="text-slate-500 text-sm font-medium mb-1">${ssrInterpolate(__props.title)}</p><div class="flex items-baseline space-x-2"><h4 class="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">${ssrInterpolate(__props.value)}</h4>`);
      if (__props.unit) {
        _push(`<span class="text-xs text-slate-600 font-bold uppercase">${ssrInterpolate(__props.unit)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StatCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const StatCard = _sfc_main$1;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8 pb-12" }, _attrs))}><header class="flex flex-col md:flex-row md:items-center justify-between gap-4"><div><h2 class="text-3xl font-bold text-white mb-2">Dashboard Overview</h2><p class="text-slate-400">Monitoring waste processing performance across all lines.</p></div><div class="flex items-center space-x-3 text-sm"><div class="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center"><span class="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span> System Online </div><div class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300"> Last updated: Just now </div></div></header><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">`);
      _push(ssrRenderComponent(unref(StatCard), {
        title: "Total Waste Processed",
        value: "12.5",
        unit: "Tons",
        change: "+12%",
        "trend-up": true,
        icon: "IconPackage"
      }, null, _parent));
      _push(ssrRenderComponent(unref(StatCard), {
        title: "Recovery Rate",
        value: "78.4",
        unit: "%",
        change: "+5.2%",
        "trend-up": true,
        icon: "IconRefresh",
        color: "emerald"
      }, null, _parent));
      _push(ssrRenderComponent(unref(StatCard), {
        title: "Material Categories",
        value: "24",
        unit: "Active",
        icon: "IconGrid",
        color: "blue"
      }, null, _parent));
      _push(ssrRenderComponent(unref(StatCard), {
        title: "System Accuracy",
        value: "94.2",
        unit: "%",
        change: "-0.5%",
        "trend-up": false,
        icon: "IconTarget",
        color: "amber"
      }, null, _parent));
      _push(`</div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 glass-dark rounded-3xl p-8 border border-white/10"><div class="flex items-center justify-between mb-8"><h3 class="text-xl font-bold">Material Composition</h3><select class="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-emerald-500/50"><option>Last 24 Hours</option><option>Last 7 Days</option><option>Monthly</option></select></div><div class="h-64 flex items-end justify-between gap-4 px-4"><!--[-->`);
      ssrRenderList([65, 40, 85, 30, 90, 55, 70], (val, i) => {
        _push(`<div class="flex-1 group relative"><div class="w-full bg-gradient-to-t from-emerald-500/40 to-emerald-400/80 rounded-t-lg transition-all duration-500 group-hover:from-emerald-400 group-hover:to-emerald-300" style="${ssrRenderStyle({ height: val + "%" })}"><div class="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded whitespace-nowrap transition-opacity">${ssrInterpolate(val)}% </div></div><div class="text-[10px] text-slate-500 text-center mt-3 uppercase tracking-tighter">Day ${ssrInterpolate(i + 1)}</div></div>`);
      });
      _push(`<!--]--></div></div><div class="glass-dark rounded-3xl p-8 border border-white/10"><h3 class="text-xl font-bold mb-6">Live Events</h3><div class="space-y-6"><!--[-->`);
      ssrRenderList(5, (n) => {
        _push(`<div class="flex space-x-4 group cursor-pointer"><div class="w-1 bg-emerald-500/40 group-hover:bg-emerald-400 rounded-full transition-colors"></div><div class="flex-1"><p class="text-sm font-medium">PET Bottle Detected</p><p class="text-xs text-slate-500">Line A \u2022 Confidence 98.2%</p></div><p class="text-[10px] text-slate-600 font-mono">14:2${ssrInterpolate(n)} PM</p></div>`);
      });
      _push(`<!--]--></div><button class="w-full mt-8 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors"> View All Logs </button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DKaAnduA.mjs.map
