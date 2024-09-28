import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Avatar, IconButton, Portal, Modal, Divider, TextInput, FAB } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, dbRealTime } from '../../config/firebaseConfig';
import firebase from '@firebase/auth';
import { updateProfile } from 'firebase/auth';
import { FlatList } from 'react-native-gesture-handler';
import ProductCardComponent from './components/ProductCardComponent';
import NewProductComponents from './components/NewProductComponents';
import { onValue, ref } from 'firebase/database';

// Interface para el estado del usuario
interface FormUser {
  name: string;
  edad: number;
}

// Interface para el producto
 export interface Product {
  id: string;
  code: string;
  nombre: string;
  descripcion: string;
  price: number;
  stock: number;
}

export const HomeScreen = () => {
  // Hook useState: gestionar lista de productos
  const [products, setProducts] = useState<Product[]>([]);

  // Hook useState para el estado del usuario autenticado
  const [formUser, setFormUser] = useState<FormUser>({
    name: '',
    edad: 0,
  });

  // Hook useState: capturar y modificar la data del usuario
  const [userData, setUserData] = useState<firebase.User | null>(null);

  // Hook useState para mostrar modal de usuario
  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);

  // Hook useState para mostrar modal de productos
  const [showModalProducts, setShowModalProducts] = useState<boolean>(false);

  // useEffect para verificar el estado de autenticación
  useEffect(() => {
    setUserData(auth.currentUser);
    setFormUser({
      name: auth.currentUser?.displayName ?? '',
      edad: 0, // Aquí deberías obtener la edad del usuario si está disponible

      //llamar los prodcutos 
      
    });
    getAllProducts();
  }, []);

  // Función para actualizar el estado del formulario
  const handleSetValues = (key: string, value: string | number) => {
    setFormUser({ ...formUser, [key]: value });
  };

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

  // Función para actualizar la información del usuario autenticado
  const handleUpdateUser = async () => {
    try {
      await updateProfile(userData!, { displayName: formUser.name });
    } catch (error) {
      console.log(error);
    }
    setShowModalProfile(false);
  };

  // Función para cerrar el modal de usuario
  const modalClose = () => {
    setShowModalProfile(false);
  };

  // Función para obtener la lista de productos
  const getAllProducts = () => {
    // 1. Dirección a la tabla de base de datos
    const dbRef = ref(dbRealTime, 'products');
    
    // 2. Acceder a la data
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const getKeys = Object.keys(data);
      const listProduct: Product[] = [];

      // 3. Recorrer las keys para acceder a cada producto
      getKeys.forEach((key) => {
        const value = { ...data[key], id: key };
        listProduct.push(value);
      });

      // 4. Actualizar la data del hook useState
      setProducts(listProduct);
    });
  };

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
              onPress={() => setShowModalProfile(true)}
              style={styles.iconPefil}
            />
          </View>
        </View>

        <View>
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCardComponent product={item}/>}
            keyExtractor={item => item.id}
          />
        </View>

        <Button mode="contained" onPress={handleLogout} style={styles.logout}>
          Desloguearse
        </Button>
      </View>

      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modela2}>
          <IconButton
            icon="close"
            size={24}
            onPress={modalClose} // Cierra el modal al presionar la "X"
            style={styles.closeIcon}
          />
          <Text>Mi PERFIL.</Text>
          <Divider />
          <TextInput
            mode='outlined'
            label="Nombre"
            value={formUser.name}
            onChangeText={(value) => handleSetValues('name', value)}
          />
          <TextInput
            mode='outlined'
            label="Edad"
            value={formUser.edad.toString()} // Convertir el número a string
            onChangeText={(value) => handleSetValues('edad', parseInt(value) || 0)} // Convertir el valor ingresado a número
          />
          <TextInput
            mode='outlined'
            label="Correo"
            value={userData?.email!}
          />
          <Button mode='contained' onPress={handleUpdateUser}>Actualizar</Button>
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowModalProducts(true)}
      />

      <NewProductComponents
        showModalProduct={showModalProducts}
        setShowModalPorducts={setShowModalProducts}
      />
    </>
  );
};

export default HomeScreen;
