import { StyleSheet, Text, View,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenHome from './ScreenHome';
import ScreenChat from './ScreenChat';
import ScreenNotification from './ScreenNotification';
import ScreenBook from './ScreenBook';
import ScreenProfile from './ScreenProfile'
import ScreenCatregory from './ScreenCatregory';
import ScreenPageUser from './ScreenPageUser';


export default function ManageBottom(){
    
const Tab = createMaterialBottomTabNavigator();

    return(
        <View style={styles.container}>
            <Tab.Navigator
                initialRouteName='ScreenHome'
                activeColor="#000"
                barStyle={{ backgroundColor: '#FFF' , }}
            >
                <Tab.Screen name='ScreenHome' component={ScreenHome} options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}/>
                <Tab.Screen
                    name="ScreenChat"
                    component={ScreenChat}
                    options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="message" color={color} size={26} />
                    ),
                    }}
                />
                <Tab.Screen
                    name="ScreenNotification"
                    component={ScreenNotification}
                    options={{
                    tabBarLabel: 'Thông báo',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={26} />
                    ),
                    }}
                />
                <Tab.Screen
                    name="ScreenBook"
                    component={ScreenCatregory}
                    options={{
                    tabBarLabel: 'Sách',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="book" color={color} size={26} />
                    ),
                    }}
                />
                <Tab.Screen
                    name="ScreenProfile"
                    component={ScreenProfile}
                    options={{
                    tabBarLabel: 'Hồ sơ',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                    }}
                />
            </Tab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        backgroundColor : 'red'
    }
});