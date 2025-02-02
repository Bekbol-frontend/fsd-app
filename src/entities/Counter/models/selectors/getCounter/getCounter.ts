import { IStateSchema } from "@/app/Provider/Store";

export const getCounter = (state: IStateSchema) => state.counter;
