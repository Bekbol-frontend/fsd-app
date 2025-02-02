import {
  AnyAction,
  combineReducers,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import {
  IReducerManager,
  IStateSchema,
  IStateSchemaKeys,
  MountedReducers,
} from "../model/type";

export function createReducerManager(
  initialReducers: ReducersMapObject<IStateSchema>
): IReducerManager {
  const reducers = { ...initialReducers };
  let combinedReducer = combineReducers(reducers);

  let keysToRemove: IStateSchemaKeys[] = [];
  const mountedReducer: MountedReducers = {};

  return {
    getReducerMap: () => reducers,
    reduce: (state: IStateSchema | undefined, action: AnyAction) => {
      if (keysToRemove.length > 0 && state) {
        state = { ...state };
        for (let key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      return combinedReducer(state, action);
    },

    add: (key: IStateSchemaKeys, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }

      reducers[key] = reducer;
      mountedReducer[key] = true;

      combinedReducer = combineReducers(reducers);
    },

    remove: (key: IStateSchemaKeys) => {
      if (!key || !reducers[key]) {
        return;
      }

      delete reducers[key];
      keysToRemove.push(key);
      mountedReducer[key] = false;

      combinedReducer = combineReducers(reducers);
    },
  };
}
