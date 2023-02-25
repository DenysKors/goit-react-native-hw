import { useState, useCallback, useEffect } from "react";
import {
	StyleSheet,
	Text,
	ImageBackground,
	TextInput,
	View,
	TouchableOpacity,
	Platform,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Dimensions,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [emailFocused, setEmailFocused] = useState(false);
	const [paswordFocused, setPaswordFocused] = useState(false);

	const [isShowKeyboard, setIsShowKeyboard] = useState(false);

	const [dimensions, setDimensions] = useState(Dimensions.get("window").width - 16 * 2);

	useEffect(() => {
		const onChange = () => {
			const width = Dimensions.get("window").width - 16 * 2;
			setDimensions(width);
		};
		const dimentionListener = Dimensions.addEventListener("change", onChange);
		return () => {
			dimentionListener.remove();
		};
	}, []);

	const keyboardHide = () => {
		setIsShowKeyboard(false);
		Keyboard.dismiss();
	};

	const onSubmitForm = () => {
		if (email === "" || password === "") {
			return alert("Please fill all fields");
		}
		setIsShowKeyboard(false);
		Keyboard.dismiss();
		setEmail("");
		setPassword("");
		console.log({ email, password });
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
		<TouchableWithoutFeedback onPress={keyboardHide}>
			<View style={styles.container} onLayout={onLayoutRootView}>
				<ImageBackground style={styles.image} source={require("../../../assets/images/background-image.jpg")}>
					<KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
						<View style={{ ...styles.box, paddingBottom: isShowKeyboard ? 32 : 111 }}>
							<Text style={styles.formTitle}>Войти</Text>
							<View style={{ ...styles.form, width: dimensions }}>
								<View style={{ marginBottom: 16 }}>
									<TextInput
										style={{
											...styles.input,
											borderColor: emailFocused ? "#FF6C00" : "#E8E8E8",
											backgroundColor: emailFocused ? "#FFF" : "#F6F6F6",
										}}
										placeholder={"Адрес электронной почты"}
										placeholderTextColor={"#BDBDBD"}
										value={email}
										onChangeText={value => setEmail(value)}
										onFocus={() => {
											setIsShowKeyboard(true);
											setEmailFocused(true);
										}}
										onBlur={() => setEmailFocused(false)}
									/>
								</View>
								<View style={{ marginBottom: 43 }}>
									<TextInput
										style={{
											...styles.input,
											borderColor: paswordFocused ? "#FF6C00" : "#E8E8E8",
											backgroundColor: paswordFocused ? "#FFF" : "#F6F6F6",
										}}
										placeholder={"Пароль"}
										placeholderTextColor={"#BDBDBD"}
										secureTextEntry={true}
										value={password}
										onChangeText={value => setPassword(value)}
										onFocus={() => {
											setIsShowKeyboard(true);
											setPaswordFocused(true);
										}}
										onBlur={() => setPaswordFocused(false)}
									/>
								</View>
								<TouchableOpacity activeOpacity={0.8} style={styles.btnLogin} onPress={onSubmitForm}>
									<Text style={styles.btnLoginTitle}>Войти</Text>
								</TouchableOpacity>
							</View>
							{!isShowKeyboard && (
								<TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate("Registration")}>
									<Text style={styles.btnRegisterTitle}>Нет аккаунта? Зарегистрироваться</Text>
								</TouchableOpacity>
							)}
						</View>
					</KeyboardAvoidingView>
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
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
		paddingTop: 32,
		borderTopRightRadius: 25,
		borderTopLeftRadius: 25,

		alignItems: "center",

		backgroundColor: "#FFF",
	},
	formTitle: {
		marginBottom: 32,
		fontSize: 30,
		textAlign: "center",
		color: "#212121",
	},
	form: {
		backgroundColor: "#FFF",
	},
	input: {
		paddingLeft: 16,
		paddingRight: 16,

		height: 50,
		fontSize: 16,
		lineHeight: 19,

		borderWidth: 1,
		borderRadius: 8,

		color: "#212121",
	},
	btnLogin: {
		height: 50,

		justifyContent: "center",
		alignItems: "center",

		borderRadius: 50,
		backgroundColor: "#FF6C00",
	},
	btnLoginTitle: {
		fontSize: 16,
		lineHeight: 19,

		color: "#FFF",
	},
	btnRegister: {
		marginHorizontal: 50,
		marginTop: 16,

		justifyContent: "center",
		alignItems: "center",
	},
	btnRegisterTitle: {
		fontSize: 16,
		lineHeight: 19,

		color: "#1B4371",
	},
});
