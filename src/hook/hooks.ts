
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

export const useAppDispatch :()=>AppDispatch = useDispatch
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector