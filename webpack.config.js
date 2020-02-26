const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const nodeExternals = require("webpack-node-externals"); 

module.exports = {
    mode: "production",
    target: "node", 
    entry: ["./index.js", "./sass/index.scss"], //om vi har sass entry kör vi en array
    output: {
        //det som ska skapas och vart det ska läggas 
        path: path.resolve(__dirname, "dist"), 
        filename: "bundle.js", 
        publicPath: "./public"
    }, 

    module: {
        rules: [{
            //objektet är våra sass-regler
            //kontrollerar om de har sass eller scss som filändelse 
            test: /\.(sass|scss)$/, 
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            })
        }]
    }, 

    plugins: [
        new ExtractTextPlugin({
            //resultatet hamnar här 
            filename: "public/index.css"
        })
    ], 

    //talar om att vi kör i node-miljö 
    externals: [nodeExternals()]
}