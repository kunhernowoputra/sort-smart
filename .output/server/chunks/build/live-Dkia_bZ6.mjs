import { mergeProps, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = {
  __name: "live",
  __ssrInlineRender: true,
  setup(__props) {
    const IconSettings = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.72V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
      h("circle", { cx: "12", cy: "12", r: "3" })
    ]);
    const IconMaximize = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("path", { d: "M8 3H5a2 2 0 0 0-2 2v3" }),
      h("path", { d: "M21 8V5a2 2 0 0 0-2-2h-3" }),
      h("path", { d: "M3 16v3a2 2 0 0 0 2 2h3" }),
      h("path", { d: "M16 21h3a2 2 0 0 0 2-2v-3" })
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))} data-v-78cd3cfd><header data-v-78cd3cfd><h2 class="text-3xl font-bold text-white mb-2" data-v-78cd3cfd>Live Stream: Line A</h2><p class="text-slate-400" data-v-78cd3cfd>Real-time Computer Vision waste classification monitoring.</p></header><div class="grid grid-cols-1 lg:grid-cols-4 gap-8" data-v-78cd3cfd><div class="lg:col-span-3 space-y-4" data-v-78cd3cfd><div class="aspect-video glass-dark rounded-3xl overflow-hidden border border-white/10 relative group" data-v-78cd3cfd><div class="absolute inset-0 bg-slate-900 flex items-center justify-center" data-v-78cd3cfd><div class="text-slate-700 font-mono text-sm animate-pulse italic" data-v-78cd3cfd> CONNECTING TO EDGE_NODE_01... </div></div><img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&amp;fit=crop&amp;q=80&amp;w=1200" class="w-full h-full object-cover opacity-60 grayscale-[0.5]" data-v-78cd3cfd><div class="absolute inset-0 pointer-events-none p-12" data-v-78cd3cfd><div class="absolute top-[20%] left-[30%] w-[15%] h-[25%] border-2 border-emerald-500 rounded-lg animate-pulse" data-v-78cd3cfd><div class="absolute -top-6 left-0 bg-emerald-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded uppercase" data-v-78cd3cfd> PET BOTTLE \u2022 98.4% </div></div><div class="absolute top-[50%] left-[60%] w-[12%] h-[20%] border-2 border-blue-500 rounded-lg opacity-80" data-v-78cd3cfd><div class="absolute -top-6 left-0 bg-blue-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase" data-v-78cd3cfd> HDPE \u2022 92.1% </div></div><div class="absolute top-[10%] left-[70%] w-[10%] h-[15%] border-2 border-amber-500 rounded-lg opacity-60" data-v-78cd3cfd><div class="absolute -top-6 left-0 bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded uppercase" data-v-78cd3cfd> ORGANIC \u2022 88.7% </div></div></div><div class="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity" data-v-78cd3cfd><div class="flex items-center space-x-2" data-v-78cd3cfd><div class="px-3 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-white flex items-center border border-white/10" data-v-78cd3cfd><span class="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 animate-pulse" data-v-78cd3cfd></span> REC \u2022 1080P \u2022 30FPS </div><div class="px-3 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-white/10" data-v-78cd3cfd> LATENCY: 142MS </div></div><div class="flex space-x-2" data-v-78cd3cfd><button class="p-2 rounded bg-black/60 backdrop-blur-md hover:bg-white/10 transition-colors border border-white/10" data-v-78cd3cfd>`);
      _push(ssrRenderComponent(IconSettings, { class: "w-4 h-4 text-white" }, null, _parent));
      _push(`</button><button class="p-2 rounded bg-black/60 backdrop-blur-md hover:bg-white/10 transition-colors border border-white/10" data-v-78cd3cfd>`);
      _push(ssrRenderComponent(IconMaximize, { class: "w-4 h-4 text-white" }, null, _parent));
      _push(`</button></div></div></div><div class="flex items-center justify-between" data-v-78cd3cfd><div class="flex space-x-4" data-v-78cd3cfd><button class="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20" data-v-78cd3cfd> Calibration Mode </button><button class="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all" data-v-78cd3cfd> Filter: All Categories </button></div><div class="text-xs text-slate-500 italic" data-v-78cd3cfd> Connected to Edge Node ID: #SG-0812-JKT </div></div></div><div class="glass-dark rounded-3xl border border-white/10 flex flex-col overflow-hidden" data-v-78cd3cfd><div class="p-6 border-b border-white/5" data-v-78cd3cfd><h3 class="font-bold text-white uppercase tracking-widest text-xs" data-v-78cd3cfd>Real-time Detection</h3></div><div class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar" data-v-78cd3cfd><!--[-->`);
      ssrRenderList(12, (n) => {
        _push(`<div class="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-emerald-500/30 transition-all animate-in fade-in slide-in-from-right-4" data-v-78cd3cfd><div class="flex items-center space-x-3" data-v-78cd3cfd><div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-[10px]" data-v-78cd3cfd>${ssrInterpolate(Math.random() > 0.5 ? "PET" : "HDPE")}</div><div data-v-78cd3cfd><p class="text-xs font-bold text-slate-200" data-v-78cd3cfd>Waste Item #${ssrInterpolate(400 + n)}</p><p class="text-[10px] text-slate-500" data-v-78cd3cfd>Confidence: ${ssrInterpolate((90 + Math.random() * 9).toFixed(1))}%</p></div></div><p class="text-[10px] font-mono text-slate-600" data-v-78cd3cfd>14:23:4${ssrInterpolate(n)}</p></div>`);
      });
      _push(`<!--]--></div><div class="p-4 bg-white/5 border-t border-white/5" data-v-78cd3cfd><div class="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase" data-v-78cd3cfd><span data-v-78cd3cfd>Flow Rate</span><span data-v-78cd3cfd>2.4 Items/sec</span></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/live.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const live = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-78cd3cfd"]]);

export { live as default };
//# sourceMappingURL=live-Dkia_bZ6.mjs.map
