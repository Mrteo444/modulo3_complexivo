 import {StyleSheet} from "react-native";

 export const styles=StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        //alignItems:'center',
        paddingVertical:30,
        gap:15
    },
    text:{
        fontSize:25,
        fontWeight:"bold",
        textAlign:"center"
    },

    botton:{
        gap:25

    },
    message:{
       backgroundColor:'#7a0808',
        width:'120%'
    },
    textRedicte:{
        fontSize:15,
        fontWeight:"bold",
        textAlign:"center",
        color:"#705aa9"
    },
    homeheard:{
        flex:1,
        marginHorizontal:15,
        marginVertical:70,

    },
    bienvenida:{
        fontSize:20,
        flexDirection:'row',
        gap:15,
        alignItems:"center"

    },
    iconPefil:{
        alignItems:'flex-end',
        flex:1

    },
    modela2:{
        
     
        padding:20,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal:20,
      
        //alignItems: 'center',
        shadowColor: '#000',
        gap:15
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
      },

      headListProduct:{
        flexDirection:'row',
        padding:10,
        alignItems:'center',
        gap:15,
      }

 })