export const data = {
  "key": "v-740ffb08",
  "path": "/json-structure/",
  "title": "JSON Structure",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 3,
      "title": "Fieldset",
      "slug": "fieldset",
      "children": []
    },
    {
      "level": 3,
      "title": "Field",
      "slug": "field",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1646924025000,
    "contributors": [
      {
        "name": "Sven Wagener",
        "email": "sven@awesome.ug",
        "commits": 3
      }
    ]
  },
  "filePathRelative": "json-structure/readme.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
