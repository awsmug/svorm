export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "SvelteForm",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "filePathRelative": "readme.md",
  "git": {
    "updatedTime": 1636040967000,
    "contributors": [
      {
        "name": "Sven Wagener",
        "email": "sven@awesome.ug",
        "commits": 2
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
