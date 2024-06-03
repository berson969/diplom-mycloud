import {configureStore} from "@reduxjs/toolkit";
import {userApi} from "../api";
import {setupListeners} from "@reduxjs/toolkit/query";


export const store = configureStore({
	reducer: {
		// users: RootReducer,
		[userApi.reducerPath]: userApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware),

})

setupListeners(store.dispatch);
