module.exports = {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    mode: 'universal',
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'static',
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
        { src: '~/plugins/vueSplide.js', ssr: false },
        { src: '~/plugins/vee-validate.js', ssr: true }
    ],
    /*
     ** Router Settings
     */
    router: {
        middleware: ['authenticated']
    },
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ['@nuxtjs/vuetify', '@nuxtjs/dotenv'],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // add pwa functionality
        '@nuxtjs/pwa',
        // Doc: https://bootstrap-vue.js.org
        // 'bootstrap-vue/nuxt',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        // sweet water notifications
        'vue-sweetalert2/nuxt'
        // expose localhost to the internet
        // '@nuxtjs/ngrok'
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
        transpile: ['vee-validate/dist/rules']
        // extractCss: true
        // babel: {
        //     presets: ({ isServer }) => [
        //         [
        //             '@nuxt/babel-preset-app',
        //             {
        //                 targets: isServer
        //                     ? { node: '10.21.0' }
        //                     : { browsers: ['defaults'] }
        //             }
        //         ]
        //     ]
        // }
    }
};
