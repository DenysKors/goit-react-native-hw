import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions, FlatList, Image, SafeAreaView, Keyboard } from "react-native";
import { useSelector } from "react-redux";
import { collection, doc, addDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { TextInput } from "react-native-gesture-handler";

import { Ionicons } from "@expo/vector-icons";

export const CommentsScreen = ({ route }) => {
	const { postId, postPhoto, commentQty } = route.params;

	const [comments, setComments] = useState([]);
	const [text, setText] = useState("");
	const [dimensions, setDimensions] = useState(Dimensions.get("window").width - 16 * 2);

	const { userName } = useSelector(state => state.auth);

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
		const onChange = () => {
			const width = Dimensions.get("window").width - 16 * 2;
			setDimensions(width);
		};
		const dimentionListener = Dimensions.addEventListener("change", onChange);
		return () => {
			dimentionListener.remove();
		};
	}, []);

	const getAllComments = async () => {
		try {
			const postRef = doc(firestore, "posts", postId);
			onSnapshot(collection(postRef, "comments"), snapshot => {
				setComments(snapshot.docs.map(doc => ({ ...doc.data() })));
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getAllComments();
	}, []);

	const createComment = async () => {
		const date = new Date().toLocaleDateString();
		const time = new Date().toLocaleTimeString();
		try {
			const postRef = doc(firestore, "posts", postId);
			await addDoc(collection(postRef, "comments"), {
				text,
				userName,
				date,
				time,
			});
			await updateDoc(postRef, { commentQty: commentQty + 1 });
		} catch (error) {
			console.log(error.message);
		}
	};

	const onCommentSend = async () => {
		if (text === "") {
			return alert("Пожалуйста оставьте комментарий");
		}
		createComment();
		Keyboard.dismiss();
		setText("");
	};

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={comments}
				style={{ backgroundColor: "#FFFFFF" }}
				ListHeaderComponent={
					<View style={{ width: dimensions }}>
						<Image style={{ ...styles.commentImage, width: dimensions }} source={{ uri: postPhoto }} />
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
							<Text style={styles.commentUserName}>{item.userName}</Text>
							<View
								style={{
									...styles.textWrapper,
									width: dimensions - 35,
								}}
							>
								<Text style={styles.commentText}>{item.text}</Text>
								<Text style={styles.commentDate}>
									{item.date} | {item.time.slice(0, 5)}
								</Text>
							</View>
						</View>
					);
				}}
				keyExtractor={(item, indx) => indx.toString()}
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
				<Pressable style={styles.sendButton} onPress={onCommentSend}>
					<Ionicons name="md-arrow-up-circle-sharp" size={34} color="#FF6C00" />
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		alignItems: "center",
	},

	commentImage: {
		height: 240,
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

	commentUserName: {
		height: 28,
		fontSize: 12,
		marginRight: 16,
		fontFamily: "Roboto-Regular",
		color: "#212121",
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
		paddingRight: 55,
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
