import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground, FlatList, Image, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, onSnapshot, where, updateDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase/config";

import { authLogoutUser } from "../../redux/auth/authOperations";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

export const ProfileScreen = ({ navigation }) => {
	const [profile, setProfile] = useState([]);
	const dispatch = useDispatch();

	const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);

	const { userName, userId } = useSelector(state => state.auth);

	useEffect(() => {
		const onChange = () => {
			const width = Dimensions.get("window").width;
			setWindowWidth(width);
		};
		const dimentionListener = Dimensions.addEventListener("change", onChange);
		return () => {
			dimentionListener.remove();
		};
	}, []);

	const getUserPosts = async () => {
		const userPostsRef = await query(collection(firestore, "posts"), where("userId", "==", `${userId}`));
		await onSnapshot(userPostsRef, snapshot => {
			setProfile(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		});
	};

	useEffect(() => {
		getUserPosts();
	}, []);

	const LogOut = () => {
		dispatch(authLogoutUser());
	};

	const addLike = async (postId, likesQty, likeStatus) => {
		if (likeStatus) {
			return console.log("Already liked!");
		}
		try {
			const postRef = doc(firestore, "posts", postId);
			await updateDoc(postRef, {
				likesQty: likesQty + 1,
				likeStatus: true,
			});
		} catch (error) {
			error.message;
		}
	};

	return (
		<View style={styles.container}>
			<ImageBackground style={styles.image} source={require("../../assets/images/background-image.jpg")}>
				<FlatList
					ListEmptyComponent={
						<View style={{ ...styles.emptyBox, width: windowWidth }}>
							<Text style={styles.emptyBoxText}>Добавьте свой первый пост</Text>
						</View>
					}
					ListHeaderComponent={
						<View style={{ ...styles.box, width: windowWidth }}>
							<View style={styles.userImage}>
								<Image style={styles.imageAvatar} source={require("../../assets/images/user-image-l.jpg")} />
								<Pressable style={styles.removeImageBtn}>
									<AntDesign name="closecircleo" size={25} color="#FF6C00" />
								</Pressable>
								<Pressable style={styles.logoutBtn} onPress={LogOut}>
									<MaterialIcons name="logout" size={28} color="#BDBDBD" />
								</Pressable>
							</View>
							<View style={styles.userTitleContainer}>
								<Text style={styles.userTitle}>{userName}</Text>
							</View>
						</View>
					}
					data={profile}
					renderItem={({ item }) => (
						<View
							style={{
								...styles.postContainer,
								width: windowWidth,
							}}
						>
							<Image
								source={{ uri: item.photo }}
								style={{
									...styles.postImg,
									width: windowWidth - 16 * 2,
								}}
							/>
							<Text
								style={{
									...styles.postTitle,
									width: windowWidth - 30,
								}}
							>
								{item.title}
							</Text>
							<View style={{ ...styles.statisticUser, width: windowWidth - 30 }}>
								<View style={styles.row}>
									<Pressable
										style={styles.statisticWrap}
										onPress={() =>
											navigation.navigate("Комментарии", {
												postId: item.id,
												postPhoto: item.photo,
												commentQty: item.commentQty,
											})
										}
									>
										<Feather name="message-circle" size={20} color={item.commentQty === 0 ? "#BDBDBD" : "#FF6C00"} />
										<Text style={styles.statisticText}>{item.commentQty}</Text>
									</Pressable>
									<View style={{ marginLeft: 22 }}>
										<Pressable
											style={styles.statisticWrap}
											onPress={() => addLike(item.id, item.likesQty, item.likeStatus)}
										>
											<AntDesign name="like2" size={20} color={item.likeStatus ? "#FF6C00" : "#BDBDBD"} />
											<Text style={styles.statisticText}>{item.likesQty}</Text>
										</Pressable>
									</View>
								</View>
								<View>
									<Pressable
										style={styles.statisticWrap}
										onPress={() => {
											navigation.navigate("Map", {
												longitude: item.longitude,
												latitude: item.latitude,
												title: item.title,
											});
										}}
									>
										<EvilIcons name="location" size={30} color="#BDBDBD" />
										<Text style={styles.statisticText}>{item.location}</Text>
									</Pressable>
								</View>
							</View>
						</View>
					)}
					keyExtractor={(item, indx) => indx.toString()}
					contentContainerStyle={{
						flexGrow: 1,
						alignItems: "center",

						borderTopLeftRadius: 25,
						borderTopRightRadius: 25,
					}}
					showsVerticalScrollIndicator={false}
				/>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	image: {
		flex: 1,
		resizeMode: "cover",
	},
	emptyBox: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		height: 240,
	},
	emptyBoxText: {
		alignItems: "center",
		fontSize: 16,
		color: "#212121",
		fontFamily: "Roboto-Medium",
	},
	box: {
		marginTop: 140,
		borderTopRightRadius: 25,
		borderTopLeftRadius: 25,
		alignItems: "center",
		backgroundColor: "#FFF",
	},

	userImage: {
		position: "absolute",
		top: -60,
		width: 120,
		height: 120,
		backgroundColor: "#F6F6F6",
		borderRadius: 16,
	},
	imageAvatar: {
		width: "100%",
		height: "100%",
		borderRadius: 16,
		resizeMode: "cover",
	},
	removeImageBtn: {
		position: "absolute",
		top: 75,
		left: 108,
	},
	logoutBtn: {
		position: "absolute",
		top: 75,
		left: 215,
	},

	userTitleContainer: {
		alignItems: "center",
		marginTop: 92,
		marginBottom: 30,
	},
	userTitle: {
		textAlign: "center",
		fontSize: 30,
		lineHeight: 35,
		color: "#212121",
		fontFamily: "Roboto-Medium",
	},
	postContainer: {
		alignItems: "center",
		backgroundColor: "#FFFFFF",
	},
	postImg: {
		height: 240,
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
	statisticUser: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 8,
		marginBottom: 35,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	statisticWrap: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	statisticText: {
		marginLeft: 4,
		fontSize: 16,
		lineHeight: 19,
		color: "#212121",
	},
});
