import { Configuration } from "webpack-dev-server";
import { IBuildOptions } from "../model/type";

export function buildDevServer(options: IBuildOptions): Configuration {
  const { paths,port } = options;

  return {
    static: {
      directory: paths.devServer,
    },
    compress: true,
    port,
    open: true,
    hot: true,
    historyApiFallback: true,
  };
}
