import webpack from "webpack";
import { buildResolvers } from "../buildResolvers/buildResolvers";
import { buildPlugins } from "../buildPlugins/buildPlugins";
import { buildDevServer } from "../buildDevServer/buildDevServer";
import { buildLoaders } from "../buildLoaders/buildLoaders";
import { IBuildOptions } from "../model/type";

export function buildWebpack(options: IBuildOptions): webpack.Configuration {
  const { mode, paths, isDev } = options;
  const { entry, output, publicPath } = paths;

  return {
    mode,
    entry,
    output: {
      filename: "[name].[contenthash].js",
      publicPath,
      path: output,
      clean: true,
    },

    devtool: isDev ? "inline-source-map" : undefined,

    module: buildLoaders(options),
    resolve: buildResolvers(options),
    plugins: buildPlugins(options),
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
