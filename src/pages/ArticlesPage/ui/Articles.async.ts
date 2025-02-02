import { lazy } from "react";

// export const ArticlesPage = lazy(
//   () =>
//     new Promise((resolve) => {
//       setTimeout(() => {
//         // @ts-ignore
//         resolve(import("./ArticlesPage"));
//       }, 15000);
//     })
// );

export const ArticlesPage = lazy(() => import("./ArticlesPage"));
