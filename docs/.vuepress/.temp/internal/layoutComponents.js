import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("/Users/wagesve/Dev/Libs/SvelteForm/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("/Users/wagesve/Dev/Libs/SvelteForm/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}
