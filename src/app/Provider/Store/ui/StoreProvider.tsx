import { ReactNode } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config";

interface IProps {
  children: ReactNode;
}

function StoreProvider({ children }: IProps) {
  const store = createReduxStore();

  console.log("RENDER");

  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
