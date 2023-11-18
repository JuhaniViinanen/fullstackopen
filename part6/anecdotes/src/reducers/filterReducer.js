import { createSlice } from "@reduxjs/toolkit"

/*
const filterReducer = (state = "", action) => {
    switch (action.type) {
        case "FILTER_CHANGE":
            return action.payload
        default:
            return state
    }
}

export const changeFilter = filter => {
    return {
        type: "FILTER_CHANGE",
        payload: filter
    }
}

export default filterReducer
*/

const filterSlice = createSlice({
    name: "filter",
    initialState: "",
    reducers: {
        changeFilter(state, action) {
            return action.payload
        }
    }
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer
