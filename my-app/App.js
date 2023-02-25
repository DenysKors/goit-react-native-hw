import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { RegistrationScreen } from "./Screens/Components/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/Components/LoginScreen/LoginScreen";

const AuthStack = createStackNavigator();

export default function App() {
	return (
		<>
			<NavigationContainer>
				<AuthStack.Navigator>
					<AuthStack.Screen options={{ headerShown: false }} name="Registration" component={RegistrationScreen} />
					<AuthStack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
				</AuthStack.Navigator>
			</NavigationContainer>
			<StatusBar style="auto" />
		</>
	);
}
