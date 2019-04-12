const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SRC_PATH = path.resolve(__dirname, "./../src");
const BUILD_PATH = path.resolve(__dirname, "./../build");
const ASSETS_PATH = "/assets/";
const ROOT_PATH = process.cwd();

const config = {
  devtool: "cheap-module-source-map",

  mode: "development",

  entry: {
    app: SRC_PATH + "/index.jsx",
  },

  output: {
    path: BUILD_PATH,
    filename: "[name]-[hash:8].js",
    publicPath: ASSETS_PATH,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        loader: require.resolve("eslint-loader"),
        include: SRC_PATH,
      },
      {
        test: /\.jsx?$/,
        include: SRC_PATH,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: require.resolve("stylelint-custom-processor-loader"),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-hot-loader",
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              sourceMap: true,
              // 确保 css 生效，所有生成的 css 类名保持原有类名
              // 使用其他标识模板或者无此配置项 css 样式将无效!!!
              localIdentName: "[local]",
            },
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  browsers: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9",
                  ],
                  flexbox: "no-2009",
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "[name].[hash:8].[ext]",
        },
      },
    ],
  },

  devServer: {
    open: false,
    host: "0.0.0.0",
    port: "8000",
    contentBase: BUILD_PATH,
    hot: true,
    overlay: {
      errors: true,
    },
    publicPath: ASSETS_PATH,
    historyApiFallback: {
      index: ASSETS_PATH + "index.html",
    },
  },

  plugins: [
    new CleanWebpackPlugin([BUILD_PATH], {
      root: ROOT_PATH,
      verbose: true,
      dry: false,
    }),
    new HtmlWebpackPlugin({
      title: "react-demo",
      template: path.join(SRC_PATH, "/template.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
