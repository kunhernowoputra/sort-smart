import { _ as __nuxt_component_0 } from './nuxt-link-B0njcCop.mjs';
import { useSSRContext, computed, mergeProps, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, toDisplayString, unref, h } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderVNode, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { b as useRoute } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'pinia';
import 'vue-router';

const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const IconLayout = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
      h("line", { x1: "3", y1: "9", x2: "21", y2: "9" }),
      h("line", { x1: "9", y1: "21", x2: "9", y2: "9" })
    ]);
    const IconCCTV = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("path", { d: "M16 10V7a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h4" }),
      h("path", { d: "M10 14h.01" }),
      h("rect", { x: "16", y: "13", width: "5", height: "6", rx: "1" }),
      h("path", { d: "m21 16 3 3" }),
      h("path", { d: "M14 20h2" })
    ]);
    const IconChart = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("line", { x1: "18", y1: "20", x2: "18", y2: "10" }),
      h("line", { x1: "12", y1: "20", x2: "12", y2: "4" }),
      h("line", { x1: "6", y1: "20", x2: "6", y2: "14" })
    ]);
    const IconFileText = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("path", { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" }),
      h("polyline", { points: "14 2 14 8 20 8" }),
      h("line", { x1: "16", y1: "13", x2: "8", y2: "13" }),
      h("line", { x1: "16", y1: "17", x2: "8", y2: "17" }),
      h("line", { x1: "10", y1: "9", x2: "8", y2: "9" })
    ]);
    const IconMenu = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
      h("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
      h("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
    ]);
    const IconBell = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" }),
      h("path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" })
    ]);
    const navItems = [
      { name: "Dashboard", path: "/", icon: IconLayout },
      { name: "Live Stream", path: "/live", icon: IconCCTV },
      { name: "Analytics", path: "/analytics", icon: IconChart },
      { name: "ESG Reports", path: "/reports", icon: IconFileText }
    ];
    const currentRouteName = computed(() => {
      if (route.path === "/") return "Dashboard Overview";
      return route.path.replace("/", "").replace("-", " ");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex text-slate-100 bg-slate-950 font-sans" }, _attrs))} data-v-11f21f3f><aside class="hidden lg:flex flex-col w-64 border-r border-white/5 bg-slate-900/50 backdrop-blur-xl" data-v-11f21f3f><div class="p-6" data-v-11f21f3f><h1 class="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent" data-v-11f21f3f> SortSmart AI </h1></div><nav class="flex-1 px-4 space-y-2 mt-4" data-v-11f21f3f><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.path,
          to: item.path,
          class: "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-white/5",
          "active-class": "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), { class: "w-5 h-5 group-hover:scale-110 transition-transform" }, null), _parent2, _scopeId);
              _push2(`<span class="font-medium" data-v-11f21f3f${_scopeId}>${ssrInterpolate(item.name)}</span>`);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-5 h-5 group-hover:scale-110 transition-transform" })),
                createVNode("span", { class: "font-medium" }, toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="p-4 border-t border-white/5 mt-auto" data-v-11f21f3f><div class="flex items-center space-x-3 p-2 rounded-xl bg-white/5" data-v-11f21f3f><div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold" data-v-11f21f3f> AD </div><div class="flex-1 min-w-0" data-v-11f21f3f><p class="text-sm font-medium truncate" data-v-11f21f3f>Admin User</p><p class="text-xs text-slate-500 truncate" data-v-11f21f3f>admin@sortsmart.ai</p></div></div></div></aside><div class="flex-1 flex flex-col min-w-0 relative h-screen overflow-hidden" data-v-11f21f3f><header class="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-slate-950/50 backdrop-blur-md z-10" data-v-11f21f3f><div class="flex lg:hidden items-center space-x-4" data-v-11f21f3f><button class="p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors" data-v-11f21f3f>`);
      _push(ssrRenderComponent(IconMenu, { class: "w-6 h-6" }, null, _parent));
      _push(`</button><span class="text-lg font-bold text-emerald-400" data-v-11f21f3f>SortSmart</span></div><div class="hidden lg:flex items-center text-sm text-slate-400" data-v-11f21f3f><span class="hover:text-slate-200 cursor-pointer transition-colors" data-v-11f21f3f>SortSmart AI</span><span class="mx-2" data-v-11f21f3f>/</span><span class="text-slate-200 font-medium capitalize" data-v-11f21f3f>${ssrInterpolate(unref(currentRouteName))}</span></div><div class="flex items-center space-x-4" data-v-11f21f3f><button class="p-2 rounded-lg border border-white/5 bg-white/5 text-slate-400 hover:text-slate-200 transition-colors relative" data-v-11f21f3f>`);
      _push(ssrRenderComponent(IconBell, { class: "w-5 h-5" }, null, _parent));
      _push(`<span class="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full" data-v-11f21f3f></span></button><button class="p-2 rounded-lg border border-white/5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all font-medium text-sm px-4" data-v-11f21f3f> Upload Data </button></div></header><main class="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" data-v-11f21f3f>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-11f21f3f"]]);

export { _default as default };
//# sourceMappingURL=default-C4P19fFL.mjs.map
