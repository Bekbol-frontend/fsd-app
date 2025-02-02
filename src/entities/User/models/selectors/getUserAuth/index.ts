import { IStateSchema } from "@/app/Provider/Store";

export const getUserAuth = (state: IStateSchema) => state.user.user;
