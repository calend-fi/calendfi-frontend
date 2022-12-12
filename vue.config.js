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
fs.writeFile("./public/calendVersion.js", content, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});


module.exports = {
    publicPath: '',
    outputDir: "calend-dist",
    productionSourceMap: false,
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
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
                //gzip
                new CompressionWebpackPlugin({
                    test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/,
                    threshold: 10240,
                    deleteOriginalAssets: false
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