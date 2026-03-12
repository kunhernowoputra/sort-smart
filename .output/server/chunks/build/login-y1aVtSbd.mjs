import { ref, mergeProps, unref, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { a as useAuth } from './server.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const email = ref("");
    const password = ref("");
    const rememberMe = ref(false);
    const isLoading = ref(false);
    const error = ref("");
    const IconMail = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }),
      h("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
    ]);
    const IconLock = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }),
      h("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
    ]);
    const IconCheck = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "3", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("polyline", { points: "20 6 9 17 4 12" })
    ]);
    const IconLoading = () => h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, [
      h("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-slate-950 px-4" }, _attrs))}><div class="absolute inset-0 overflow-hidden pointer-events-none"><div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full"></div><div class="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full"></div></div><div class="w-full max-w-md relative"><div class="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000"><h1 class="text-4xl font-black bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-2"> SortSmart AI </h1><p class="text-slate-500 font-medium">Platform Sortasi Sampah Masa Depan</p></div><div class="glass-dark rounded-[32px] p-8 md:p-10 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-500"><form class="space-y-6"><div class="space-y-2"><label class="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label><div class="relative group">`);
      _push(ssrRenderComponent(IconMail, { class: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(email))} type="email" placeholder="name@company.com" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all text-white placeholder:text-slate-600" required></div></div><div class="space-y-2"><label class="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Password</label><div class="relative group">`);
      _push(ssrRenderComponent(IconLock, { class: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(password))} type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all text-white placeholder:text-slate-600" required></div></div><div class="flex items-center justify-between px-1"><label class="flex items-center cursor-pointer group"><input type="checkbox" class="hidden"${ssrIncludeBooleanAttr(Array.isArray(unref(rememberMe)) ? ssrLooseContain(unref(rememberMe), null) : unref(rememberMe)) ? " checked" : ""}><div class="${ssrRenderClass([{ "bg-emerald-500 border-emerald-500": unref(rememberMe) }, "w-5 h-5 border-2 border-white/10 rounded-md flex items-center justify-center transition-all group-hover:border-emerald-500/50"])}">`);
      if (unref(rememberMe)) {
        _push(ssrRenderComponent(IconCheck, { class: "w-3.5 h-3.5 text-slate-950 font-bold" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span class="ml-3 text-sm text-slate-400 font-medium">Ingat saya</span></label><a href="#" class="text-sm text-emerald-400 hover:text-emerald-300 font-bold transition-colors">Lupa Password?</a></div><button type="submit"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="w-full py-4 bg-emerald-500 text-slate-950 font-black rounded-2xl hover:bg-emerald-400 active:scale-[0.98] transition-all flex items-center justify-center shadow-xl shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest">`);
      if (!unref(isLoading)) {
        _push(`<span>Masuk Sekarang</span>`);
      } else {
        _push(ssrRenderComponent(IconLoading, { class: "w-6 h-6 animate-spin" }, null, _parent));
      }
      _push(`</button></form><div class="mt-8 text-center text-sm text-slate-500"> Belum punya akun? <a href="#" class="text-white font-bold hover:text-emerald-400 transition-colors">Hubungi Admin</a></div></div>`);
      if (unref(error)) {
        _push(`<div class="mt-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center font-medium animate-in slide-in-from-top-4">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-y1aVtSbd.mjs.map
