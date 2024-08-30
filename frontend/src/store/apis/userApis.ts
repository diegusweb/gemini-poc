import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQueryWithConfigurations } from "./base/fetchBaseQueryWithConfgurations";
import { User } from "../../types/interfaces/User";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQueryWithConfigurations('/users'),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => '',
            providesTags: ['User']
        }),
        getUser: builder.query<User, string>({
            query: (id) => `/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'User', id }],
        }),
        createUser: builder.mutation<User, Partial<User>>({
            query: (body:any) => ({
                url: '',
                method: 'POST',
                body
            }),
            invalidatesTags: ['User']
        }),
    }),
});

export const { useGetUsersQuery, useGetUserQuery, useCreateUserMutation } = userApi;
    
