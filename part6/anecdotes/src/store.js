import { configureStore } from "@reduxjs/toolkit"

import anecdoteReducer from "./reducers/anecdoteReducer"
import filterReducer from "./reducers/filterReducer.js"

const appStore = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer
    }
})

export default appStore
