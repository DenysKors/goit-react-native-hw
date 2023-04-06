import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authorizationSlice } from "./authReduser";

const { updateUserProfile, authStateChange, authLogout } = authorizationSlice.actions;

export const authRegisterUser =
	({ login, email, password }) =>
	async (dispatch, getState) => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(auth.currentUser, {
				displayName: login,
				photoURL: "",
			});

			const { uid, displayName } = auth.currentUser;
			dispatch(updateUserProfile({ userId: uid, userName: displayName, email }));
		} catch (error) {
			console.log(error.message);
			alert("This email/password already exist");
		}
	};

export const authLoginUser =
	({ email, password }) =>
	async (dispatch, getState) => {
		try {
			const loginUser = await signInWithEmailAndPassword(auth, email, password);
			const user = loginUser.user;
		} catch (error) {
			console.log(error.message);
			alert("You entered wrong email/password");
		}
	};

export const authLogoutUser = () => async (dispatch, getState) => {
	try {
		await signOut(auth);
		dispatch(authLogout());
	} catch (error) {
		console.log(error.messasge);
	}
};

export const authStateChangetUser = () => async (dispatch, getState) => {
	try {
		await auth.onAuthStateChanged(user => {
			if (user) {
				dispatch(authStateChange({ stateChange: true }));
				dispatch(updateUserProfile({ userId: user.uid, userName: user.displayName, email: user.email }));
			}
		});
	} catch (error) {
		console.log(error.messasge);
	}
};
