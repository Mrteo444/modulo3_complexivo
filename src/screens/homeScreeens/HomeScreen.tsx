import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Avatar, IconButton, Portal, Modal, Divider, TextInput, FAB } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import firebase from '@firebase/auth';
import { updateProfile } from 'firebase/auth';
import { FlatList } from 'react-native-gesture-handler';
import ProductCardComponent from './components/ProductCardComponent';
import NewProductComponents from './components/NewProductComponents';

// Interface para el estado del usuario
interface FormUser {
  name: string;
  edad: number;

}

////////////////////// crud ////////////////

//interface - product 

interface Product {
  id: string;
  code: string;
  nombre: string;
  descripcion: string;
  price: number;
  stock: number;
}


export const HomeScreen = () => {
  ///////////////crud ////
  //hook useState : gestionar lista de pr 
  const [products, setproducts] = useState<Product[]>([])









  //////////////////////////////
  // Hook useState para el estado del usuario autenticado
  const [formUser, setFormUser] = useState<FormUser>({
    name: '',
    edad: 0,
  });
  //// hook usestate : capturar y modificar la data 
  const [userData, setuserData] = useState<firebase.User | null>(null)


  //hook useState mostral modal  de ususario 

  const [showModalProfile, setshowModalProfile] = useState<boolean>(false)


  /// hoook usestate modal de producto 

  const [showModalPorducts, setshowModalPorducts] = useState<boolean>(false)




  // useEffect para verificar el estado de autenticación/ obtener informacio 
  useEffect(() => {
    setuserData(auth.currentUser);
    setFormUser({
      name: auth.currentUser?.displayName ?? '',
      edad: 0,  // Aquí deberías obtener la edad del usuario si está disponible, por ahora he puesto 0 como valor predeterminado
    });

  }, []);


  //funcion: actualizar estado del formulario 
  const handleSetValues = (key: string, value: string | number) => {
    setFormUser({ ...formUser, [key]: value })

  }

  // Función para desloguearse
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Usuario deslogueado');
        setFormUser({ name: '', edad: 0 }); // Limpiar el estado del usuario
      })
      .catch((error) => {
        console.error('Error al desloguearse:', error);
      });
  };

  ///funcion : oactualizar la informacion de usuarios autenticado 
  const handleUpdateUser = async () => {

    try {
      await updateProfile(userData!,
        { displayName: formUser.name }
      );

    } catch (error) {
      console.log(error);


    }

    setshowModalProfile(false)

  }
  ///funciuion para cerra  modal 
  const modalclose = () => {



    setshowModalProfile(false)

  }






  return (
    <>
      <View style={styles.homeheard}>
        <View style={styles.bienvenida}>
          <Avatar.Icon size={45} icon="folder" />

          <View>
            <Text>Bienvenido</Text>

            <Text>{userData?.displayName}</Text>
            <Text>Edad: {formUser.edad}</Text>
          </View>
          <View>
            <IconButton
              icon="account-heart"
              size={30}
              onPress={() => setshowModalProfile(true)}
              style={styles.iconPefil}
            />
          </View>
        </View>


        <View>
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCardComponent />}
            keyExtractor={item => item.id}
          />
        </View>













        <Button mode="contained" onPress={handleLogout}  style={styles.logout}>
          Desloguearse
        </Button>
      </View>

      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modela2}>
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
            onChangeText={(value) => handleSetValues('name', value)}
          />
          <TextInput
            mode='outlined'
            label="edad"
            value={formUser.edad.toString()} // Convertir el número a string
            onChangeText={(value) => handleSetValues('edad', parseInt(value) || 0)} // Convertir el valor ingresado a número
          />
          <TextInput
            mode='outlined'
            label="correo"
            value={userData?.email!}
          />

          <Button mode='contained' onPress={handleUpdateUser}>Actualizar </Button>
        </Modal>

      </Portal>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setshowModalPorducts(true)}
      />

      <NewProductComponents showModalProduct={showModalPorducts} setShowModalPorducts={setshowModalPorducts} />



    </>
  );
};

export default HomeScreen;
