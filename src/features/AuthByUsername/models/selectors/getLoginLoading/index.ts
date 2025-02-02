import { IStateSchema } from "@/app/Provider/Store";

export const getLoginLoading = (state: IStateSchema) => state.login?.loading || false;
