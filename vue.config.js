module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '^/api1':{
                target:'http://fingertouchback.szulikebo.top:5000/',
                //changeOrigin:true,
                pathRewrite:{
                    '^/api1': '/'
                }
            },
            '/api2':{
                target:'http://fingertouch.szulikebo.top:5000/',
                pathRewrite: {
                    '^/api2':'/'
                }
            }

        },
        disableHostCheck: true,

    }
}