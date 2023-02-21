import { StatusBar } from "expo-status-bar";
import { RegistrationScreen } from "./Screens/Components/RegistrationScreen/RegistrationScreen";
// import { LoginScreen } from "./Screens/Components/LoginScreen/LoginScreen";

export default function App() {
	return (
		<>
			<RegistrationScreen />
			{/* <LoginScreen /> */}
			<StatusBar style="auto" />
		</>
	);
}
