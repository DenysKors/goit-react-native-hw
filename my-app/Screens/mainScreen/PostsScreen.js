import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, Image, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { collection, query, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/config";

import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export const PostsScreen = ({ navigation }) => {
	const [posts, setPosts] = useState([]);
	const [dimensions, setDimensions] = useState(Dimensions.get("window").width - 16 * 2);

	const { email, userName } = useSelector(state => state.auth);

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

	const getAllPosts = async () => {
		try {
			const postsRef = query(collection(firestore, "posts"));
			onSnapshot(postsRef, snapshot => {
				setPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getAllPosts();
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				ListHeaderComponent={
					<View style={styles.userBox}>
						<Image style={styles.userImg} source={require("../../assets/images/user-image-m.jpg")} />
						<View style={styles.userInfo}>
							<Text style={styles.userName}>{userName}</Text>
							<Text style={styles.userEmail}>{email}</Text>
						</View>
					</View>
				}
				data={posts}
				renderItem={({ item }) => {
					return (
						<View>
							<Image source={{ uri: item.photo }} style={{ ...styles.postImg, width: dimensions }} />
							<Text style={styles.postTitle}>{item.title}</Text>
							<View style={styles.postItem}>
								<View style={styles.postComment}>
									<Pressable
										style={styles.postBox}
										onPress={() =>
											navigation.navigate("Комментарии", {
												postId: item.id,
												postPhoto: item.photo,
												commentQty: item.commentQty,
											})
										}
									>
										<Feather name="message-circle" size={24} color={item.commentQty === 0 ? "#BDBDBD" : "#FF6C00"} />
										<Text style={styles.textBox}>{item.commentQty}</Text>
									</Pressable>
								</View>
								<Pressable
									style={styles.postBox}
									onPress={() => {
										navigation.navigate("Map", {
											longitude: item.longitude,
											latitude: item.latitude,
											title: item.title,
										});
									}}
								>
									<EvilIcons name="location" size={28} color="#BDBDBD" />
									<Text style={styles.textBox}>{item.location}</Text>
								</Pressable>
							</View>
						</View>
					);
				}}
				keyExtractor={(item, indx) => indx.toString()}
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
