// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '/pms': {
                target: 'http://localhost:9090',
                changeOrigin: true,
                pathRewrite: {
                    '/pms': '/pms'
                }
            }
        }
    }
}
