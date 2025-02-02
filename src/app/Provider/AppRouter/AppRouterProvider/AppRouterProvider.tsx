import { memo } from "react";
import { routePaths } from "@/shared/config/route";
import { Route, Routes } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import { HomePage } from "@/pages/Home";
import { AboutPage } from "@/pages/About";
import { NotFoundPage } from "@/pages/NotFoundPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { ProfilePage } from "@/pages/ProfilePage";
import { ArticlesPage } from "@/pages/ArticlesPage";
import { ArticleDetailPage } from "@/pages/ArticleDetailPage";

function AppRouterProvider() {
  return (
    <Routes>
      <Route path={routePaths.HOME} element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path={routePaths.ABOUT} element={<AboutPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path={routePaths.PROFILE_DETAIL} element={<ProfilePage />} />
          <Route path={routePaths.ARTICLES} element={<ArticlesPage />} />
          <Route
            path={routePaths.ARTICLE_DETAIL}
            element={<ArticleDetailPage />}
          />
        </Route>
      </Route>
      <Route path={routePaths.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
}

export default memo(AppRouterProvider);
