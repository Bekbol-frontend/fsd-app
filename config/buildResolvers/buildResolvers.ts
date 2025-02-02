import { ResolveOptions } from "webpack";
import { IBuildOptions } from "../model/type";

export function buildResolvers(options: IBuildOptions): ResolveOptions {
  const { paths } = options;

  return {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": paths.src,
    },
  };
}
