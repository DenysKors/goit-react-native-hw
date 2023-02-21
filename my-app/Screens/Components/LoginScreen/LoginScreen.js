import React, { useState } from "react";
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
} from "react-native";

export const LoginScreen = () => {
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
		setEmail("");
		setPassword("");
		console.log({ email, password });
	};

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback onPress={keyboardHide}>
				<ImageBackground style={styles.image} source={require("../../../assets/images/background-image.jpg")}>
					<KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
						<View style={{ ...styles.box, paddingBottom: isShowKeyboard ? 32 : 111 }}>
							<Text style={styles.formTitle}>Войти</Text>
							<View style={styles.form}>
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
								<TouchableOpacity activeOpacity={0.8} style={styles.btnLogin} onPress={onSubmitForm}>
									<Text style={styles.btnLoginTitle}>Войти</Text>
								</TouchableOpacity>
							</View>
							{!isShowKeyboard && (
								<TouchableOpacity style={styles.btnRegister}>
									<Text style={styles.btnRegisterTitle}>Нет аккаунта? Зарегистрироваться</Text>
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
		paddingTop: 32,
		borderTopRightRadius: 25,
		borderTopLeftRadius: 25,

		backgroundColor: "#FFF",
	},
	formTitle: {
		marginBottom: 32,
		fontSize: 30,
		textAlign: "center",
		color: "#212121",
	},
	form: {
		marginHorizontal: 16,
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
