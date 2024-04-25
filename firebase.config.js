import { initializeApp } from "firebase/app";

// Importando recursos da biblioteca de Autenticação
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyBB9SjS8cX1hR6NuDxAgpBCh4VScbEkJ1c",
    authDomain: "startrap-e38fa.firebaseapp.com",
    projectId: "startrap-e38fa",
    storageBucket: "startrap-e38fa.appspot.com",
    messagingSenderId: "193593167983",
    appId: "1:193593167983:web:0139adb1b1253f58673d9a"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});