import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	KeyboardAvoidingView,
	ScrollView,
	Dimensions,
	Platform,
	Image,
	Pressable,
	TouchableOpacity,
} from "react-native";

import * as Location from "expo-location";
import { Camera } from "expo-camera";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../firebase/config";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

export const CreatePostsScreen = ({ navigation }) => {
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [isPublish, setIsPublish] = useState(false);
	const [dimensions, setDimensions] = useState(Dimensions.get("window").width - 16 * 2);
	const [camera, setCamera] = useState(null);
	const [photo, setPhoto] = useState(null);
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");

	const { userId, userName } = useSelector(state => state.auth);

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
		if (title !== "" && location !== "" && photo) {
			setIsPublish(true);
		} else if (title === "" || location === "" || !photo) {
			setIsPublish(false);
		}
	}, [title, location]);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}
		})();
	}, []);

	const onDelete = () => {
		setTitle("");
		setLocation("");
		setIsPublish(false);
		setPhoto(null);
	};

	const takePhoto = async () => {
		try {
			const { uri } = await camera.takePictureAsync();
			const location = await Location.getCurrentPositionAsync();
			setLatitude(location.coords.latitude);
			setLongitude(location.coords.longitude);
			setPhoto(uri);
		} catch (error) {
			console.log(error.messsage);
		}
	};

	const uploadPhoto = async () => {
		try {
			const response = await fetch(photo);
			const file = await response.blob();
			const postId = Date.now().toString();
			const storage = getStorage();
			const storageRef = ref(storage, `postImage/${postId}`);

			await uploadBytes(storageRef, file);

			const photoRef = await getDownloadURL(storageRef);
			return photoRef;
		} catch (error) {
			console.log(error.message);
		}
	};

	const uploadPost = async () => {
		const dbPhotoRef = await uploadPhoto();
		try {
			await addDoc(collection(firestore, "posts"), {
				photo: dbPhotoRef,
				title,
				userId,
				userName,
				location,
				longitude,
				latitude,
				commentQty: 0,
				likesQty: 0,
			});
		} catch (error) {
			console.log(error.messsage);
		}
	};

	const onPublish = async () => {
		await uploadPost();
		setTitle("");
		setLocation("");
		setIsPublish(false);
		setPhoto(null);
		navigation.navigate("Публикации");
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" && "padding"}>
			<ScrollView>
				<View style={styles.section}>
					<View style={{ ...styles.contentBox, width: dimensions }}>
						<Camera style={{ ...styles.cameraBox, width: dimensions }} ref={setCamera}>
							<TouchableOpacity style={styles.addPhotoBtn} onPress={takePhoto}>
								<MaterialIcons name="photo-camera" size={24} color="#FFFFFF" />
							</TouchableOpacity>
						</Camera>
					</View>
					{photo && (
						<View style={{ ...styles.photoContainer, width: dimensions }}>
							<Image source={{ uri: photo }} style={{ height: 240, width: dimensions }} />
						</View>
					)}
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
						<Pressable
							style={{ ...styles.publishBtn, backgroundColor: isPublish ? "#FF6C00" : "#F6F6F6" }}
							disabled={isPublish ? false : true}
							onPress={onPublish}
						>
							<Text style={{ ...styles.publishBtnText, color: isPublish ? "#FFFFFF" : "#BDBDBD" }}>Опубликовать</Text>
						</Pressable>
					</View>
					<Pressable style={{ ...styles.deleteBtn, backgroundColor: photo ? "#FF6C00" : "#F6F6F6" }} onPress={onDelete}>
						<AntDesign name="delete" size={24} color="#BDBDBD" />
					</Pressable>
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
		justifyContent: "center",
		height: 240,
		backgroundColor: "#F6F6F6",
		borderStyle: "solid",
		borderRadius: 8,
		borderColor: "#E8E8E8",
	},
	cameraBox: {
		height: 240,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
	},
	photoContainer: {
		height: 240,
		borderRadius: 8,
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
		opacity: 0.3,
	},
	deleteBtn: {
		marginTop: 80,
		width: 70,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
	},
});
