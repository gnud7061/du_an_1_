import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, Svg, Path, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenWelcome from './ScreenWelcome';
import ScreenLogin from './ScreenLogin';
import ScreenRegister from './ScreenRegister'
import ManageBottom from './ManageBottom';
import ScreenDetailTK from './ScreenDetailTK';

import ScreenCatregory from './ScreenCatregory';

import ScreenBookDetail from './ScreenBookDetail';
import ScreenBook from './ScreenBook';

import ScreenPost from './ScreenPost';
import ScreenHome from './ScreenHome';

import ScreenPageUser from './ScreenPageUser';
import { UserProvider } from './userContext';
import ScreenChatDetails from './ScreenChatDetails';
import ScreenSearchResultsPost from './ScreenSearchResultsPost';
import ScreenUpdateAvt from './ScreenUpdateAvt';




export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ScreenWelcome">
          <Stack.Screen name="ScreenWelcome" component={ScreenWelcome} options={{ headerShown: false }} />
          <Stack.Screen name="ScreenLogin" component={ScreenLogin} options={{ headerShown: false }} />
          <Stack.Screen name="ScreenCategory" component={ScreenCatregory} options={{ headerShown: false }} />
          <Stack.Screen name="ScreenBookDetail" component={ScreenBookDetail} options={{ headerShown: true }} />
          <Stack.Screen name="ScreenBook" component={ScreenBook} options={{ headerShown: true }} />
          <Stack.Screen name="ScreenRegister" component={ScreenRegister} options={{ headerShown: false }} />
          <Stack.Screen name="ManageBottom" component={ManageBottom} options={{ headerShown: false }} />
          <Stack.Screen name="ScreenDetailTK" component={ScreenDetailTK} options={{ headerShown: false }} />
          <Stack.Screen name="ScreenPost" component={ScreenPost} options={{ headerShown: false }} />
          <Stack.Screen name="ScreenHome" component={ScreenHome} options={{ headerShown: false }} />
          <Stack.Screen name="ScreenPageUser" component={ScreenPageUser} options={{ headerShown: false }} />
          <Stack.Screen name="ScreenChatDetails" component={ScreenChatDetails} options={{ headerShown: false }} />
          <Stack.Screen name="ScreenSearchResultsPost" component={ScreenSearchResultsPost} options={{ headerShown: false }} />
          <Stack.Screen 
          name="ScreenUpdateAvartar" 
          component={ScreenUpdateAvt} 
          options={{
            title: "Update Avatar",
            headerShown: true,
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

});
