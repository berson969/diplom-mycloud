import { createSlice } from '@reduxjs/toolkit';
import {EditFileType} from "../models";

const initialState: EditFileType = {
    editFile: null,
};

const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setEditFile: (state, action) => {
            state.editFile = action.payload;
        },
    },
});

export const {
    setEditFile,
} = filesSlice.actions;
export default filesSlice.reducer;
