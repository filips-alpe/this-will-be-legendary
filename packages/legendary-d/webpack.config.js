const path = require("path");
const webpack = require("webpack");
const semver = require("semver");
const crypto = require("crypto");
const ManifestPlugin = require("webpack-manifest-plugin");

const { name, version } = require("./package.json");

// Generate a hash based on the package name and major version
// Allows swapping the dll bundle as long as the major version matches the previous one
const hash = crypto
    .createHash("md5")
    .update(`${name}@${semver.major(version)}`)
    .digest("hex")
    .substr(0, 6);

// Prefix the hash with _ to ensure that it is a valid javascript identifier
const libraryName = `_${hash}`;

module.exports = {
    context: process.cwd(),
    entry: {
        d: ["./src/index.tsx"]
    },
    output: {
        path: "dist",
        filename: "[name].[chunkhash:5].js",
        library: libraryName
    },
    resolve: {
       extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    compilerOptions: {
                       declaration: false,
                       noEmitOnError: false
                    }
                } 
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: ".",
            manifest: require("./node_modules/legendary-vendor/dist/dll-manifest.json"),
        }),
        new webpack.HashedModuleIdsPlugin(),
        new ManifestPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, "dist", "dll-manifest.json"),
            name: libraryName
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
    ]
};
