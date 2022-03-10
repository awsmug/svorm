import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"SvelteForm"},["/index.html","/readme.md"]],
  ["v-0a40e9de","/get-started/",{"title":"Get started"},["/get-started/index.html","/get-started/readme.md"]],
  ["v-7525bfa2","/json-structure/choices.html",{"title":""},["/json-structure/choices","/json-structure/choices.md"]],
  ["v-8415422c","/json-structure/conditional-logic.html",{"title":"Conditional Logic"},["/json-structure/conditional-logic","/json-structure/conditional-logic.md"]],
  ["v-0a7481bb","/json-structure/field-types.html",{"title":"Field Types"},["/json-structure/field-types","/json-structure/field-types.md"]],
  ["v-740ffb08","/json-structure/",{"title":"JSON Structure"},["/json-structure/index.html","/json-structure/readme.md"]],
  ["v-1642eff8","/json-structure/validation.html",{"title":"Validation"},["/json-structure/validation","/json-structure/validation.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
