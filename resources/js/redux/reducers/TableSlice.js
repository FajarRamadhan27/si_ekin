import { createSlice } from "@reduxjs/toolkit";

export const tableSlice = createSlice({
    name: 'table',
    initialState: {
        headCells: null,
        selectedRow: null
    },
    reducers: {
        setHeadCell: (state, headCells) => {
            state.headCells = headCells.payload
        },
        setSelectedRow: (state, row) => {
            state.selectedRow = row.payload
        }
    }
})

export const { setHeadCell, setSelectedRow } = tableSlice.actions

export default tableSlice.reducer
