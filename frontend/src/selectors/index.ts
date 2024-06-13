// import { createSelector } from 'reselect';
import { RootState } from '../store';


export const getCurrentUser = (state: RootState) => state.currentUser.currentUser;
export const selectActiveState = (state: RootState) => state.currentUser.activeState;
export const getView = (state: RootState) => state.currentUser.view;
// export const getFiles = (state: RootState) => state.files.files;

// export const getFilesWithStatus = createSelector(
//     getFiles,
//     (state) => state.files.isLoading,
//     (state) => state.files.error,
//     (files, isLoading, error) => ({
//         files,
//         isLoading,
//         error,
//     })
// );
export const getEditFile = (state: RootState) => state.files.editFile;
