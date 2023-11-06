import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { User } from './userContext';
import { initializeApp } from "firebase/app";
import * as ImagePickerU from 'expo-image-picker';
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { getDatabase, set, ref as dataRef, push, update, child, orderByChild, equalTo, query, get, onValue, remove } from "firebase/database";
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

export default function ScreenUpdateAvt({ navigation, route }) {
    const { userData } = User();
    const [selectImageupdate, setSelectImageUpdate] = useState('');
    const [data, setData] = useState([]);
    const datauri = [];


    const app = initializeApp(firebaseConfig);
    const uniqueFileName = `image_${new Date().getTime()}.jpg`;
    const db = getDatabase();
    const storage = getStorage();
    const storageRef = ref(storage, uniqueFileName);

    const idUserQuery = userData.idUser;

    const imageAvatarDefault = 'https://tse4.mm.bing.net/th?id=OIP.LGfXa5GoclkgmeZiARS1EQHaHd&pid=Api&P=0&h=180';
    const [ImageChange, setImageChange] = useState(imageAvatarDefault);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePickerU.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Bạn cần cấp quyền truy cập vào thư viện ảnh để sử dụng tính năng này.');
            }
        })();
    }, [])

    const openPickImage = async () => {

        const resultImageUpdate = await ImagePickerU.launchImageLibraryAsync({
            mediaTypes: ImagePickerU.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });
        if (!resultImageUpdate.canceled) {
            const uriUPdate = resultImageUpdate.assets[0].uri;
            // console.log(uriUPdate);
            datauri.push(uriUPdate);
            postImages();

        }

        // console.log(datauri[0]);

        // setSelectImageUpdate(datauri);
        // console.log('ảnh được chọn làm avt')
        // console.log(selectImageupdate);
    }

    const postImages = async () => {
        const response = await fetch(datauri[0]);
        const blob = await response.blob();
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            return getDownloadURL(storageRef);
        }).then((url) => {
            addImageUpdateToFireBaseRealTime(url);
            updateImageUserPost(url);
            reload();
        }).catch((error) => {
            console.error('Không thể tải lên hình ảnh:', error);
        });
    }

    const addImageUpdateToFireBaseRealTime = async (imageURL) => {

        // console.log(imageURL);
        const userRef = dataRef(db, '/users/' + idUserQuery);


        update(userRef, { image: imageURL })
            .then(() => {
                console.log("Cập nhật ảnh thành công");
            })
            .catch((error) => {
                console.error("Lỗi khi cập nhật ảnh:", error);
            });
    }

    const updateImageUserPost = async (imageURL) => {
        const userOfPostRef = dataRef(db, '/post/');
        const queryRef = query(userOfPostRef, orderByChild('idUserPost'), equalTo(idUserQuery));
        onValue(queryRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const postRef = dataRef(db, '/post/' + childKey);
                update(postRef, { imageUserPost: imageURL })
                    .then(() => {
                        console.log("Cập nhật ảnh user của post thành công");
                    })
                    .catch((error) => {
                        console.error("Lỗi khi cập nhật ảnh user của post thành công:", error);
                    });
            });
        }, {
            onlyOnce: true
        });
    }
    const reload = () => {
        const dbRef = dataRef(getDatabase());
        get(child(dbRef, `users/` + idUserQuery)).then((snapshot) => {
            if (snapshot.exists()) {
                setImageChange(snapshot.val().image)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }



    return (
        <View style={styles.container}>
            <View style={styles.view3}>
                <TouchableOpacity onPress={openPickImage} style={styles.chonanh}>
                    <Text >Chọn ảnh</Text>
                </TouchableOpacity>               
            </View>
            <View style={{ alignItems: 'center',}}>
                <Image source={{ uri: ImageChange }} style={{ width: 300, height: 300, borderRadius: 150 }} />
            </View>
              
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,

    },
    view3: {
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    chonanh:{
        borderWidth: 1,
        borderColor: 'grey',
        padding: 5,
        borderRadius: 10,
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