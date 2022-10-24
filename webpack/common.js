const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    Popup: path.join(__dirname, '../src', 'Popup', 'index.js'),
    Background: path.join(__dirname, '../src', 'Background', 'index.js'),
    ContentScripts: path.join(__dirname, '../src', 'Content', 'index.js'),
    Newtab: path.join(__dirname, '../src', 'Newtab', 'index.js'),
    Devtools: path.join(__dirname, '../src', 'Devtools', 'index.js'),
    Panel: path.join(__dirname, '../src', 'Panel', 'index.js'),
    Options: path.join(__dirname, '../src', 'Options', 'index.js'),
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            return `${pathData.runtime}/images/[name][ext]`;
          },
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: path.join(__dirname, '../build'),
        },
        {
          from: 'src/ExtensionIcon',
          to: path.join(__dirname, '../build', 'ExtensionIcon'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/Popup/index.html',
      filename: 'Popup/index.html',
      chunks: ['Popup'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/Newtab/index.html',
      filename: 'Newtab/index.html',
      chunks: ['Newtab'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/Devtools/index.html',
      filename: 'Devtools/index.html',
      chunks: ['Devtools'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/Panel/index.html',
      filename: 'Panel/index.html',
      chunks: ['Panel'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/Options/index.html',
      filename: 'Options/index.html',
      chunks: ['Options'],
      cache: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
    }),
  ],
  output: {
    path: path.join(__dirname, '../build'),
    filename: (pathData) => {
      return pathData.chunk.name
        ? '[name]/index.bundle.js'
        : `${pathData.runtime}/[name].bundle.js`;
    },
    clean: true,
  },
};
