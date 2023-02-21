import { useState } from "react";
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

export const RegistrationScreen = () => {
	const [isShowKeyboard, setIsShowKeyboard] = useState(false);

	const keyboardHide = () => {
		setIsShowKeyboard(false);
		Keyboard.dismiss();
	};

	return (
		<View style={styles.container}>
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
										onFocus={() => setIsShowKeyboard(true)}
									/>
								</View>
								<View style={{ marginBottom: 16 }}>
									<TextInput
										style={styles.input}
										placeholder={"Адрес электронной почты"}
										placeholderTextColor={"#BDBDBD"}
										onFocus={() => setIsShowKeyboard(true)}
									/>
								</View>
								<View style={{ marginBottom: 43 }}>
									<TextInput
										style={styles.input}
										placeholder={"Пароль"}
										placeholderTextColor={"#BDBDBD"}
										secureTextEntry={true}
										onFocus={() => setIsShowKeyboard(true)}
									/>
								</View>
								<TouchableOpacity activeOpacity={0.8} style={styles.btnRegister}>
									<Text style={styles.btnRegisterTitle}>Зарегистрироваться</Text>
								</TouchableOpacity>
							</View>
							<TouchableOpacity style={styles.btnLogin}>
								<Text style={styles.btnLoginTitle}>Уже есть аккаунт? Войти</Text>
							</TouchableOpacity>
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
		marginBottom: 16,
		height: 50,

		justifyContent: "center",
		alignItems: "center",

		borderRadius: 50,
		backgroundColor: "#FF6C00",
	},
	btnRegisterTitle: {
		fontSize: 16,
		lineHeight: 19,

		color: "#FFF",
	},
	btnLogin: {
		marginHorizontal: 50,

		justifyContent: "center",
		alignItems: "center",
	},
	btnLoginTitle: {
		fontSize: 16,
		lineHeight: 19,

		color: "#1B4371",
	},
});
