import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {FileType} from "../models";
// import {fileApi} from "../api";

const filesSlice = createSlice({
    name: 'files',
    initialState: { editFile: null, },
    reducers: {
        setEditFile: (state, action: PayloadAction<FileType | null>) => {
            state.editFile = action.payload;
        },
    },
});

export const {
    // setFiles,
    setEditFile,
} = filesSlice.actions;
export default filesSlice.reducer;
