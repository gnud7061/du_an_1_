import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,Image, InteractionManager, TextInput, TouchableOpacity,Alert } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase ,ref,set } from 'firebase/database';



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



export default function ScreenRegister() {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [numberphone,setNumberphone] = useState('');
    const [address,setAddress] = useState('');
    const [imageAvatarDefault,setImageAvatarDefault] = useState('https://tse4.mm.bing.net/th?id=OIP.LGfXa5GoclkgmeZiARS1EQHaHd&pid=Api&P=0&h=180');

    // const imageAvatarDefault = require('./images/person.png');

    const register = () =>{
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            // Đăng ký thành công, bạn có thể tiến hành đẩy thông tin vào Firebase Realtime Database ở đây
    
            // Lấy UID của người dùng mới đăng ký
            const userUid = userCredential.user.uid;
    
            // Tạo một tham chiếu đến nút Firebase Realtime Database bạn muốn lưu thông tin người dùng
            // const database = getDatabase();
            // const userRef = database.ref('users/' + userUid);
    
            // // Lưu thông tin tài khoản, mật khẩu và số điện thoại vào Firebase Realtime Database
            // userRef.set({
            //     email: email,
            //     password: password,
            //     username: name,
            //     numberphone: numberphone,
            //     address:'',
            //     image:''
            // });

                    const db = getDatabase();
                    set(ref(db, 'users/' + userUid), {
                      idUser : userUid,  
                      email: email,
                      password: password,
                      username: name,
                      numberphone: numberphone,
                      address:address,
                      image: imageAvatarDefault  
                        })
    
            // Hiển thị thông báo đăng ký thành công
            Alert.alert('Đăng ký thành công');
          })
          .catch((error) => {
            // Xử lý lỗi nếu đăng ký thất bại
            console.error(error);
          });
    }

    return(
        <View style={styles.container}>
            <Image style={{width : 200, height:200}} source={require('./images/logo_app.png')}>
            </Image>
            <View style={styles.groupRegister}>
                <Text style={styles.textRegister}>Register</Text>
                <TextInput style={styles.textInputTK} placeholder='Email' onChangeText={(Text) => setEmail(Text)} />
                <TextInput style={styles.textInputMK} placeholder='Mật khẩu' onChangeText={(Text) => setPassword(Text)}/>
                <TextInput style={styles.textInputMK} placeholder='Họ và Tên' onChangeText={(Text) => setName(Text)}/>
                <TextInput style={styles.textInputMK} placeholder='Số điện thoại' onChangeText={(Text) => setNumberphone(Text)}/>
                <TextInput style={styles.textInputMK} placeholder='Địa chỉ' onChangeText={(Text) => setAddress(Text)}/>
            </View>
            <TouchableOpacity style={styles.btn_Register} onPress={
                // function writeUserData() {
                //     const db = getDatabase();
                //     set(ref(db, 'users/'), {
                //       email: email,
                //       password: password,
                //       username: name,
                //       numberphone: numberphone,
                //       address:'',
                //       image:''  
                //         }).then(
                            
                //         );
                //   }

                register
            }>
            <Text style={styles.text_Register}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        justifyContent:'center',
        alignItems:'center'
    },
    textRegister:{
        textAlign:'center',
        fontSize:64,
        fontStyle:'normal',
        fontWeight:'500',
        position:'absolute',
        top:-50,
        left:10,
    },
    groupRegister:{
        display:'flex',
        width : 323,
        height:370,
        borderWidth : 1 ,
        borderColor : 'rgba(0, 0, 0, 0.15)',
        backgroundColor :'#FFF',
        borderRadius : 20,
        justifyContent:'center',
        alignItems:'center',
        position:'relative'
    },
    textInputTK:{
        width:294,
        height:40,
        flexShrink:0,
        borderWidth:2,
        borderRadius:10 ,
        borderColor:'rgba(0, 0, 0, 0.30)',
        backgroundColor:'#FFF'
    },
    textInputMK:{
        width:294,
        height:40,
        flexShrink:0,
        borderWidth:2,
        borderRadius:10 ,
        borderColor:'rgba(0, 0, 0, 0.30)',
        backgroundColor:'#FFF',
        marginTop : 30
    },
    btn_Register:{
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
    text_Register:{
        fontSize:16,
        fontWeight:'500',
    },
});