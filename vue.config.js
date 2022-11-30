//lookBuild
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
//gzip
const CompressionWebpackPlugin = require('compression-webpack-plugin'); //compression-webpack-plugin@5.0.1
//IgnorePlugin - moment.js
const webpack = require('webpack');



const fs = require("fs");
let version = new Date().getTime();
let content = `try {
    getCalendVersion('${version}');
} catch (err) {
    // console.log(err);
}`;
// console.log('开始创建版本文件...')
fs.writeFile("./public/calendVersion.js", content, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});


module.exports = {
    publicPath: '',
    outputDir: "calend-dist",
    productionSourceMap: false, // 不定位console.log的文件位置
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = ''
                return args
            })
    },
    configureWebpack: config => {
        return {
            plugins: [
                // new BundleAnalyzerPlugin(),
                //忽略/moment/locale下的所有文件
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
                //gzip
                new CompressionWebpackPlugin({
                    test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
                    threshold: 10240, // 归档需要进行压缩的文件大小最小值，这里是10K以上的进行压缩
                    deleteOriginalAssets: false // 是否删除原文件
                })
            ]
        }
    },
    //Prohibit splitting、Cancel error location
    // css: {
    //     extract: false,
    //     sourceMap: false,
    //     modules: false,
    // }
    devServer: {
        // proxy: 'https://api.encent.io',
        // https: true,
        open: true,
        // port: '8001',
        // disableHostCheck: true
    },
}