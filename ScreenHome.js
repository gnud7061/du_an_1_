import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Button } from 'react-native';
import { SafeAreaView } from 'react-native';
import { initializeApp } from "firebase/app";
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faXmark, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { User } from './userContext';
import { getDatabase, set, ref, push, onValue, child, get, remove, onChildChanged } from "firebase/database";

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


export default function ScreenHome({ navigation }) {


    const [searchText, setSearchText] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [data, setData] = useState([]);
    const app = initializeApp(firebaseConfig);
    // const db = getDatabase(app);

    const db = getDatabase();
    const dbRef = ref(db, '/post');


    useEffect(() => {
        // const dbRef = ref(getDatabase());
        // get(child(dbRef, `post/` )).then((snapshot) => {
        //     if (snapshot.exists()) {
        //         const post = snapshot.val();       
        //         setData(post);
        //         } else {
        //         console.log("No data available");
        //     }
        //     }).catch((error) => {
        //     console.error(error);
        //     console.log('không thành công');

        //     });

        const dataArray = [];

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                // const childData = childSnapshot.val();
                dataArray.push(childSnapshot.val());
                // console.log(childKey);
                // console.log(childData);
                // dataArray = childData;
                setData(dataArray);
                // console.log(data);
            });
        }, {
            onlyOnce: true
        });

    }, [])

    onChildChanged(dbRef, (snapshot) => {
        const newMessage = snapshot.val();
        reloadPost();
        reloadUser();
    });

    const handleSearch = () => {
        // Lọc bài post dựa trên từ khóa tìm kiếm
        const filtered = data.filter(post => post.nameUserPost.includes(searchText));
        setFilteredPosts(filtered);
        navigation.navigate('ScreenSearchResultsPost', { filteredPosts: filtered });
      };




    const { userData } = User();
    //fix images cho user
    const imageAvatarDefault = 'https://tse4.mm.bing.net/th?id=OIP.LGfXa5GoclkgmeZiARS1EQHaHd&pid=Api&P=0&h=180';
    const imagesURL = userData.image;
    const [ImageChange, setImageChange] = useState(imagesURL);

    const reloadPost = () => {
        const dataArray = [];

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;

                dataArray.push(childSnapshot.val());
                setData(dataArray);
            });
        }, {
            onlyOnce: true
        });
    }
    const reloadUser = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/` + userData.idUser)).then((snapshot) => {
            if (snapshot.exists()) {
                setImageChange(snapshot.val().image)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    // const deletePost = (index) =>{
    //     dbRef.child(index).remove()
    //     .then(() => {
    //         console.log('Mục đã được xóa thành công từ Firebase.');
    //       })
    //       .catch((error) => {
    //         console.error('Lỗi khi xóa mục từ Firebase:', error);
    //       });
    //     const dataArrayNew = data.filter(item => index !== index);
    //     setData(dataArrayNew);
    // }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.imageLogo}>
                    <Image source={require('./images/logo_app.png')} style={{ flex: 1, width: 70, height: 50 }} />
                </View>
                <View style={styles.sreach}>
                    <TouchableOpacity onPress={handleSearch}>
                        <Image source={require('./images/sreach.png')} style={{ width: 32, height: 32, }} />
                    </TouchableOpacity>
                    
                    <TextInput placeholder='Tìm kiếm' onChangeText={text => setSearchText(text)} />
                </View>
            </View>
            <View style={styles.post}>
                <TouchableOpacity onPress={() => navigation.navigate('ScreenProfile')}>
                    <View style={styles.imagesAvatar}>
                        <Image source={{ uri: ImageChange || imageAvatarDefault }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.clickPost} onPress={() => navigation.navigate('ScreenPost')} >
                    <Text>Bạn đang nghĩ gì ?</Text>
                </TouchableOpacity>
            </View>

            <FlatList data={data} renderItem={({ item, index }) => {
                return (
                    <View style={styles.cardPost}>
                        <View style={{ height: 8, width: '100%', backgroundColor: '#E0E0E0' }}></View>
                        <View style={styles.itemUser}>
                            <Image source={{ uri: item.imageUserPost }} style={{ height: 50, width: 50, borderRadius: 25 }} />
                            <View style={{ flex: 6, justifyContent: 'space-between', paddingLeft: 10, width: '100%', height: 45, flexDirection: 'column' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.nameUserPost}</Text>
                                <Text>{item.timePost}</Text>
                            </View>
                            <View style={{ flex: 1.5, flexDirection: 'row', paddingRight: 10, justifyContent: 'space-between' }}>
                                <TouchableOpacity>
                                    <FontAwesomeIcon icon={faEllipsis} size={25} color='black' />
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={{ width : 26, height : 26, }} onPress={() => {
                                        
                                            //xoa firebase
                                            const db = getDatabase();
                                            remove(ref(db,'post/'+ item.id))


                                            //xoa list
                                            var Listfill = data.filter(data => data !== item)
                                            setData(Listfill);
                                    }}>
                                        <FontAwesomeIcon icon={faXmark} size={25} color="black" />
                                    </TouchableOpacity> */}
                            </View>
                        </View>

                        <View style={styles.itemPost}>
                            <Text style={{ padding: 10 }}>{item.contentPost}</Text>
                            <Image source={{ uri: item.imagePost }} style={{ height: 700, width: '100%' }} />
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
    },
    header: {
        height: 70,
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
    },
    imageLogo: {
        width: 90,
        height: 70,
        justifyContent: 'center'
        , alignItems: 'center'
    },
    sreach: {
        width: 260,
        height: 40,
        flex_shrink: 0,
        borderWidth: 1.5,
        borderColor: '#D9D9D9',
        marginLeft: 15,
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
        flexDirection: 'row'
    },
    post: {
        flexDirection: 'row',
        height: 60,
        alignItems: "center",
        marginLeft: 10
    },
    imagesAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    clickPost: {
        width: 300,
        height: 40,
        justifyContent: 'center',
        marginLeft: 10,
    },
    cardPost: {

    },
    itemUser: {

        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 10,
        width: 400,
        height: 70,
        // alignItems : 'center'
    },
    itemPost: {

    }

});