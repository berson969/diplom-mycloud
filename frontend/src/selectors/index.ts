import { RootState } from '../store';

export const getCurrentUser = (state: RootState) => state.currentUser.currentUser;
export const selectActiveState = (state: RootState) => state.currentUser.activeState;
export const getView = (state: RootState) => state.currentUser.view;
