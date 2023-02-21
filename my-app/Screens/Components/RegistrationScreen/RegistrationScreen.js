import { useState, useCallback } from "react";
import {
	StyleSheet,
	ImageBackground,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Platform,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export const RegistrationScreen = () => {
	const [login, setLogin] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isShowKeyboard, setIsShowKeyboard] = useState(false);

	const keyboardHide = () => {
		setIsShowKeyboard(false);
		Keyboard.dismiss();
	};

	const onSubmitForm = () => {
		setIsShowKeyboard(false);
		Keyboard.dismiss();
		setLogin("");
		setEmail("");
		setPassword("");
		console.log({ login, email, password });
	};

	const [fontsLoaded] = useFonts({
		"Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
		"Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
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
		<View style={styles.container} onLayout={onLayoutRootView}>
			<TouchableWithoutFeedback onPress={keyboardHide}>
				<ImageBackground style={styles.image} source={require("../../../assets/images/background-image.jpg")}>
					<KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
						<View style={{ ...styles.box, paddingBottom: isShowKeyboard ? 32 : 45 }}>
							<Text style={styles.formTitle}>Регистрация</Text>
							<View style={styles.form}>
								<View style={{ marginBottom: 16 }}>
									<TextInput
										style={styles.input}
										placeholder={"Логин"}
										placeholderTextColor={"#BDBDBD"}
										value={login}
										onChangeText={value => setLogin(value)}
										onFocus={() => setIsShowKeyboard(true)}
									/>
								</View>
								<View style={{ marginBottom: 16 }}>
									<TextInput
										style={styles.input}
										placeholder={"Адрес электронной почты"}
										placeholderTextColor={"#BDBDBD"}
										value={email}
										onChangeText={value => setEmail(value)}
										onFocus={() => setIsShowKeyboard(true)}
									/>
								</View>
								<View style={{ marginBottom: 43 }}>
									<TextInput
										style={styles.input}
										placeholder={"Пароль"}
										placeholderTextColor={"#BDBDBD"}
										secureTextEntry={true}
										value={password}
										onChangeText={value => setPassword(value)}
										onFocus={() => setIsShowKeyboard(true)}
									/>
								</View>
								<TouchableOpacity activeOpacity={0.8} style={styles.btnRegister} onPress={onSubmitForm}>
									<Text style={styles.btnRegisterTitle}>Зарегистрироваться</Text>
								</TouchableOpacity>
							</View>
							{!isShowKeyboard && (
								<TouchableOpacity style={styles.btnLogin}>
									<Text style={styles.btnLoginTitle}>Уже есть аккаунт? Войти</Text>
								</TouchableOpacity>
							)}
						</View>
					</KeyboardAvoidingView>
				</ImageBackground>
			</TouchableWithoutFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "flex-end",
	},
	box: {
		paddingTop: 92,
		borderTopRightRadius: 25,
		borderTopLeftRadius: 25,

		backgroundColor: "#FFF",
	},
	formTitle: {
		marginBottom: 33,
		fontSize: 30,
		fontFamily: "Roboto-Medium",
		textAlign: "center",
		color: "#212121",
	},
	form: {
		marginHorizontal: 16,
		backgroundColor: "#FFF",
	},
	input: {
		paddingLeft: 16,
		paddingRight: 16,

		height: 50,
		fontSize: 16,
		lineHeight: 19,

		borderWidth: 1,
		borderColor: "#E8E8E8",
		borderRadius: 8,

		backgroundColor: "#F6F6F6",
		color: "#212121",
	},
	btnRegister: {
		height: 50,

		justifyContent: "center",
		alignItems: "center",

		borderRadius: 50,
		backgroundColor: "#FF6C00",
	},
	btnRegisterTitle: {
		fontFamily: "Roboto-Regular",
		fontSize: 16,
		lineHeight: 19,

		color: "#FFF",
	},
	btnLogin: {
		marginHorizontal: 50,
		marginTop: 16,

		justifyContent: "center",
		alignItems: "center",
	},
	btnLoginTitle: {
		fontFamily: "Roboto-Regular",
		fontSize: 16,
		lineHeight: 19,

		color: "#1B4371",
	},
});
