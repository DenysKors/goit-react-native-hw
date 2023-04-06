import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { useCallback } from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";

import { store } from "./redux/store";

import { Main } from "./Screens/Components/Main/Main";

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

	return (
		<>
			<SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
				<Provider store={store}>
					<Main />
				</Provider>
			</SafeAreaView>
			<StatusBar style="auto" />
		</>
	);
}
