module.exports = {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    ssr: true,
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'server',
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Global CSS
     */
    css: ['~assets/scss/app.scss'],
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [
        '~/plugins/firebase.js',
        '~plugins/filters.js',
        { src: '~/plugins/localStorage.js', ssr: false },
        { src: '~plugins/vue-cal.client.js' }
    ],
    /*
     ** Router Settings
     */
    router: {
        // middleware: ['authenticated']
    },
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: {
        dirs: [
            '~/components',
            {
                path: '~/components/chat/'
            },
            {
                path: '~/components/client/'
            },
            {
                path: '~/components/dashboard/'
            },
            {
                path: '~/components/profile/'
            },
            {
                path: '~/components/ui/'
            }
        ]
    },
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ['@nuxtjs/dotenv', 'nuxt-buefy'],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // add pwa functionality
        '@nuxtjs/pwa',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        // sweet water notifications
        'vue-sweetalert2/nuxt'
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    ngrok: {
        // module options
        ngrokauth: process.env.NGROK_AUTH
    },
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    build: {
        extractCss: true,
        babel: {
            presets: ({ isServer }) => [
                [
                    '@nuxt/babel-preset-app',
                    {
                        targets: isServer
                            ? { node: '10.21.0' }
                            : { browsers: ['defaults'] }
                    }
                ]
            ]
        }
    }
};
