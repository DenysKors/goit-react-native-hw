import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
// import { RegistrationScreen } from "./Screens/Components/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/Components/LoginScreen/LoginScreen";

export default function App() {
	return (
		<View style={styles.container}>
			<ImageBackground style={styles.image} source={require("./assets/images/background-image.jpg")}>
				{/* <RegistrationScreen /> */}
				<LoginScreen />
			</ImageBackground>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		// alignItems: "center",
		// justifyContent: "center",
	},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "flex-end",
	},
});
