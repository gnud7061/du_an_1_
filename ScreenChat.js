import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, ScrollView , FlatList, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart ,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { initializeApp } from "firebase/app";
import { getDatabase ,ref,set,get,child,onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
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


export default function SreenChat({navigation}){
    const {userData} = User();


    const [data,setDataUserChat] = useState();

    const app = initializeApp(firebaseConfig);


    // console.log(userData);
    const UserCurrent =  userData;
    


    useEffect( () =>{
        const db = getDatabase();
        const dbRef = ref(db,`users/`);
        // const dataArray = [];
        // onValue(dbRef, (snapshot) => {
        //     snapshot.forEach((childSnapshot) => {
        //         const childKey = childSnapshot.key;
        //         const childData = childSnapshot.val();

                
        //         console.log(data);
        //         });
        //     }, {
        //     onlyOnce: true
        //     });



        onValue(dbRef, (snapshot) => {
            const usersData = snapshot.val();
            if (usersData) {
              // Lọc danh sách người dùng, loại bỏ người dùng hiện đang đăng nhập
              const filteredUsers = Object.keys(usersData)
                .filter(idUser => idUser !== UserCurrent.idUser)
                .map(idUser => usersData[idUser]);
                // console.log(filteredUsers);
      
              setDataUserChat(filteredUsers);

            }
          });
      
          // Ngắt kết nối khi component unmount
        //   return () => {
        //     dbRef.off();
        //   };
    },[UserCurrent])
    return(
        <View style={styles.container}>
           <View style={styles.headerChat}>
                <View></View>
                <Text style={{ fontSize : 25 , fontWeight : 'bold'}}>Chat</Text>
                <FontAwesomeIcon icon={faMagnifyingGlass} size={24} style={{ marginRight : 10}}/>
           </View>
           {/* <View style={styles.itemUserDetails}>
                <FlatList horizontal={true} data={data} renderItem={({item}) =>{
                        return(
                            <View style ={{width : 120 ,alignContent : 'center' , alignItems : 'center'}}>
                                <Image source={{ uri : item.image}} style={{ width : 80 , height : 80 , borderRadius : 40}}/>
                                <Text>{item.username}</Text>
                            </View>
                        )
                }}/>
           </View> */}
           <View style={styles.viewChat}>
                <FlatList  data={data} renderItem={({item}) =>{
                        return(
                            <View style ={{ marginTop : 15 , paddingLeft : 15}}>
                                <TouchableOpacity style={{flexDirection : 'row' ,}} onPress={ () => navigation.navigate('ScreenChatDetails' ,item)}>
                                    <Image source={{ uri : item.image}} style={{ width : 60 , height : 60 , borderRadius : 30 }}/>
                                    <Text style={{ paddingTop : 7 , fontWeight : '600' , paddingLeft : 15 ,fontSize : 15}}>{item.username}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                }}/>
                
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex :1,
    },
    headerChat:{
        marginTop : 30,
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    itemUserDetails:{
        width : '100%',
        marginTop : 15,
    },
    viewChat :{
        marginTop : 20
    }
});