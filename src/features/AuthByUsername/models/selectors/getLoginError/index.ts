import { IStateSchema } from "@/app/Provider/Store";

export const getLoginError = (state: IStateSchema) => state.login?.error;
