import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { authorizationSlice } from "./auth/authReduser";

const rootReducer = combineReducers({
	[authorizationSlice.name]: authorizationSlice.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
});
