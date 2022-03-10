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
  "filePathRelative": "json-structure/readme.md",
  "git": {
    "updatedTime": 1636040967000,
    "contributors": [
      {
        "name": "Sven Wagener",
        "email": "sven@awesome.ug",
        "commits": 1
      }
    ]
  }
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
