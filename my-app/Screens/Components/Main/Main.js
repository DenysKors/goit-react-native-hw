import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../../../Routes/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authStateChangetUser } from "../../../redux/auth/authOperations";

export const Main = () => {
	const { stateChange } = useSelector(state => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(authStateChangetUser());
	}, []);
	const routing = useRoute(stateChange);
	return <NavigationContainer>{routing}</NavigationContainer>;
};
