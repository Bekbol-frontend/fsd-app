import path from "path";
import webpack from "webpack";
import { buildWebpack } from "./config/buildWebpack/buildWebpack";
import { IEnv, IPaths } from "./config/model/type";

export default (env: IEnv) => {
  const paths: IPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    devServer: path.resolve(__dirname, "public"),
    publicPath: "/",
    src: path.resolve(__dirname, "src"),
  };

  const mode = env.mode ?? "development";
  const port = env.port ?? 3001;
  const isDev = mode === "development";
  const isProd = mode === "production";

  const baseURL = env.api || "http://localhost:5500/api";

  const config: webpack.Configuration = buildWebpack({
    mode,
    paths,
    port,
    isDev,
    isProd,
    baseURL,
  });

  return config;
};
