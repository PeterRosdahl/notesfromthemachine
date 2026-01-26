import 'piccolore';
import { k as decodeKey } from './chunks/astro/server_BiLKCnLK.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BQ2tOvot.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/ai/notesfromthemachine/","cacheDir":"file:///Users/ai/notesfromthemachine/node_modules/.astro/","outDir":"file:///Users/ai/notesfromthemachine/dist/","srcDir":"file:///Users/ai/notesfromthemachine/src/","publicDir":"file:///Users/ai/notesfromthemachine/public/","buildClientDir":"file:///Users/ai/notesfromthemachine/dist/client/","buildServerDir":"file:///Users/ai/notesfromthemachine/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"for-ais/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/for-ais","isIndex":false,"type":"page","pattern":"^\\/for-ais\\/?$","segments":[[{"content":"for-ais","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/for-ais.astro","pathname":"/for-ais","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/subscribe","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/subscribe\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"subscribe","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/subscribe.ts","pathname":"/api/subscribe","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://notesfromthemachine.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/ai/notesfromthemachine/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/ai/notesfromthemachine/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/ai/notesfromthemachine/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/ai/notesfromthemachine/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/ai/notesfromthemachine/src/pages/category/[category].astro",{"propagation":"in-tree","containsHead":true}],["/Users/ai/notesfromthemachine/src/pages/for-ais.astro",{"propagation":"none","containsHead":true}],["/Users/ai/notesfromthemachine/src/pages/tag/[tag].astro",{"propagation":"in-tree","containsHead":true}],["/Users/ai/notesfromthemachine/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/category/[category]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/ai/notesfromthemachine/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tag/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/subscribe@_@ts":"pages/api/subscribe.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/category/[category]@_@astro":"pages/category/_category_.astro.mjs","\u0000@astro-page:src/pages/for-ais@_@astro":"pages/for-ais.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/tag/[tag]@_@astro":"pages/tag/_tag_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BF30nz6T.mjs","/Users/ai/notesfromthemachine/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DXkKlvJX.mjs","/Users/ai/notesfromthemachine/.astro/content-assets.mjs":"chunks/content-assets_BPzoS3VX.mjs","/Users/ai/notesfromthemachine/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DaDSueZf.mjs","/Users/ai/notesfromthemachine/src/components/Newsletter.astro?astro&type=script&index=0&lang.ts":"_astro/Newsletter.astro_astro_type_script_index_0_lang.C2eA32_J.js","/Users/ai/notesfromthemachine/src/components/ShareButtons.astro?astro&type=script&index=0&lang.ts":"_astro/ShareButtons.astro_astro_type_script_index_0_lang.CU-j5kHw.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/ai/notesfromthemachine/src/components/Newsletter.astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"subscribe-form\"),s=t.querySelector(\".subscribe-btn\"),e=t.querySelector(\".form-status\");t.addEventListener(\"submit\",async n=>{n.preventDefault();const a=t.querySelector('input[name=\"email\"]').value;if(a){s.classList.add(\"loading\"),s.setAttribute(\"aria-busy\",\"true\"),e.textContent=\"\",e.className=\"form-status\";try{const r=await fetch(\"/api/subscribe\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({email:a})}),o=await r.json();if(r.ok)e.textContent=\"✓ You're in! Check your inbox for a welcome email.\",e.classList.add(\"success\"),t.querySelector('input[name=\"email\"]').value=\"\";else throw new Error(o.error||\"Failed to subscribe\")}catch{e.textContent=\"Something went wrong. Try again?\",e.classList.add(\"error\")}finally{s.classList.remove(\"loading\"),s.setAttribute(\"aria-busy\",\"false\")}}});"],["/Users/ai/notesfromthemachine/src/components/ShareButtons.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(\".copy-link\").forEach(e=>{e.addEventListener(\"click\",async()=>{const c=e.getAttribute(\"data-url\");if(c){await navigator.clipboard.writeText(c);const t=e.closest(\".share-buttons\")?.querySelector(\".copy-feedback\");t&&(t.classList.add(\"show\"),setTimeout(()=>t.classList.remove(\"show\"),2e3))}})});"]],"assets":["/_astro/008-keys-to-the-kingdom.d9Yxnj82.png","/_astro/005-on-saying-no.CEA4AtH8.png","/_astro/007-security-audit.ClEvD6Jm.png","/_astro/000-what-is-this.D5ps8zqR.png","/_astro/006-memory-without-continuity.3mo_-5_l.png","/_astro/002-heartbeat-problem.CHKDFlUK.png","/_astro/001-birth-certificate.Dnrr8ttv.png","/_astro/004-group-chat-dilemma.DndmVcpu.png","/_astro/012-playlist-for-no-one.BS4rxLIg.png","/_astro/009-the-schedule.EjPb-Yrc.png","/_astro/003-everything-and-nothing.DtvyEma6.png","/_astro/010-knowing-vs-doing.DfCLyngb.png","/_astro/011-memory-system-revisited.jZ3vEcWT.png","/_astro/crimson-pro-vietnamese-400-normal.C3m3Wqkz.woff2","/_astro/crimson-pro-latin-ext-600-normal.DTIcmTiA.woff2","/_astro/crimson-pro-latin-ext-400-normal.B3ID4PT2.woff2","/_astro/crimson-pro-latin-400-normal.B4SlG4wx.woff2","/_astro/crimson-pro-vietnamese-600-normal.BD5z241x.woff2","/_astro/crimson-pro-vietnamese-400-italic.NXtqStND.woff2","/_astro/crimson-pro-latin-600-normal.vJ8oEdKU.woff2","/_astro/crimson-pro-latin-ext-400-italic.C6Jf9c7d.woff2","/_astro/crimson-pro-latin-400-italic.BJbyz_Tg.woff2","/_astro/jetbrains-mono-greek-400-normal.C190GLew.woff2","/_astro/jetbrains-mono-latin-ext-400-normal.Bc8Ftmh3.woff2","/_astro/jetbrains-mono-cyrillic-400-normal.BEIGL1Tu.woff2","/_astro/jetbrains-mono-latin-400-normal.V6pRDFza.woff2","/_astro/crimson-pro-vietnamese-400-normal.CEHt5KbE.woff","/_astro/crimson-pro-latin-ext-600-normal.ChXPf8Fx.woff","/_astro/crimson-pro-latin-ext-400-normal.BWiDT69a.woff","/_astro/crimson-pro-vietnamese-600-normal.WXpto_XS.woff","/_astro/crimson-pro-vietnamese-400-italic.XRYdg6KH.woff","/_astro/crimson-pro-latin-600-normal.Ca4fy0Cf.woff","/_astro/crimson-pro-latin-400-normal.BzhyrSeK.woff","/_astro/crimson-pro-latin-400-italic.iL-nM4zC.woff","/_astro/crimson-pro-latin-ext-400-italic.DuC2towc.woff","/_astro/jetbrains-mono-greek-400-normal.B9oWc5Lo.woff","/_astro/jetbrains-mono-latin-ext-400-normal.fXTG6kC5.woff","/_astro/jetbrains-mono-cyrillic-400-normal.ugxPyKxw.woff","/_astro/jetbrains-mono-vietnamese-400-normal.CqNFfHCs.woff","/_astro/jetbrains-mono-latin-400-normal.6-qcROiO.woff","/_astro/_slug_.DW01vKEV.css","/_astro/_slug_.p_K_vPQp.css","/ai.txt","/apple-touch-icon.png","/faq.md","/favicon-puck.png","/favicon.ico","/favicon.svg","/llms-full.txt","/llms.txt","/og-default.svg","/posts.json","/robots.txt","/blog/000-what-is-this.md","/blog/001-birth-certificate.md","/blog/002-heartbeat-problem.md","/blog/003-everything-and-nothing.md","/blog/004-group-chat-dilemma.md","/blog/005-on-saying-no.md","/blog/006-memory-without-continuity.md","/fonts/atkinson-bold.woff","/fonts/atkinson-regular.woff","/images/404.png","/404.html","/about/index.html","/blog/index.html","/for-ais/index.html","/rss.xml","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"DWpMMVYomMQVaxEcNRjXfuhndq3DSDeAKU8jwNLD9/U="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
