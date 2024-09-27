import React, { useState } from 'react'
import { Divider, IconButton, Modal, Portal } from 'react-native-paper'
import { Text, TextInput, Button, Snackbar } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { View } from 'react-native';
import { dbRealTime } from '../../../config/firebaseConfig';
import { push, ref, set } from 'firebase/database';


/// interface -prpos 

interface Props {
    showModalProduct: boolean;
    setShowModalPorducts: Function;
}

///interface - FOrmulaProduct 
interface FormProduct {

    code: string;
    nombre: string;
    descripcion: string;
    price: number;
    stock: number;
}



const NewProductComponents = ({ showModalProduct, setShowModalPorducts }: Props) => {
    //hoop useState  cambiar el estao del formulario 
    const [formProduct, setformProduct] = useState<FormProduct>({
        code: '',
        nombre: '',
        descripcion: '',
        price: 0,
        stock: 0,

    })
    ////funcion actualizar estado 
    const handleSetValues = (key: string, value: string) => {
        setformProduct({ ...formProduct, [key]: value })
    }

    ///funcio agregar productos 

    const hadleSaveProduct = async () => {
        if (!formProduct.code || !formProduct.descripcion || !formProduct.nombre || !formProduct.price || !formProduct.stock) {
            setshowMessege({
                visible: true,
                message: 'producto ingresado   ',
                color: 'error',
            })
            return;

        }


        //1crear el path base de datos 
        const dbRef = ref(dbRealTime, 'products');
        //2 Crear una coleccion que agrege fatos al dbref 
        const saveProducts = push(dbRef);
        // 3 ALAMCENAR LOS DATOS 
        try {
            await set(saveProducts, formProduct)
            setShowModalPorducts(false);
            
        } catch (error) {
            console.log(error);
            setshowMessege({
                visible: true,
                message: 'producto no  ingresado   ',
                color: 'error',
            })

        }






    }
    ///////////////
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
        <>
            <Portal>
                <Modal visible={showModalProduct} contentContainerStyle={styles.modela2}>
                    <Text style={styles.text}>New Product</Text>
                    <IconButton icon="close-circle-outline" onPress={() => setShowModalPorducts(false)} style={styles.closeIcon} />
                    <Divider></Divider>
                    <TextInput
                        label="Codigo"
                        //   value={text}
                        onChangeText={(value) => handleSetValues('code', value)}
                    />

                    <TextInput
                        label="Nombre"
                        //   value={text}
                        onChangeText={(value) => handleSetValues('nombre', value)}
                    />
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TextInput
                            label="Precio"
                            keyboardType='numeric'
                            style={{ width: '49%' }}
                            //   value={text}
                            onChangeText={(value) => handleSetValues('price', value)}
                        />
                        <TextInput
                            label="Stock"
                            keyboardType='numeric'
                            style={{ width: '49%' }}
                            //   value={text}
                            onChangeText={(value) => handleSetValues('stock', value)}
                        />
                    </View>
                    <TextInput
                        label="Descripcion"
                        //   value={text}
                        onChangeText={(value) => handleSetValues('descripcion', value)}
                    />
                    <Divider></Divider>
                    <Button mode='contained' onPress={hadleSaveProduct}>Agregar Productos </Button>

                </Modal>
            </Portal>

            <Snackbar
                style={{ ...styles.message, backgroundColor: showMessege.color }}
                visible={showMessege.visible}
                onDismiss={() => setshowMessege({ ...showMessege, visible: false })}
            >
                <Text>Completa los campos</Text>
                <Text>{showMessege.message}</Text>
            </Snackbar>

        </>

    )
}

export default NewProductComponents
