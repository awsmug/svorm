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
  "filePathRelative": "get-started/readme.md",
  "git": {
    "updatedTime": 1636041115000,
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
