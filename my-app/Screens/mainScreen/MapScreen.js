import React from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

export const MapScreen = ({ route }) => {
	const { latitude, longitude } = route.params;
	return (
		<View style={styles.container}>
			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude,
					longitude,
					latitudeDelta: 0.001,
					longitudeDelta: 0.006,
				}}
			>
				<Marker coordinate={{ latitude, longitude }} title="inspiring view" />
			</MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
