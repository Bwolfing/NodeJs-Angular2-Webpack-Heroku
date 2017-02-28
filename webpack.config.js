var path = require("path");
var merge = require("webpack-merge");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCss = new ExtractTextPlugin("vendor.css");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

var sharedConfig = {
    resolve: {
        extensions: [".js", ".ts",],
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name].js",
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "raw-loader", },
            { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/, loader: "url-loader?limit=100000", },
            { test: /\.scss$/, exclude: /node_modules/, loaders: ["raw-loader", "sass-loader"], },
        ],
        // Silences warning, found answer here: http://bit.ly/2mBnmg2
        exprContextCritical: false,
    },
};

var applicationBundle = merge(sharedConfig, {
    entry: {
        main: path.join(__dirname, "app", "main.ts"),
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts-loader", },
        ],
    },
});
var vendorBundle = merge(sharedConfig, {
    module: {
        loaders: [
            { test: /\.css(\?|$)/, loader: extractCss.extract(["css-loader",])}
        ],
    },
    entry: {
        vendor: [
            path.join(__dirname, "app", "vendor.ts"),
            path.join(__dirname, "assets", "css", "universal.css"),
            "bootstrap/dist/css/bootstrap.css",
        ],
    },
    plugins: [
        extractCss,
        new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false, },
            include: /\.js$/
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessorOptions: { discardComments: { removeAll: true } },
        }),
    ],
});

module.exports = [vendorBundle, applicationBundle];