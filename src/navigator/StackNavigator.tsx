import { createStackNavigator } from '@react-navigation/stack';
import LoginScreent from '../screens/LoginScreent';
import RegisterScreent from '../screens/RegisterScreent';
import HomeScreen from '../screens/homeScreeens/HomeScreen';

import React, { Fragment, useEffect, useState } from 'react'; // Importa React correctamente
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

// INTERFACE - RUTAS (STACKsCREEEN )
interface Routes {
    name: string;
    screen: () => JSX.Element;
}

// Arreglos - rutas cuando el usuario no esté autenticado
const routesNoAuth: Routes[] = [
    { name: 'Login', screen: LoginScreent },
    { name: 'Registro', screen: RegisterScreent }
];

// Arreglos - rutas cuando el usuario esté autenticado
const routesAuth: Routes[] = [
    { name: 'Home', screen: HomeScreen },

];

const Stack = createStackNavigator();

export const StackNavigator = () => {
    // hook useState: controla la carga inicial
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [isAuth, setisAuth] = useState<boolean>(false);

    // hook useEffect: validación del estado de autenticación
    useEffect(() => {
        setisLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                setisAuth(true);
            } else {
                setisAuth(false);
            }
            setisLoading(false); // Ocultar el activity indicator
        });

        // Cleanup function para el listener de Firebase
        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator animating={true} size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Stack.Navigator>
            {
                !isAuth
                    ? routesNoAuth.map((item, index) => (
                        <Stack.Screen
                            key={index}
                            name={item.name}
                            options={{ headerShown: false }}
                            component={item.screen}
                        />
                    ))
                    : routesAuth.map((item, index) => (
                        <Stack.Screen
                            key={index}
                            name={item.name}
                            options={{ headerShown: false }}
                            component={item.screen}
                        />
                    ))
            }
        </Stack.Navigator>
    );
};
