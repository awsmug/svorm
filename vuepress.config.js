module.exports = {
    title: 'SvelteForm',
    description: 'A form framework based on SVELTE and TypeScript',
    base: '/SvelteForm/',
    themeConfig: {
        logo: 'https://vuejs.org/images/logo.png',
        navbar: [
            { text: 'Home', link: '/' }
        ],
        sidebar: [
            {
                text: 'Home',
                link: '/'
            },
            {
                text: 'Get Started',
                link: '/get-started/',
                children: []
            },
            {
                text: 'JSON Structure',
                link: '/json-structure/',
                children: [
                    '/json-structure/field-types',
                    '/json-structure/validation',
                    '/json-structure/conditional-logic'
                ]
            }
        ],
        repo: 'awsmug/SvelteForm'
    },
}