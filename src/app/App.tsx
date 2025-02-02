import { memo } from "react";
import { AppRouterProvider } from "./Provider/AppRouter";

function App() {
  return <AppRouterProvider />;
}

export default memo(App);
