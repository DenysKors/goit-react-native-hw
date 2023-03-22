import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground, FlatList, Image, TouchableOpacity } from "react-native";

import { profileScreenData } from "../../data/postsData";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

export const ProfileScreen = ({ navigation }) => {
	const [profile, setProfile] = useState(profileScreenData);

	const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);

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

	return (
		<View style={styles.container}>
			<ImageBackground style={styles.image} source={require("../../assets/images/background-image.jpg")}>
				<FlatList
					ListHeaderComponent={
						<View style={{ ...styles.box, width: windowWidth }}>
							<View style={styles.userImage}>
								<Image style={styles.imageAvatar} source={require("../../assets/images/user-image-l.jpg")} />
								<TouchableOpacity style={styles.removeImageBtn} activeOpacity={0.5}>
									<AntDesign name="closecircleo" size={25} color="#FF6C00" />
								</TouchableOpacity>
								<TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
									<MaterialIcons name="logout" size={28} color="#BDBDBD" />
								</TouchableOpacity>
							</View>
							<View style={styles.userTitleContainer}>
								<Text style={styles.userTitle}>Natali Romanova</Text>
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
								source={item.img}
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
									<TouchableOpacity
										style={styles.statisticWrap}
										activeOpacity={0.5}
										onPress={() => navigation.navigate("Комментарии")}
									>
										<Feather name="message-circle" size={20} color="#FF6C00" />
										<Text style={styles.statisticText}>{item.comments}</Text>
									</TouchableOpacity>
									<View style={{ ...styles.statisticWrap, marginLeft: 22 }}>
										<AntDesign name="like2" size={20} color="#FF6C00" />
										<Text style={styles.statisticText}>{item.likes}</Text>
									</View>
								</View>
								<View style={styles.statisticWrap}>
									<EvilIcons name="location" size={30} color="#BDBDBD" />
									<Text style={styles.statisticText}>{item.location}</Text>
								</View>
							</View>
						</View>
					)}
					keyExtractor={item => item.id}
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
