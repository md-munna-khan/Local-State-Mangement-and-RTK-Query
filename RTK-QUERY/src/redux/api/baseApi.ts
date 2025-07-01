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
            providesTags: ["task"],
        }),
        createTask: builder.mutation({
            query: (taskData) => ({
                url: "/tasks",          // Endpoint to which the request will be sent
                method: "POST",         // HTTP method used for the request
                body: taskData          // Request payload (sent in the body of the POST)
            }),
            // ❌ This tells RTK Query to invalidate the "task" tag after this mutation
            // As a result, it will automatically refetch any queries that provide the "task" tag (like getTask)
            invalidatesTags: ["task"]
        })
    })
})

// made an automatic hook 
export const { useGetTaskQuery, useCreateTaskMutation } = baseApi