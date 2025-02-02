import { IStateSchema } from "@/app/Provider/Store";
import { useSelector } from "react-redux";

export function useUser() {
  return useSelector((state: IStateSchema) => state.user.user);
}
