import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: () => {
            // Crear el objeto headers
            const headers = new Headers();
            
            // Establecer la clave 'X-RapidAPI-Key'
            headers.set('X-RapidAPI-Key', 'fec5b49903mshcc3fa20795adba4p1cafecjsn925f2771ed2a');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/world' }),
    }),
});

export const {
    useGetTopChartsQuery,
} = shazamCoreApi;
