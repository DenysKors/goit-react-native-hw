import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";

export const LoginScreen = () => {
	return (
		<View style={styles.box}>
			<Text style={styles.formTitle}>Войти</Text>
			<View style={styles.form}>
				<View style={{ marginBottom: 16 }}>
					<TextInput style={styles.input} placeholder={"Адрес электронной почты"} placeholderTextColor={"#BDBDBD"} />
				</View>
				<View style={{ marginBottom: 43 }}>
					<TextInput
						style={styles.input}
						placeholder={"Пароль"}
						placeholderTextColor={"#BDBDBD"}
						secureTextEntry={true}
					/>
				</View>
				<TouchableOpacity activeOpacity={0.8} style={styles.btn}>
					<Text style={styles.btnTitle}>Войти</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	box: {
		paddingTop: 32,
		borderTopRightRadius: 25,
		borderTopLeftRadius: 25,

		backgroundColor: "#FFF",
	},
	formTitle: { marginBottom: 32, fontSize: 30, textAlign: "center", color: "#212121" },
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
	btn: {
		height: 50,

		justifyContent: "center",
		alignItems: "center",

		borderRadius: 50,
		backgroundColor: "#FF6C00",
	},
	btnTitle: {
		fontSize: 16,
		lineHeight: 19,

		color: "#FFF",
	},
});
