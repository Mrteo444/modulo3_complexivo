import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Avatar, IconButton, Portal, Modal, Divider, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import firebase from '@firebase/auth';
import { updateProfile } from 'firebase/auth';
import { FlatList } from 'react-native-gesture-handler';
import ProductCardComponent from './components/ProductCardComponent';

// Interface para el estado del usuario
interface FormUser {
  name: string;
}

////////////////////// crud ////////////////

  //interface - product 

  interface Product{
    id:string;
    code:string;
    nombre:string;
    descripcion:string;
    price:number;
    stock:number;
  }


export const HomeScreen = () => {
 ///////////////crud ////
 //hook useState : gestionar lista de pr 
 const [products, setproducts] = useState<Product[]>([])









  //////////////////////////////
  // Hook useState para el estado del usuario autenticado
  const [formUser, setFormUser] = useState<FormUser>({
    name: '',
  });
  //// hook usestate : capturar y modificar la data 
  const [userData, setuserData] = useState<firebase.User | null>(null)


  //hook useState mostral modal 

  const [showModal, setshowModal] = useState<boolean>(false )




  // useEffect para verificar el estado de autenticación/ obtener informacio 
  useEffect(() => {
    setuserData(auth.currentUser);
    setFormUser({name:auth.currentUser?.displayName ?? ''})
    
  }, []);


  //funcion: actualizar estado del formulario 
  const handleSetValues=(key:string,value:string)=>{
    setFormUser({...formUser,[key]:value})

  }

  // Función para desloguearse
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Usuario deslogueado');
        setFormUser({ name: '' }); // Limpiar el estado del usuario
      })
      .catch((error) => {
        console.error('Error al desloguearse:', error);
      });
  };

  ///funcion : oactualizar la informacion de usuarios autenticado 
  const handleUpdateUser =  async() => {

    try {
      await updateProfile(userData!,
        {displayName:formUser.name}
      );
      
    } catch (error) {
      console.log(error);
      
      
    }
    
    setshowModal(false)

  }
  ///funciuion para cerra  modal 
  const modalclose =  () => {

   
    
    setshowModal(false)

  }

  




  return (
    <>
    <View style={styles.homeheard}>
      <View style={styles.bienvenida}>
        <Avatar.Icon size={45} icon="folder" />

        <View>
          <Text>Bienvenido</Text>
        
          <Text>{userData?.displayName}</Text>
        </View>
        <View>
        <IconButton
          icon="account-heart"
          size={30}
          onPress={() => setshowModal(true)}
          style={styles.iconPefil}
        />
      </View>
      </View>


      <View>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductCardComponent  />}
        keyExtractor={item => item.id}
      />
      </View>


      










      <Button mode="contained" onPress={handleLogout}>
        Desloguearse
      </Button>
    </View>

    <Portal>
        <Modal visible={showModal}  contentContainerStyle={styles.modela2}>
        <IconButton
          icon="close"
          size={24}
          onPress={modalclose} // Cierra el modal al presionar la "X"
          style={styles.closeIcon}
        />
          <Text>mi PERFIL .</Text>
          <Divider></Divider>
          <TextInput
          mode='outlined'
          label="nombre"
          value={formUser.name}
          onChangeText={(value)=>handleSetValues('name',value)}
          />
          <TextInput
          mode='outlined'
          label="correo"
          value={userData?.email!}
          />
          
          <Button mode='contained' onPress={handleUpdateUser}>Actualizar </Button>
        </Modal>
        
      </Portal>



    </>
  );
};

export default HomeScreen;
