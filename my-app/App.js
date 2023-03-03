import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "./Routes/router";

export default function App() {
	const routing = useRoute(true);
	return (
		<>
			<NavigationContainer>{routing}</NavigationContainer>
			<StatusBar style="auto" />
		</>
	);
}
