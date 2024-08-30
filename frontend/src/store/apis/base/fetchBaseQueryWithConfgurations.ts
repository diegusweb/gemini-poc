import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { API_URL } from "../../../configurations/envConfig";
import { RootState } from "../../store/store";

export const fetchBaseQueryWithConfigurations = (baseUrl: string) =>
    fetchBaseQuery({
        baseUrl: `${API_URL}${baseUrl}`,
        prepareHeaders: (Headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                Headers.set('Authorization', `Bearer ${token}`);
            }
            return Headers;
        }
    })
