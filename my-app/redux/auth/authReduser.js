import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
	userId: null,
	userName: null,
	email: null,
	stateChange: false,
};

export const authorizationSlice = createSlice({
	name: "auth",
	initialState: authInitialState,
	reducers: {
		updateUserProfile: (state, { payload }) => ({
			...state,
			userId: payload.userId,
			userName: payload.userName,
			email: payload.email,
		}),
		authStateChange: (state, { payload }) => ({ ...state, stateChange: payload.stateChange }),
		authLogout: () => authInitialState,
	},
});
