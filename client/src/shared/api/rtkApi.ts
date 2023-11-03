import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_Cookie_KEY } from 'shared/const';
import Cookie from 'js-cookie';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: (headers: Headers) => {
            const token = Cookie.get(USER_Cookie_KEY) || '';
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});
