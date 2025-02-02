import { IArticleDetailSchema } from "@/entities/Article";
import { IArticleCommentSchema } from "@/entities/ArticleComment";
import { ICounterSchema } from "@/entities/Counter";
import { IProfileSchema } from "@/entities/Profile";
import { IUserSchema } from "@/entities/User";
import { ILoginUsernameSchame } from "@/features/AuthByUsername";
import { ISaveScrollSchema } from "@/features/SaveScroll";
import { IArticleSchema } from "@/pages/ArticlesPage";
import { ISidebarSchema } from "@/widgets/Sidebar";
import { ISidebarMinSchema } from "@/widgets/SidebarMin";
import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

export interface IStateSchema {
  sidebar: ISidebarSchema;
  sidebarMin: ISidebarMinSchema;
  counter: ICounterSchema;
  user: IUserSchema;
  saveScroll: ISaveScrollSchema;

  // Async-Reducers
  login?: ILoginUsernameSchame;
  profile?: IProfileSchema;
  article_details?: IArticleDetailSchema;
  article_comment?: IArticleCommentSchema;
  article?: IArticleSchema;
}

export interface IExtraArg {
  api: AxiosInstance;
}

export interface IThunkAPI {
  extra: IExtraArg;
  rejectValue: string;
  state: IStateSchema;
}

export type IStateSchemaKeys = keyof IStateSchema;
export type MountedReducers = OptionalRecord<IStateSchemaKeys, boolean>;

export interface IReducerManager {
  getReducerMap: () => ReducersMapObject<IStateSchema>;
  reduce: (
    state: IStateSchema | undefined,
    action: AnyAction
  ) => CombinedState<IStateSchema>;
  add: (key: IStateSchemaKeys, reducer: Reducer) => void;
  remove: (key: IStateSchemaKeys) => void;
}

export interface IReduxStoreWithManager extends EnhancedStore<IStateSchema> {
  reducerManager: IReducerManager;
}
