import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, InteractionManager, TextInput, TouchableOpacity,Alert } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase ,ref,set,get,child } from 'firebase/database';

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from './userContext';




const firebaseConfig = {
    apiKey: "AIzaSyB2-QE5OBrXNuiOzvN8sA_1YPLiC5OMj7s",
    authDomain: "appreadbook-e7ad0.firebaseapp.com",
    databaseURL: "https://appreadbook-e7ad0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "appreadbook-e7ad0",
    storageBucket: "appreadbook-e7ad0.appspot.com",
    messagingSenderId: "291503301889",
    appId: "1:291503301889:web:8dcb07cb95b2db280ea700",
    measurementId: "G-3D3NGQLCBY",
    databaseURL:'https://appreadbook-e7ad0-default-rtdb.asia-southeast1.firebasedatabase.app/'
  };

 
export default function SreenLogin({navigation}) {

    const {setUserData} = User();


    const [imageUri, setImageUri] = useState('https://tse4.mm.bing.net/th?id=OIP.xmVxNq0K9FT8Tr_8IoaV7QHaHX&pid=Api&P=0&h=180');
    const changeImage = () => {
        if(imageUri ==='https://tse4.mm.bing.net/th?id=OIP.xmVxNq0K9FT8Tr_8IoaV7QHaHX&pid=Api&P=0&h=180'){
        setImageUri('https://tse4.mm.bing.net/th?id=OIP.5uhrI500H_WMuD_g0wiYtgHaFd&pid=Api&P=0&h=180');
      
    
      }else{
        setImageUri('https://tse4.mm.bing.net/th?id=OIP.xmVxNq0K9FT8Tr_8IoaV7QHaHX&pid=Api&P=0&h=180');
      }
      };

      

    

   


    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    async function saveData(email, password) {
        if(imageUri !=='https://tse4.mm.bing.net/th?id=OIP.5uhrI500H_WMuD_g0wiYtgHaFd&pid=Api&P=0&h=180'){
        try {
          await AsyncStorage.setItem('username', email);
          await AsyncStorage.setItem('pass', password);
          await AsyncStorage.setItem('img', 'https://tse4.mm.bing.net/th?id=OIP.5uhrI500H_WMuD_g0wiYtgHaFd&pid=Api&P=0&h=180');
          await AsyncStorage.setItem('luu', "1");
        
          console.log("Lưu Thành Công");
        } catch (error) {
          console.log(error);
        }
      }else{
        console.log("Không Lưu ");
        await AsyncStorage.setItem('luu', "0");
        
        await AsyncStorage.setItem('img', 'https://tse4.mm.bing.net/th?id=OIP.xmVxNq0K9FT8Tr_8IoaV7QHaHX&pid=Api&P=0&h=180');
    
      }
    };

    async function getData() {
        const luu = await AsyncStorage.getItem('luu');
        console.log('luu:', luu);
      if(luu==="1"){
        try {
          const username = await AsyncStorage.getItem('username');
          const account = await AsyncStorage.getItem('pass');
          const img = await AsyncStorage.getItem('img');
          
          setEmail(username);
          setPassword(account);
          setImageUri(img);
          console.log('Username:', username);
          console.log('pass:', account);
        } catch (error) {
          console.log(error);
        }
       
      }else{
      
      }
      };

      useEffect(()=>{

        getData();

      },[])

    const handleLogin = () =>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Đăng nhập thành công, bạn có thể lấy dữ liệu từ Firebase Realtime Database
            const user = userCredential.user;
    
            // Lấy dữ liệu người dùng từ cơ sở dữ liệu

            
            // firebase
            //   .database()
            //   .ref('users/' + user.uid)
            //   .once('value')
            //   .then((snapshot) => {
            //     const userData = snapshot.val();
    
            //     // Chuyển đến trang profile và chuyển dữ liệu người dùng
            //     navigation.navigate('ManageBottom', { user: userData });
            //   });

            const dbRef = ref(getDatabase());
            get(child(dbRef, `users/` + user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();

                Alert.alert('Đăng nhập  thành công');
                setUserData(userData);
                console.log(setUserData);
                // Chuyển đến trang Chủ và chuyển dữ liệu người dùng
                navigation.navigate('ManageBottom',);
              
                } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            console.log('không thành công');

            });
        })
    }


    return (
      <View style={styles.container}>
        <Image style={{width : 200, height:200}} source={require('./images/logo_app.png')}>
        </Image>
        
        <View style={styles.groupLogin}>
        <Text style={styles.textLogin}>Login</Text>
            <TextInput defaultValue={email} style={styles.textInputTK} placeholder='Email' onChangeText={(Text) => setEmail(Text)}/>
            <TextInput defaultValue={password} secureTextEntry={true} style={styles.textInputMK} placeholder='Password' onChangeText={(Text) => setPassword(Text)}/>
            <TouchableOpacity style={{marginTop:10}} onPress={()=>{changeImage();saveData(email,password)}}><Image 
             source={{ uri: imageUri }}
             style={{ width: 20, height: 20 ,borderRadius:10,marginLeft:40}}
            /></TouchableOpacity>
               <Text  style = {{color:'blue',marginTop:-20,marginLeft:170}}>Remember Me ?</Text>
        </View>
        <TouchableOpacity style={styles.btn_login} onPress={handleLogin}>
            <Text style={styles.text_btnLogin}>Login</Text>
        </TouchableOpacity>
        <Text style={{ marginTop:10}}>Don't Have An Acount</Text>
        <TouchableOpacity style={styles.btn_register} onPress={() => navigation.navigate('ScreenRegister')}>
            <Text style={styles.text_btnRegister}>Register</Text>
        </TouchableOpacity>
        <Text style = {{marginTop:20,marginLeft:0,color:'grey'}}>Or Login With </Text>
        <View style = {styles.mangxh}>
        <TouchableOpacity style = {{}}>
            <Image
                 source={{ uri: 'https://tse1.mm.bing.net/th?id=OIP.bGPD-oClhpU4utiky9MnxgHaHa&pid=Api&P=0&h=180' }}
                 style={{ width: 50, height: 50 ,borderRadius:10}}
            />
        </TouchableOpacity>
        <TouchableOpacity>
            <Image
                 source={{ uri: 'https://tse3.mm.bing.net/th?id=OIP.jpQFunOi7r3t9JaTNLFXQgHaHa&pid=Api&P=0&h=180' }}
                 style={{ width: 50, height: 50,borderRadius:10 ,marginLeft:50}}
            />
        </TouchableOpacity>
        <TouchableOpacity>
            <Image
                 source={{ uri: 'https://tse1.mm.bing.net/th?id=OIP.lQRk_LuIIh-6LXK9jplxGAHaHZ&pid=Api&P=0&h=180' }}
                 style={{ width: 50, height: 50 ,borderRadius:10,marginLeft:50}}
            />
        </TouchableOpacity>
        </View>
        
        
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    mangxh :{
        marginTop:20,
        flexDirection:'row',
        paddingLeft:0            
    },
    container:{
        flex : 1,
        justifyContent:'center',
        alignItems:'center'
    }
    ,
    imagesLogo :{
        width: 252,
        height: 134,
        flex_shrink: 0,
    },
    textLogin:{
        textAlign:'center',
        fontSize:64,
        fontStyle:'normal',
        fontWeight:'500',
        position:'absolute',
        top:-50,
        left:10,
    },
    groupLogin:{
        display:'flex',
        width : 323,
        height:200,
        borderWidth : 1 ,
        borderColor : 'rgba(0, 0, 0, 0.15)',
        backgroundColor :'#FFF',
        borderRadius : 20,
        justifyContent:'center',
        alignItems:'center',
        position:'relative'
    },
    textInputTK:{
        paddingLeft:10,
        width:294,
        height:40,
        flexShrink:0,
        borderWidth:2,
        borderRadius:10 ,
        borderColor:'rgba(0, 0, 0, 0.30)',
        backgroundColor:'#FFF'
    },
    textInputMK:{
        paddingLeft:10,
        width:294,
        height:40,
        flexShrink:0,
        borderWidth:2,
        borderRadius:10 ,
        borderColor:'rgba(0, 0, 0, 0.30)',
        backgroundColor:'#FFF',
        marginTop : 30
    },
    btn_login:{
        width:150,
        height:42,
        flexShrink:0,
        borderWidth:1.5,
        borderColor:'#000',
        backgroundColor:'#FFF',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    text_btnLogin:{
        fontSize:16,
        fontWeight:'500',
    },
    btn_register:{
        width:150,
        height:42,
        flexShrink:0,
        borderWidth:1,
        borderColor:'#000',
        backgroundColor:'#000',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:15,
    },text_btnRegister:{
        fontSize:16,
        fontWeight:'500',
        color:'#FFF'
    },

  });

//   () => navigation.navigate('ManageBottom')
  