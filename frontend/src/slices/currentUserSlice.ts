import { createSlice } from '@reduxjs/toolkit';
import {CurrentUserProps} from "../models";
import {userApi} from "../api";

const initialState: CurrentUserProps = {
	currentUser: null,
	activeState: 'logout',
	view: 'list',
	isLoading: false,
	error: '',
};

const currentUserSlice = createSlice({
	name: 'loginUser',
	initialState,
	reducers: {
		setUser(state, action) {
			state.currentUser = action.payload;
		},
		 clearUser(state) {
		 	state.currentUser = null;
		 },
		setActiveState(state, action) {
			state.activeState = action.payload;
		},
		setView(state, action) {
			state.view = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(userApi.endpoints.loginUser.matchPending, (state) => {
				console.log("loginUserPending", state);
			})
			.addMatcher(userApi.endpoints.loginUser.matchFulfilled, (state, action) => {
				console.log("loginUserFulfilled", state, action.payload.user);

				state.isLoading = false;
				state.currentUser = action.payload.user;
				state.error = "";
			})
			.addMatcher(userApi.endpoints.loginUser.matchRejected, (state, action) => {
				console.log("loginUserRejected", state);
				state.isLoading = false;
				state.error = typeof (action.payload) == 'string' ? action.payload : 'Login failed';
			})
			.addMatcher(userApi.endpoints.logoutUser.matchPending, (state) => {
				console.log("logoutUserPending", state);
			})
			.addMatcher(userApi.endpoints.logoutUser.matchFulfilled, (state) => {
				console.log("logoutUserFulfilled", state);

				state.isLoading = false;
				state.currentUser = null;
				state.error = "";
			})
			.addMatcher(userApi.endpoints.logoutUser.matchRejected, (state, action) => {
				console.log("loginUserRejected", state);
				state.isLoading = false;
				state.error = typeof (action.payload) == 'string' ? action.payload : 'Logout failed';
			});

	},
})

export const {
	setUser,
	clearUser,
	setActiveState,
	setView,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
