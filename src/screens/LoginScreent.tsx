import React, { useState } from 'react'
import { View } from 'react-native'
import { Text, TextInput, Button, Snackbar } from 'react-native-paper'
import { styles } from '../theme/styles'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import RegisterScreent from './RegisterScreent';
import { CommonActions, useNavigation } from '@react-navigation/native';






///interface 

interface FormLogin {
    email: string;
    password: string;
}




const LoginScreent = () => {
    //hook de navegacion de scheeen 

    const navigation = useNavigation();


    //hook usetsate cambiar estqado de formulario 

    const [formLogin, setformLogin] = useState<FormLogin>({
        email: '',
        password: ''

    });

    //funcion actualizar estado formulario 

    const handleSetValues = (Key: string, value: string) => {
        setformLogin({ ...formLogin, [Key]: value })

    }
    //hook usestate : permite que la contraseña se vea 
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    //iniciar session con unusri 

    const handleSingnIn = async () => {
        //valido campos se encuntren  llenos 
        if (!formLogin.email || !formLogin.password) {
            setshowMessege({
                visible: true,
                message: 'datos incorrectos',
                color: '#7a0808'
            })
        }
        console.log(formLogin);
        try {

            const response = await signInWithEmailAndPassword(
                auth,
                formLogin.email,
                formLogin.password
            );
            console.log(response);
        } catch (e) {
            console.log(e);
            setshowMessege({
                visible: true,
                message: 'datos incorrectos',
                color: '#7a0808'
            })
        }

    }


    ///interfase  de snackbar

    interface ShowMessege {
        visible: boolean;
        message: string;
        color: string;
    }

    ///hook usestate  cambiar el estado de l mensaje 

    const [showMessege, setshowMessege] = useState<ShowMessege>({
        visible: false,
        message: '',
        color: '#fff'
    });









    return (
        <View style={styles.root}>
            <Text style={styles.text}>Inicio</Text>
            <TextInput
                label="Email o correo"
                mode="outlined"
                placeholder='Correo '
                onChangeText={(value) => handleSetValues('email', value)}

            />
            <TextInput
                mode="outlined"
                label="Ingrese"
                placeholder="Contraseña"
                secureTextEntry={hiddenPassword} // Aquí conectas el estado para ocultar/mostrar
                onChangeText={(value) => handleSetValues('password', value)}
                right={<TextInput.Icon icon={hiddenPassword ? "eye" : "eye-off"} onPress={() => setHiddenPassword(!hiddenPassword)} />}
            />
            <Button style={styles.botton} icon="heart" mode="contained" onPress={(handleSingnIn)}>
                Entrar
            </Button>


            <Snackbar
                style={{ ...styles.message, backgroundColor: showMessege.color }}
                visible={showMessege.visible}
                onDismiss={() => setshowMessege({ ...showMessege, visible: false })}
            >
                <Text>Completa los campos</Text>
                <Text>{showMessege.message}</Text>
            </Snackbar>

            <Text
                style={styles.textRedicte}
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Registro' }))}>
                No tienes una cuenta ---- Registrate ------
            </Text>

        </View>
    )
}

export default LoginScreent
