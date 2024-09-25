import { createStackNavigator } from '@react-navigation/stack';
import LoginScreent from '../screens/LoginScreent';
import RegisterScreent from '../screens/RegisterScreent';
import HomeScreen from '../screens/homeScreeens/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

//INTERFACE - ROUTAS (STACKsCREEEN )

interface Routes{
    name:string;
    screen:()=> JSX.Element;
}
///arreglos - routas el susario no  este autenticado 
const routesNoAuth: Routes []=[
    {name:'Login', screen:LoginScreent},
    {name:'Registro', screen:RegisterScreent}
];


///arreglos - routas el susario   este autenticado 
const routesAuth: Routes []=[
    {name:'Home', screen:HomeScreen},
   
];




const Stack = createStackNavigator();

export const StackNavigator=()=> {

    //hook useState 

    const [isAuth, setisAuth] = useState<boolean>(false);

    //hook  useEffect  validado de estq de autentuicaciom 


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                console.log(user);
                setisAuth(true);
                
            }

        });
    },[]);





  return (
    <Stack.Navigator>
        {
            !isAuth? 
            routesNoAuth.map((item,index)=>(
                <Stack.Screen key={index} 
                name={item.name}
                 options={{headerShown:false}}
                  component={item.screen} />
            ))
            :
            routesAuth.map((item,index)=>(
                <Stack.Screen key={index} 
                name={item.name}
                 options={{headerShown:false}}
                  component={item.screen} />
            ))
        }
      {/* <Stack.Screen name="Registro" options={{headerShown:false}} component={RegisterScreent} /> */}
    
    </Stack.Navigator>
  );
}