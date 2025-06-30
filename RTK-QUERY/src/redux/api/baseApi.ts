// Importing the necessary functions from Redux Toolkit Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Creating a base API instance using createApi
export const baseApi = createApi({
    // Unique key for the API reducer in the Redux store
    reducerPath: "baseApi",

    // Defines the base URL for all API calls
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),

    // 🔖 Declaring tag types that can be used to manage cache
    // These tags help RTK Query know when to refetch or invalidate cached data

    tagTypes: ["task"],
    // Define all API endpoints here
    endpoints: (builder) => ({
        // Define a "getTask" endpoint for fetching tasks
        getTask: builder.query({
            // This query will hit the `/tasks` route (full URL: http://localhost:5000/api/tasks)
            query: () => "/tasks",
            // ✅ This tells RTK Query that the result of this query provides the "task" tag
            // So, if any mutation invalidates this tag, this query will be refetched automatically
           
        })
        })
    })