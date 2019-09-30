module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/api': {
                target: 'https://www.wanandroid.com/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}