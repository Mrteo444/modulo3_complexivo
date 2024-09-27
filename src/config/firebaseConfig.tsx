import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";
// Configuración de Firebase (asegúrate de tener tus credenciales correctas)
const firebaseConfig = {
  apiKey: "AIzaSyDnbfAHpWmfj3Hd-p_xWE-CpF_ZLaXSvJA",
  authDomain: "complexivo-aaa85.firebaseapp.com",
  projectId: "complexivo-aaa85",
  storageBucket: "complexivo-aaa85.appspot.com",
  messagingSenderId: "253746634982",
  appId: "1:253746634982:web:f96f35fc4ece45f1699b27",
  databaseURL:"https://complexivo-aaa85-default-rtdb.firebaseio.com/"
};

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inicializar Firebase Auth con persistencia de AsyncStorage
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };

export const dbRealTime = getDatabase(firebaseApp);
