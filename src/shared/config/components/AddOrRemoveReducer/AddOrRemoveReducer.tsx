import { IReduxStoreWithManager, IStateSchemaKeys } from "@/app/Provider/Store";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { Reducer } from "@reduxjs/toolkit";
import { ReactNode, useEffect } from "react";
import { useStore } from "react-redux";

export type ReducersList = Partial<Record<IStateSchemaKeys, Reducer>>;

interface IProps {
  children: ReactNode;
  reducersList: ReducersList;
  removeReducer?: boolean;
}

function AddOrRemoveReducer(props: IProps) {
  const { children, reducersList, removeReducer = true } = props;
  const store = useStore() as IReduxStoreWithManager;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getReducerMap();

    Object.entries(reducersList).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as IStateSchemaKeys];

      if (!mounted) {
        store.reducerManager.add(name as IStateSchemaKeys, reducer);
        dispatch({ type: `ADD ${name} REDUCER` });
      }
    });

    return () => {
      if (removeReducer) {
        Object.entries(reducersList).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as IStateSchemaKeys);
          dispatch({ type: `REMOVE ${name} REDUCER` });
        });
      }
    };
  }, [removeReducer, reducersList, dispatch, store]);

  return <>{children}</>;
}

export default AddOrRemoveReducer;
