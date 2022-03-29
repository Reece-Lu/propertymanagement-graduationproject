// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '/pms': {
                target: 'http://47.100.55.31:9090',
                changeOrigin: true,
                pathRewrite: {
                    '/pms': '/pms'
                }
            }
        }
    }
}
