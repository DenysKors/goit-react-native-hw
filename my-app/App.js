import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { useCallback } from "react";

import { useRoute } from "./Routes/router";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded] = useFonts({
		"Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
		"Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
		"Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	const routing = useRoute(true);

	return (
		<>
			<SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
				<NavigationContainer>{routing}</NavigationContainer>
				<StatusBar style="auto" />
			</SafeAreaView>
		</>
	);
}
