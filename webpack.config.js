var path = require("path");
var merge = require("webpack-merge");

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
            { test: /\.ts$/, loader: "ts-loader", },
            { test: /\.html$/, loader: "raw-loader", },
            { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: "url-loader?limit=25000", },
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
});
var vendorBundle = merge(sharedConfig, {
    entry: {
        vendor: path.join(__dirname, "app", "vendor.ts"),
    }
})

module.exports = [vendorBundle, applicationBundle];