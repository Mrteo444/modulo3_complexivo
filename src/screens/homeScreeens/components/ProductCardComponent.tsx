import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { Product } from '../HomeScreen'
import { CommonActions, useNavigation } from '@react-navigation/native'



/// interface 

interface Props{
    product : Product;
    
}

export const ProductCardComponent = ({product}:Props) => {
    //hook useNavigation :  naverga de screen a otro 

    const navigation = useNavigation();



    return (
        <View style={styles.headListProduct}>
            <View>
                <Text>nombre:{product.nombre}</Text>
                <Text>Precio:{product.price}</Text>
                <Text>Descripcion:{product.descripcion}</Text>
            </View>
            <View>
                <IconButton
                    icon="camera"
                    size={24}
                    
                    onPress={() => navigation.dispatch(CommonActions.navigate({name:'Detail',params:{product}}))}
                />
            </View>

        </View>
    )
}

export default ProductCardComponent
