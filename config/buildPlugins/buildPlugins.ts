import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { IBuildOptions } from "../model/type";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export function buildPlugins(
  options: IBuildOptions
): (
  | false
  | ""
  | 0
  | webpack.WebpackPluginInstance
  | ((this: webpack.Compiler, compiler: webpack.Compiler) => void)
  | null
  | undefined
)[] {
  const { paths, isDev, isProd, baseURL } = options;

  const plugins = [
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __BASE_URL__: JSON.stringify(baseURL),
    }),

    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    isDev && new webpack.ProgressPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        filename: "styles/[name].[contenthash:8].css",
        chunkFilename: "styles/[name].[contenthash:8].css",
      }),
    isDev && new ReactRefreshWebpackPlugin(),

    new BundleAnalyzerPlugin({
      openAnalyzer: isDev,
    }),
  ].filter(Boolean);

  return plugins;
}
