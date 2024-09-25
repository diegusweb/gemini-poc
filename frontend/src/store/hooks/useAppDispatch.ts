import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";

export const useAppDispatch: () => AppDispatch = useDispatch;

