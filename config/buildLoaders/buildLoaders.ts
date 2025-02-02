import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { IBuildOptions } from "../model/type";

export function buildLoaders(options: IBuildOptions): ModuleOptions {
  const { isDev } = options;

  const cssLoader = {
    loader: "css-loader",
    options: {
      modules: {
        namedExport: false,
        auto: (resourcePath: string) => resourcePath.endsWith(".module.scss"),
        localIdentName: isDev
          ? "[path][name]__[local]--[hash:base64:5]"
          : "[hash:base64:8]",
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      cssLoader,
      "sass-loader",
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const babelLoader = {
    test: /\.[jt]sx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          plugins: [isDev && require.resolve("react-refresh/babel")].filter(
            Boolean
          ),
        },
      },
    ],
  };

  return {
    rules: [scssLoader, babelLoader, tsLoader],
  };
}
