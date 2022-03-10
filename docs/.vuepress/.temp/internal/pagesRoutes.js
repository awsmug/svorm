import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/","SvelteForm",["/index.html","/readme.md"]],
  ["v-7525bfa2","/json-structure/choices.html","",["/json-structure/choices","/json-structure/choices.md"]],
  ["v-8415422c","/json-structure/conditional-logic.html","Conditional Logic",["/json-structure/conditional-logic","/json-structure/conditional-logic.md"]],
  ["v-0a7481bb","/json-structure/field-types.html","Field Types",["/json-structure/field-types","/json-structure/field-types.md"]],
  ["v-740ffb08","/json-structure/","JSON Structure",["/json-structure/index.html","/json-structure/readme.md"]],
  ["v-1642eff8","/json-structure/validation.html","Validation",["/json-structure/validation","/json-structure/validation.md"]],
  ["v-0a40e9de","/get-started/","Get started",["/get-started/index.html","/get-started/readme.md"]],
  ["v-3706649a","/404.html","",["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, title, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta: { title },
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
