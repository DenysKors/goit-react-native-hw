import { View, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PostsScreen } from "../Screens/mainScreen/PostsScreen";
import { CreatePostsScreen } from "../Screens/mainScreen/CreateScreen";
import { ProfileScreen } from "../Screens/mainScreen/ProfileScreen";

import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

export const TabRoute = ({ navigation }) => {
	return (
		<MainTab.Navigator
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					height: 80,
					display: "flex",
				},
				headerTitleAlign: "center",
				headerRightContainerStyle: { paddingRight: 16 },
				headerLeftContainerStyle: { paddingLeft: 16 },
			}}
		>
			<MainTab.Screen
				options={{
					tabBarIcon: ({ focused, size, color }) => <SimpleLineIcons name="grid" size={24} color={color} />,
					headerRight: ({ focused, size, color }) => (
						<TouchableOpacity activeOpacity={0.8}>
							<MaterialIcons name="logout" size={24} color="#BDBDBD" />
						</TouchableOpacity>
					),
				}}
				name="Публикации"
				component={PostsScreen}
			/>
			<MainTab.Screen
				options={{
					// tabBarStyle: { display: "none" },
					tabBarIcon: ({ focused, size, color }) => (
						<View
							style={{
								height: 40,
								width: 70,
								backgroundColor: "#FF6C00",
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 20,
							}}
							activeOpacity={0.8}
						>
							<AntDesign name="plus" size={16} color="#FFFFFF" />
						</View>
					),
					headerLeft: ({ focused, size, color }) => (
						<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
							<AntDesign name="arrowleft" size={24} color="#212121" />
						</TouchableOpacity>
					),
				}}
				name="Создать публикацию"
				component={CreatePostsScreen}
			/>
			<MainTab.Screen
				options={{
					headerShown: false,
					tabBarIcon: ({ focused, size, color }) => <Feather name="user" size={24} color={color} />,
				}}
				name="Профиль"
				component={ProfileScreen}
			/>
		</MainTab.Navigator>
	);
};
