import React from "react";
import { useState, useCallback, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	FlatList,
	Image,
	SafeAreaView,
	Keyboard,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { commentScreenData } from "../../data/postsData";

import { Ionicons } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

export const CommentsScreen = () => {
	const [comments, setComments] = useState(commentScreenData);
	const [text, setText] = useState("");

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

	const onCommentSend = () => {
		if (text === "") {
			return alert("Пожалуйста оставьте комментарий");
		}
		console.log({ text });
		setText("");
		Keyboard.dismiss();
	};

	const [fontsLoaded] = useFonts({
		"Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
		"Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
		"Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
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
		<SafeAreaView style={{ ...styles.container, height: "100%" }} onLayout={onLayoutRootView}>
			<FlatList
				data={comments}
				style={{ backgroundColor: "#FFFFFF" }}
				ListHeaderComponent={
					<View style={styles.containerHeader}>
						<Image style={styles.commentImage} source={require("../../assets/images/sunset.jpg")} />
					</View>
				}
				renderItem={({ item }) => {
					return (
						<View
							style={{
								...styles.commentWrapper,
								width: dimensions,
							}}
						>
							<Image source={item.userAvatar} style={styles.commentAvatarImage} />
							<View
								style={{
									...styles.textWrapper,
									width: dimensions - 35,
								}}
							>
								<Text style={styles.commentText}>{item.text}</Text>
								<Text style={styles.commentDate}>
									{item.date} | {item.time}
								</Text>
							</View>
						</View>
					);
				}}
				keyExtractor={item => item.id}
			/>
			<View>
				<TextInput
					value={text}
					style={styles.input}
					placeholder="Комментировать..."
					cursorColor={"#BDBDBD"}
					placeholderTextColor={"#BDBDBD"}
					onChangeText={value => setText(value)}
				></TextInput>
				<TouchableOpacity style={styles.sendButton} onPress={onCommentSend}>
					<Ionicons name="md-arrow-up-circle-sharp" size={34} color="#FF6C00" />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		width: "100%",
		backgroundColor: "#FFFFFF",
		alignItems: "center",
	},

	commentImage: {
		width: "100%",
		marginBottom: 30,
		borderRadius: 8,
	},
	commentWrapper: {
		flexDirection: "row",
		marginBottom: 24,
	},
	textWrapper: {
		padding: 16,
		backgroundColor: "#00000008",
		borderTopRightRadius: 6,
		borderBottomLeftRadius: 6,
		borderBottomRightRadius: 6,
	},

	commentAvatarImage: {
		width: 28,
		height: 28,
		marginRight: 16,
		resizeMode: "cover",
	},
	commentText: {
		fontSize: 13,
		lineHeight: 18,
		fontFamily: "Roboto-Regular",
		color: "#212121",
	},
	commentDate: {
		marginTop: 8,
		fontSize: 10,
		lineHeight: 12,
		fontFamily: "Roboto-Regular",
		color: "#BDBDBD",
	},
	input: {
		marginTop: 30,
		marginBottom: 10,
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 15,
		width: 340,
		height: 50,
		backgroundColor: "#F6F6F6",
		borderWidth: 1,
		borderColor: "#E8E8E8",
		borderRadius: 100,
	},
	sendButton: {
		position: "absolute",
		right: 15,
		bottom: 15,
	},
});
