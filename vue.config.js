module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        port: 80,
        proxy: {
            '/api':{
                target:'http://fingertouchback.szulikebo.top:5000/',
                //changeOrigin:true,
                pathRewrite:{
                    '^/api': '/'
                }
            },
            '/api2':{
                target:'http://fingertouch.szulikebo.top:5000/',
                pathRewrite: {
                    '^/api':'/'
                }

            }

        },
        disableHostCheck: true,

    }
}