import { createSlice } from '@reduxjs/toolkit';
import {UserProps} from "../models";
import {userApi} from "../api";

const initialState: UserProps = {
	loginUser: null,
	currentUser: null,
	activeState: 'logout',
	view: 'list',
	isLoading: false,
	error: '',
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setLoginUser(state, action) {
			state.loginUser = action.payload;
			state.currentUser = action.payload;
		},
		setCurrentUser(state, action) {
			state.currentUser = action.payload;
		},
		clearUser(state) {
		state.loginUser = null;
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
			.addMatcher(userApi.endpoints.loginAction.matchPending, (state) => {
				console.log("loginUserPending", state);
			})
			.addMatcher(userApi.endpoints.loginAction.matchFulfilled, (state, action) => {
				console.log("loginUserFulfilled", state, action.payload.user);

				state.isLoading = false;
				state.currentUser = action.payload.user;
				state.error = "";
			})
			.addMatcher(userApi.endpoints.loginAction.matchRejected, (state, action) => {
				console.log("loginUserRejected", state);
				state.isLoading = false;
				state.error = typeof (action.payload) == 'string' ? action.payload : 'Login failed';
			})
			.addMatcher(userApi.endpoints.logoutAction.matchPending, (state) => {
				console.log("logoutUserPending", state);
			})
			.addMatcher(userApi.endpoints.logoutAction.matchFulfilled, (state) => {
				console.log("logoutUserFulfilled", state);

				state.isLoading = false;
				state.currentUser = null;
				state.error = "";
			})
			.addMatcher(userApi.endpoints.logoutAction.matchRejected, (state, action) => {
				console.log("loginUserRejected", state);
				state.isLoading = false;
				state.error = typeof (action.payload) == 'string' ? action.payload : 'Logout failed';
			});

	},
})

export const {
	setLoginUser,
	setCurrentUser,
	clearUser,
	setActiveState,
	setView,
} = usersSlice.actions;

export default usersSlice.reducer;
