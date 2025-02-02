import { AppDispatch } from "@/app/Provider/Store";
import { useDispatch } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
