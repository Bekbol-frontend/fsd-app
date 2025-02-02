import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { IStateSchema } from "../model/type";
import { sidebarReducer } from "@/widgets/Sidebar";
import { sidebarMinReducer } from "@/widgets/SidebarMin";
import { counterReducer } from "@/entities/Counter";
import { userReducer } from "@/entities/User";
import { $api } from "@/shared/api";
import { createReducerManager } from "./reducerManager";
import { saveScrollReducer } from "@/features/SaveScroll";

export function createReduxStore() {
  const reducers: ReducersMapObject<IStateSchema> = {
    sidebar: sidebarReducer,
    sidebarMin: sidebarMinReducer,
    counter: counterReducer,
    user: userReducer,
    saveScroll: saveScrollReducer,
  };

  const reducerManager = createReducerManager(reducers);

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: $api,
          },
        },
      }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type RootState = ReturnType<typeof createReduxStore>["getState"];
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
