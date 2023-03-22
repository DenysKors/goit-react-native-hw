import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image } from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export const PostsScreen = ({ navigation, route }) => {
	const [posts, setPosts] = useState([]);
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
		if (route.params) {
			const newPost = {
				img: route.params.photo,
				title: route.params.title,
				location: route.params.location,
				longitude: route.params.longitude,
				latitude: route.params.latitude,
			};
			console.log(newPost);
			setPosts(prevState => [...prevState, newPost]);
		}
	}, [route.params]);

	return (
		<View style={styles.container}>
			<FlatList
				ListHeaderComponent={
					<View style={styles.userBox}>
						<Image style={styles.userImg} source={require("../../assets/images/user-image-m.jpg")} />
						<View style={styles.userInfo}>
							<Text style={styles.userName}>Natali Romanova</Text>
							<Text style={styles.userEmail}>email@example.com</Text>
						</View>
					</View>
				}
				data={posts}
				renderItem={({ item }) => {
					return (
						<View>
							<Image source={{ uri: item.img }} style={{ ...styles.postImg, width: dimensions }} />
							<Text style={styles.postTitle}>{item.title}</Text>
							<View style={styles.postItem}>
								<View style={styles.postComment}>
									<TouchableOpacity
										style={styles.postBox}
										activeOpacity={0.5}
										onPress={() => navigation.navigate("Комментарии")}
									>
										<Feather name="message-circle" size={24} color="#FF6C00" />
										<Text style={styles.textBox}>{item.comments}</Text>
									</TouchableOpacity>
								</View>
								<TouchableOpacity
									style={styles.postBox}
									activeOpacity={0.5}
									onPress={() => {
										navigation.navigate("Map", { longitude: item.longitude, latitude: item.latitude });
									}}
								>
									<EvilIcons name="location" size={28} color="#BDBDBD" />
									<Text style={styles.textBox}>{item.location}</Text>
								</TouchableOpacity>
							</View>
						</View>
					);
				}}
				keyExtractor={(item, index) => index}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#FFFFFF",
	},
	userBox: {
		marginTop: 32,
		marginBottom: 32,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
	},
	userImg: {
		width: 60,
		height: 60,
		borderRadius: 16,
		resizeMode: "cover",
	},
	userInfo: {
		marginLeft: 8,
	},
	userName: {
		fontSize: 13,
		lineHeight: 15,
		fontFamily: "Roboto-Bold",
		color: "#212121",
	},
	userEmail: {
		fontSize: 11,
		lineHeight: 13,
		fontFamily: "Roboto-Regular",
		color: "#212121",
	},
	postImg: {
		height: 300,
		resizeMode: "cover",
		borderRadius: 8,
	},
	postTitle: {
		marginTop: 8,
		fontSize: 16,
		lineHeight: 19,
		color: "#212121",
		fontFamily: "Roboto-Medium",
	},
	postItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 8,
		marginBottom: 35,
	},
	postComment: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	postBox: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	textBox: {
		marginLeft: 4,
		fontSize: 16,
		lineHeight: 19,
		color: "#212121",
	},
});
