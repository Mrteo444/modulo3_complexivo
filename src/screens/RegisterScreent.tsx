import React, { useState } from 'react'
import { View } from 'react-native'
import { Text,TextInput,Button,Snackbar } from 'react-native-paper'
import { styles } from '../theme/styles'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import LoginScreent from './LoginScreent';
import { CommonActions, useNavigation } from '@react-navigation/native';

///interface 

interface FormRegister{
    email:string;
    password:string;
}

///interfase 

interface ShowMessege{
    visible:boolean;
    message:string;
    color:string;
}

const RegisterScreent = () => {

  //hook de navegacion de scheeen 

  const navigation = useNavigation();

    //hok use state 
    const [formaRegister, setformaRegister] = useState<FormRegister>({
        email:"",
        password:""
    });

    ///hook usestate  cambiar el estado de l mensaje 

    const [showMessege, setshowMessege] = useState<ShowMessege>({
        visible:false,
        message:'',
        color:'#fff'
    });


    //hook usestate : permite que la contraseña se vea 
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);



    //funcion actualizar estado formulario 

    const handleSetValues =(Key:string,value:string)=>{
        setformaRegister({...formaRegister,[Key]:value})

    }

    //funcion: regiustar a nuevio ususario 
    const handleRegister = async ()=>{
        if(!formaRegister.email || !formaRegister.password){      ///valida que los campos este lleno 
           setshowMessege({
            visible:true,
            message:'Por favor llenar todos los campos',
            color:'#f00'
           });
           return
        }
      
        console.log(formaRegister)

        try{

        const response= await createUserWithEmailAndPassword(
            auth,
            formaRegister.email,
            formaRegister.password
        );
        setshowMessege({
            visible :true,
            message:'Usuario creado con exito',
            color:'#085f06'

        });
    }
    catch(e){
        console.log(e);
        setshowMessege({
            visible :true,
            message:'No se logro ',
            color:'#085f06'

        })
    }
    }

  return (
    <View style={styles.root}>
  <Text style={styles.text}>Registrate</Text>
  <TextInput
      label="Email o correo"
      mode="outlined"
      placeholder='Correo '
      onChangeText={(value)=>handleSetValues('email',value)}
      
    />
    <TextInput
  mode="outlined"
  label="Ingrese"
  placeholder="Contraseña"
  secureTextEntry={hiddenPassword} // Aquí conectas el estado para ocultar/mostrar
  onChangeText={(value) => handleSetValues('password', value)}
  right={<TextInput.Icon icon={hiddenPassword ? "eye" : "eye-off"} onPress={() => setHiddenPassword(!hiddenPassword)} />}
/>
    <Button style={styles.botton} icon="heart" mode="contained" onPress={(handleRegister)}>
    Registrate
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
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}>
                tienes una cuenta ---- Login ------
            </Text>




  </View>
  )
}

export default RegisterScreent
