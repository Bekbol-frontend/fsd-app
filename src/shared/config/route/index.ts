export enum AppRoutes {
  HOME = "HOME",
  ABOUT = "ABOUT",
  PROFILE = "PROFILE",
  PROFILE_DETAIL = "PROFILE_DETAIL",
  ARTICLES = "ARTICLES",
  ARTICLE_DETAIL = "ARTICLE_DETAIL",

  NOT_FOUND = "NOT_FOUND",
}

export const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.PROFILE]: "/profile",
  [AppRoutes.PROFILE_DETAIL]: "/profile/:id",
  [AppRoutes.ARTICLES]: "/articles",
  [AppRoutes.ARTICLE_DETAIL]: "/articles/:id",

  [AppRoutes.NOT_FOUND]: "*",
};
