import {configureStore} from "@reduxjs/toolkit";
import {fileApi, userApi} from "../api";
import currentUserReducer from "../slices/currentUserSlice";
import filesReducer from "../slices/filesSlice"

const store = configureStore({
	reducer: {
		currentUser: currentUserReducer,
		files: filesReducer,
		[userApi.reducerPath]: userApi.reducer,
		[fileApi.reducerPath]: fileApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}).concat(userApi.middleware, fileApi.middleware),

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
