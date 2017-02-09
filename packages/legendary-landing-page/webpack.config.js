const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Generate the output in the <root>/dist directory of the repo
const outputPath = path.resolve("../../dist");

const dllPackages = [
    { name: "legendary-vendor", context: "./" },
    { name: "legendary-vendor", context: "../legendary-l/" },
    { name: "legendary-vendor", context: "../legendary-e/" },
    { name: "legendary-vendor", context: "../legendary-g/" },
    { name: "legendary-vendor", context: "../legendary-n/" },
    { name: "legendary-vendor", context: "../legendary-d/" },
    { name: "legendary-vendor", context: "../legendary-a/" },
    { name: "legendary-vendor", context: "../legendary-r/" },
    { name: "legendary-vendor", context: "../legendary-y/" },
    { name: "legendary-l", context: "./node_modules/legendary-l/" },
    { name: "legendary-e", context: "./node_modules/legendary-e/" },
    { name: "legendary-g", context: "./node_modules/legendary-g/" },
    { name: "legendary-n", context: "./node_modules/legendary-n/" },
    { name: "legendary-d", context: "./node_modules/legendary-d/" },
    { name: "legendary-a", context: "./node_modules/legendary-a/" },
    { name: "legendary-r", context: "./node_modules/legendary-r/" },
    { name: "legendary-y", context: "./node_modules/legendary-y/" },
];

const dllPlugins = [];
const copyPlugins = [];
const dllPaths = [];

dllPackages.forEach(pkg => {
    dllPlugins.push(
        new webpack.DllReferencePlugin({
            context: pkg.context,
            manifest: require(`${pkg.name}/dist/dll-manifest.json`),
        })
    );

    copyPlugins.push(
        new CopyWebpackPlugin([
            {
                from: `./node_modules/${pkg.name}/dist/*.js`,
                to: outputPath,
                flatten: true,
            },
        ])
    );

    // Read hashed bundle paths from manifest and pass to HtmlWebpackPlugin
    const manifest = require(`${pkg.name}/dist/manifest.json`);
    const paths = Object.keys(manifest).map(key => manifest[key]);
    dllPaths.push(...paths);
});

module.exports = {
    entry: [
        "./index.tsx"
    ],
    output: {
        path: outputPath,
        filename: "landing.[chunkhash:5].js"
    },
    resolve: {
       extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    plugins: dllPlugins.concat(copyPlugins).concat([
        new HtmlWebpackPlugin({
            title: "Legendary",
            template: "./index.ejs",
            dlls: dllPaths,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
    ])
};
