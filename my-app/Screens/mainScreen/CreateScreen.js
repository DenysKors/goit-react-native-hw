import React from "react";
import { useState, useCallback, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	KeyboardAvoidingView,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	Platform,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

export const CreatePostsScreen = () => {
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");

	const [isPublish, setIsPublish] = useState(false);

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

	useEffect(() => {
		if (title !== "" && location !== "") {
			setIsPublish(true);
		} else if (title === "" || location === "") {
			setIsPublish(false);
		}
	}, [title, location]);

	const onPublish = () => {
		console.log({ title, location });
		setTitle("");
		setLocation("");
		setIsPublish(false);
	};

	const onDelete = () => {
		setTitle("");
		setLocation("");
		setIsPublish(false);
	};

	const [fontsLoaded] = useFonts({
		"Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
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
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" && "padding"}
			onLayout={onLayoutRootView}
		>
			<ScrollView>
				<View style={styles.section}>
					<View style={{ ...styles.contentBox, width: dimensions }}>
						<TouchableOpacity style={styles.addPhotoBtn} activeOpacity={0.8}>
							<MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
						</TouchableOpacity>
					</View>
					<View style={styles.contentBoxText}>
						<Text style={styles.contentText}>Загрузите фото</Text>
					</View>
					<View style={{ width: dimensions }}>
						<TextInput
							style={styles.photoTitle}
							value={title}
							placeholder="Название..."
							placeholderTextColor={"#BDBDBD"}
							onChangeText={value => setTitle(value)}
						></TextInput>
						<View style={styles.locationBox}>
							<EvilIcons name="location" size={24} color="#BDBDBD" />
							<TextInput
								style={styles.photoLocation}
								value={location}
								placeholder="Местность..."
								placeholderTextColor={"#BDBDBD"}
								onChangeText={value => setLocation(value)}
							></TextInput>
						</View>
						<TouchableOpacity
							style={{ ...styles.publishBtn, backgroundColor: isPublish ? "#FF6C00" : "#F6F6F6" }}
							activeOpacity={0.8}
							disabled={isPublish ? false : true}
							onPress={onPublish}
						>
							<Text style={{ ...styles.publishBtnText, color: isPublish ? "#FFFFFF" : "#BDBDBD" }}>Опубликовать</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={styles.deleteBtn} activeOpacity={0.8} onPress={onDelete}>
						<AntDesign name="delete" size={24} color="#BDBDBD" />
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	section: {
		alignItems: "center",
		marginTop: 32,
		marginBottom: 34,
		paddingHorizontal: 16,
	},
	contentBox: {
		marginBottom: 8,
		alignItems: "center",
		justifyContent: "center",
		height: 240,
		backgroundColor: "#F6F6F6",
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: 8,
		borderColor: "#E8E8E8",
	},
	contentBoxText: {
		width: "100%",
		alignItems: "flex-start",
	},
	contentText: {
		marginBottom: 32,
		fontFamily: "Roboto-Regular",
		fontSize: 16,
		lineHeight: 19,
		color: "#BDBDBD",
	},
	photoTitle: {
		marginBottom: 16,
		height: 50,
		fontFamily: "Roboto-Regular",
		borderBottomWidth: 1,
		borderStyle: "solid",
		borderColor: "#E8E8E8",
		fontSize: 16,
		lineHeight: 19,
		color: "#212121",
	},
	locationBox: {
		marginBottom: 32,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 32,
		borderBottomWidth: 1,
		borderStyle: "solid",
		borderColor: "#E8E8E8",
	},
	photoLocation: {
		flex: 1,
		height: 50,
		fontFamily: "Roboto-Regular",
		fontSize: 16,
		lineHeight: 19,
		color: "#212121",
	},
	publishBtn: {
		marginBottom: 55,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		backgroundColor: "#FF6C00",
	},
	publishBtnText: {
		fontSize: 16,
		lineHeight: 19,
		fontFamily: "Roboto-Regular",
	},
	addPhotoBtn: {
		height: 60,
		width: 60,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 30,
		backgroundColor: "#FFFFFF",
	},
	deleteBtn: {
		marginTop: 80,
		width: 70,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#F6F6F6",
		borderRadius: 20,
	},
});
