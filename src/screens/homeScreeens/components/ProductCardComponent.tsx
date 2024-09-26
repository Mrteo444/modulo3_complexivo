import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'

export const ProductCardComponent = () => {
    return (
        <View style={styles.headListProduct}>
            <View>
                <Text>nombre</Text>
                <Text>Precio:</Text>
                <Text>Descripcion:</Text>
            </View>
            <View>
                <IconButton
                    icon="camera"
                    size={24}
                    
                    onPress={() => console.log('Pressed')}
                />
            </View>

        </View>
    )
}

export default ProductCardComponent
