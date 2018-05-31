var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require ('webpack');
var htmlPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry:  {
    example: './example.jsx'
  },

  output: {
    path: __dirname,
    filename: '[name].js'
  },

  resolve: {
    extensions: [ '.jsx','.js', '.less']
  },
  plugins: [
    new htmlPlugin({
        template: 'index.html',
        inject: true,
        chunks: ['example']
    }),
    new ExtractTextPlugin({
          filename:  (getPath) => {
            return getPath('[name].css');
          }
        }),
  ],
  module: {
    rules : [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            "react" ,
            "stage-0"
          ],
          plugins: [
            [ "transform-decorators-legacy" ]
          ]
        }
      },
      {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              //resolve-url-loader may be chained before sass-loader if necessary
              use: [
                    {loader: 'css-loader',options:{
                      minimize: true 
                  }},
                {loader: 'less-loader'}],
                
            }),
      }
    ]
  }
};
