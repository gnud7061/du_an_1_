import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { User } from './userContext';
import { initializeApp } from "firebase/app";
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, set, ref, push, update, child, orderByChild, equalTo, query, get, onValue, remove } from "firebase/database";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faChevronLeft, faEllipsis, faXmark } from '@fortawesome/free-solid-svg-icons';



const firebaseConfig = {
    apiKey: "AIzaSyB2-QE5OBrXNuiOzvN8sA_1YPLiC5OMj7s",
    authDomain: "appreadbook-e7ad0.firebaseapp.com",
    databaseURL: "https://appreadbook-e7ad0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "appreadbook-e7ad0",
    storageBucket: "appreadbook-e7ad0.appspot.com",
    messagingSenderId: "291503301889",
    appId: "1:291503301889:web:8dcb07cb95b2db280ea700",
    measurementId: "G-3D3NGQLCBY",
    databaseURL: 'https://appreadbook-e7ad0-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

export default function ScreenPageUser({ navigation, route }) {
    const { userData } = User();
    const imagesURL = userData.image;
    const [data, setData] = useState([]);


    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    const dbRef = ref(db, 'post/');

    const [selectedImage, setSelectedImage] = useState(null);
    const idUserQuery = userData.idUser;


    useEffect(() => {
        // const query = dbRef.orderByChild('idUserPost').equalTo(idUserQuery);
        const dataArray = [];
        const queryRef = query(dbRef, orderByChild('idUserPost'), equalTo(idUserQuery));
        onValue(queryRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                // const childData = childSnapshot.val();
                dataArray.push(childSnapshot.val());
                // console.log(childKey);
                // console.log(childData);
                // dataArray = childData;
                setData(dataArray);
                console.log({data});
            });
        }, {
            onlyOnce: true
        });

    }, [])


    const openPickImage = async () => {
        setSelectedImage(null);
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    }
   

    return (
        <View style={styles.container}>
            <View >
                <View style={styles.view1}>
                    <TouchableOpacity onPress={() => navigation.navigate('ManageBottom')}>
                        <FontAwesomeIcon style={{}} icon={faChevronLeft} size={25} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Nguyễn Văn Lực</Text>
                    <View></View>
                </View>
            </View>
            <FlatList data={data} renderItem={({item,index})=>{
                const isOwner = userData.idUser !== item.idUserPost;
                return(
                    <View style={styles.cardPost }>
                            <View style={{ height : 8 , width : '100%' , backgroundColor : '#E0E0E0'}}></View>
                            <View style={styles.itemUser}>
                                <Image source={{uri : item.imageUserPost}} style={{ height: 50 , width : 50 , borderRadius : 25}}/>
                                <View style={{flex :6, justifyContent: 'space-between' , paddingLeft : 10,width : '100%' , height: 45 , flexDirection : 'column'}}>
                                <Text style={{ fontWeight : 'bold' ,fontSize :16}}>{item.nameUserPost}</Text>
                                    <Text>{item.timePost}</Text>
                                </View>
                                <View style={{flex : 1.5, flexDirection : 'row' , paddingRight : 10 , justifyContent : 'space-between'}}>
                                     {isOwner ?(
                                        
                                    <TouchableOpacity>
                                    <FontAwesomeIcon icon={faEllipsis} size={25} color='black' />
                                    </TouchableOpacity>

                                ):(
                                    <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity>
                                        <FontAwesomeIcon icon={faEllipsis} size={25} color='black' />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: 26, height: 26, }} onPress={() => {

                                        //xoa firebase
                                        const db = getDatabase();
                                        console.log(item.id)
                                        remove(ref(db, 'post/' + item.id))
                                        //xoa list
                                        var Listfill = data.filter(data => data !== item)
                                        setData(Listfill);
                                    }}>
                                        <FontAwesomeIcon icon={faXmark} size={25} color="black" />
                                    </TouchableOpacity>
                                    </View>
                                    
                                )} 
                                </View>
                            </View>

                            <View style={styles.itemPost}>
                                <Text style={{ padding : 10}}>{item.contentPost}</Text>
                                <Image source={{uri : item.imagePost}} style={{ height : 700 , width : '100%'}} />
                            </View>
                        </View>
                );
            }}>

            </FlatList>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,

    },
    view3: {
        marginRight: 200
    },
    view1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemUser: {

        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 10,
        width: 400,
        height: 70,
        // alignItems : 'center'
    }
})