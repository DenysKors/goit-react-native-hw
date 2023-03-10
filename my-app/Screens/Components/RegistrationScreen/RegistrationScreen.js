import { useState, useCallback, useEffect } from "react";
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
	Dimensions,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AntDesign } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

export const RegistrationScreen = ({ navigation }) => {
	const [login, setLogin] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loginFocused, setLoginFocused] = useState("");
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
		if (login === "" || email === "" || password === "") {
			return alert("Please fill all fields");
		}
		console.log({ login, email, password });
		setIsShowKeyboard(false);
		Keyboard.dismiss();
		setLogin("");
		setEmail("");
		setPassword("");
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
					<KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
						<View style={{ ...styles.box, paddingBottom: isShowKeyboard ? 32 : 45 }}>
							<View style={styles.userImage}></View>
							<TouchableOpacity style={styles.addImageBtn}>
								<AntDesign name="pluscircleo" size={25} color="#FF6C00" />
							</TouchableOpacity>
							<Text style={styles.formTitle}>Регистрация</Text>
							<View style={{ ...styles.form, width: dimensions }}>
								<View style={{ marginBottom: 16 }}>
									<TextInput
										style={{
											...styles.input,
											borderColor: loginFocused ? "#FF6C00" : "#E8E8E8",
											backgroundColor: loginFocused ? "#FFF" : "#F6F6F6",
										}}
										placeholder={"Логин"}
										placeholderTextColor={"#BDBDBD"}
										value={login}
										onChangeText={value => setLogin(value)}
										onFocus={() => {
											setIsShowKeyboard(true);
											setLoginFocused(true);
										}}
										onBlur={() => setLoginFocused(false)}
									/>
								</View>
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
								<TouchableOpacity activeOpacity={0.8} style={styles.btnRegister} onPress={onSubmitForm}>
									<Text style={styles.btnRegisterTitle}>Зарегистрироваться</Text>
								</TouchableOpacity>
							</View>
							{!isShowKeyboard && (
								<TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate("Login")}>
									<Text style={styles.btnLoginTitle}>Уже есть аккаунт? Войти</Text>
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
		paddingTop: 92,
		borderTopRightRadius: 25,
		borderTopLeftRadius: 25,

		alignItems: "center",

		backgroundColor: "#FFF",
	},
	userImage: {
		width: 120,
		height: 120,

		position: "absolute",
		top: -60,

		backgroundColor: "#F6F6F6",
		borderRadius: 16,
	},
	addImageBtn: {
		position: "absolute",
		top: 20,
		right: 125,
	},
	formTitle: {
		marginBottom: 33,
		fontSize: 30,
		fontFamily: "Roboto-Medium",
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
