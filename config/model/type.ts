export interface IPaths {
  entry: string;
  output: string;
  html: string;
  devServer: string;
  publicPath: string;
  src: string;
}

export type MODE = "development" | "production";

export interface IBuildOptions {
  mode: MODE;
  paths: IPaths;
  port: number;
  isDev: boolean;
  isProd: boolean;
  baseURL: string
}

export interface IEnv {
  mode: MODE;
  port: number;
  api: string;
}
