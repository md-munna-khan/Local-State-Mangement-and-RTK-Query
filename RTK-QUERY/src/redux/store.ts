
import { configureStore } from "@reduxjs/toolkit"

// Import the baseApi which contains our API slice (created using createApi)
import { baseApi } from "./api/baseApi"

// Creating the Redux store
export const store = configureStore({
    reducer: {
        // Adds the API slice reducer to the Redux store under the key "baseApi"
        // This manages the cache, loading, error, and data state for API requests
        [baseApi.reducerPath]: baseApi.reducer
        // Equivalent to: baseApi: baseApi.reducer
        // baseApi.reducerPath returns "baseApi" by default
    },

    // Enhancing the middleware pipeline with RTK Query's middleware
    // This enables caching, automated refetching, polling, etc.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
