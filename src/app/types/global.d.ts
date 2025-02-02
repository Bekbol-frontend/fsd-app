declare module "*.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare const __IS_DEV__: boolean;
declare const __BASE_URL__: string;

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
