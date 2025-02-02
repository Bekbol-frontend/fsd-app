import { clsx } from "@/shared/config/clsx";
import { Header } from "@/widgets/Header";
import { PageLoading } from "@/widgets/PageLoading";
import { Sidebar, getSidebarCollapsed } from "@/widgets/Sidebar";
import { SidebarMin } from "@/widgets/SidebarMin";
import { Suspense, memo } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function RootLayout() {
  const collapsed = useSelector(getSidebarCollapsed);

  return (
    <Suspense fallback={<PageLoading />}>
      <Header collapsed={collapsed} />
      <Sidebar />
      <SidebarMin />
      <main id="main-root" className={clsx(["main"], { collapsed: collapsed })}>
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </main>
    </Suspense>
  );
}

export default memo(RootLayout);
