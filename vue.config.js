// vue.config.js

var webpack = require('webpack');

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                'window.Quill': 'quill/dist/quill.js',
                'Quill': 'quill/dist/quill.js'
            }),
        ]
    },
    publicPath: "/",
    outputDir: "dist", // 打包的目录
    lintOnSave: true, // 在保存时校验格式
    productionSourceMap: false, // 生产环境是否生成 SourceMap
    devServer: {
        overlay: {
            warning: false,
            errors: false,
        },
        open: true, // 启动服务后是否打开浏览器
        host: "0.0.0.0",
        port: 8081, // 服务端口
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => {
        }
    },

};
