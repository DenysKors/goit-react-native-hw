// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {

// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);

// export const firestore = getFirestore(app);

import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
	// This is privat data, please contact developer to get current config!!!
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});

export const firestore = getFirestore(app);
