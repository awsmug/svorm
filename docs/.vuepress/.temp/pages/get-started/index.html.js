export const data = {
  "key": "v-0a40e9de",
  "path": "/get-started/",
  "title": "Get started",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Installation",
      "slug": "installation",
      "children": []
    },
    {
      "level": 2,
      "title": "Add scripts to HTML",
      "slug": "add-scripts-to-html",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1646924025000,
    "contributors": [
      {
        "name": "Sven Wagener",
        "email": "sven@awesome.ug",
        "commits": 8
      }
    ]
  },
  "filePathRelative": "get-started/readme.md"
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
