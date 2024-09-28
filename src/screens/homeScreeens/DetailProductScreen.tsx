import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Product } from './HomeScreen'
import { dbRealTime } from '../../config/firebaseConfig'
import { ref, remove, update } from 'firebase/database'
//import { TextInput } from 'react-native-gesture-handler'

const DetailProductScreen = () => {
    //hook usRoute: acceder ala informacio nde navegacio n

    const route = useRoute();

    //@ts-ignore
    const { product } = route.params;

    /// hook use navigation 
    const navigation=useNavigation();

    ///hook usetate 

    const [formEdit, setformEdit] = useState<Product>({
        id: '',
        code: '',
        nombre: '',
        descripcion: '',
        price: 0,
        stock: 0,

    })

    //hook useEfeect  cargar y mostrar la data en el formulario 

    useEffect(() => {
        setformEdit(product);
    
    },[])


    ///funcion:actualizar los datos capturados desde el formulario 

    const handleSetValues=(key:string,value:string)=>{
        setformEdit({...formEdit,[key]:value})

    }
    ///funcuoinactualizar las data del formulario actualizar 
    const handleUpdateProduct = async()=>{
        //console.log(formEdit);
        ///1 direccionar alatabla en la base 

        const dbRef=ref(dbRealTime,'products/' + formEdit.id)
        //2 acrualizar datos selecionado 

        try{
        await update(dbRef,{
            code:formEdit.code,
            nombre:formEdit.nombre,
            price:formEdit.price,
            stock:formEdit.stock,
            descripcion:formEdit.descripcion,

        });
          /// regresar alanterios iscremm 
          navigation.goBack();
    }catch(e){
        console.log(e);
        
    }
      
        
    }

    //// funcion borrrar  producto 
    const handleDeleteProduct = async () => {
        const dbRef = ref(dbRealTime, 'products/' + formEdit.id); // Dirección del producto en la base de datos
        try {
            await remove(dbRef);  // Eliminar el producto de Firebase
            navigation.goBack();  // Regresar a la pantalla anterior
        } catch (e) {
            console.log(e);  // Manejar errores si los hay
        }
    };

    




    return (
        <View style={styles.rootDetail}>
            <Text>Detail Product Screen</Text>
            <Divider></Divider>
           
            <View>
                <Text >Codigo:</Text>
            <TextInput
                    mode='outlined'
                    onChangeText={(value)=>handleSetValues('code',value)}
                    label={formEdit.code}
                //value={userData?.email!}
                />
                <Text >Nombre:</Text>


                <TextInput
                    mode='outlined'
                    onChangeText={(value)=>handleSetValues('nombre',value)}
                    label={formEdit.nombre}
                //value={userData?.email!}
                />
                <Text >Precio:</Text>

                <TextInput
                    mode='outlined'
                    onChangeText={(value)=>handleSetValues('price',value)}
                    label={formEdit.price.toString()}
                //value={userData?.email!}
                />
                <Text >stock:</Text>

                <TextInput
                    mode='outlined'
                    onChangeText={(value)=>handleSetValues('stock',value)}
                    label={formEdit.stock.toString()}
                //value={userData?.email!}
                />
                <Text >Descrip:</Text>

                <TextInput
                    mode='outlined'
                    onChangeText={(value)=>handleSetValues('descripcion',value)}
                    label={formEdit.descripcion}
                //value={userData?.email!}
                />



            </View>

            <Button mode='contained-tonal' onPress={handleUpdateProduct}> Actualizar </Button>
            <Button mode='contained-tonal' onPress={handleDeleteProduct}> Eliminar </Button>


        </View>
    )
}

export default DetailProductScreen
