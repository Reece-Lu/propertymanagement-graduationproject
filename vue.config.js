module.exports = {
    publicPath: '/residentialcomplex/',
    devServer: {
        proxy: {
            '/pms': {
                target: 'http://104.42.29.134:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/pms': ''
                }
            }
        }
    }
}
