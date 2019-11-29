const cdn = {
    css: [],
    js: [
        'https://cdn.bootcss.com/vue/2.5.17/vue.runtime.min.js',
        'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
        'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
        'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
    ]
};

module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,

    // configureWebpack: config => {
    //         // 用cdn方式引入
    //         config.externals = {
    //             'vue': 'Vue',
    //             'vuex': 'Vuex',
    //             'vue-router': 'VueRouter',
    //             'axios': 'axios'
    //         }
    //         // 为生产环境修改配置...
    //
    //
    // },



    devServer: {
        proxy: {
            '^/api1': {
                target: 'http://fingertouchback.szulikebo.top:5000/',
                //changeOrigin:true,
                pathRewrite: {
                    '^/api1': '/'
                }
            },
            '/api2': {
                target: 'http://fingertouch.szulikebo.top:5000/',
                pathRewrite: {
                    '^/api2': '/'
                }
            }

        },
        disableHostCheck: true

    }
};