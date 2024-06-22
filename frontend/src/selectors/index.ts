// import { createSelector } from 'reselect';
import { RootState } from '../store';


export const getLoginUser = (state: RootState) => state.users.loginUser;
export const getCurrentUser = (state: RootState) => state.users.currentUser;
export const selectActiveState = (state: RootState) => state.users.activeState;
export const getView = (state: RootState) => state.users.view;
export const getEditFile = (state: RootState) => state.files.editFile;
