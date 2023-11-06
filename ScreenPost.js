
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity, TextInput ,Button, ScrollView , Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Sử dụng FontAwesome icons
import * as ImagePicker from 'expo-image-picker';
import { User } from './userContext';
import { initializeApp } from "firebase/app";
import { getStorage , uploadBytes ,ref, getDownloadURL} from "firebase/storage";
// import { storage } from 'expo-firebase-storage';
import { getDatabase, set ,ref as dataRef, push , update, child} from "firebase/database";





const firebaseConfig = {
    apiKey: "AIzaSyB2-QE5OBrXNuiOzvN8sA_1YPLiC5OMj7s",
    authDomain: "appreadbook-e7ad0.firebaseapp.com",
    databaseURL: "https://appreadbook-e7ad0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "appreadbook-e7ad0",
    storageBucket: "appreadbook-e7ad0.appspot.com",
    messagingSenderId: "291503301889",
    appId: "1:291503301889:web:8dcb07cb95b2db280ea700",
    measurementId: "G-3D3NGQLCBY",
    databaseURL:'https://appreadbook-e7ad0-default-rtdb.asia-southeast1.firebasedatabase.app/',
  };



export default function ScreenPost({navigation}){

    const [selectImage,setSelectedImage] = useState(null);

    const [idPost ,setIdPost] = useState();
    const [contentPost ,setContentPost] = useState();
    const [timePost , setTimePost] = useState(new Date().getTime());
    const [imagePost,setImagePost] = useState('');
    const [nameUserPost, setNameUserPost] = useState();
    const [imageUserPost,setImageUserPost] = useState();


    // // khởi tạo firebase
    const app = initializeApp(firebaseConfig);

    // // create a Strogeref
    const uniqueFileName = `image_${new Date().getTime()}.jpg`;


    // const uniqueFileName = `image_post.jpg/`;

    // const uniqueFileName = `image_post.jpg`;
    const storage = getStorage(app);

    const db = getDatabase();

    const storageRef = ref(storage,uniqueFileName);

    // `images/${uniqueFileName}` // dòng này thêm vào StrogeRef sẽ tạo thêm một folder('/images')

    //set images mặc định cho user
    const {userData} = User();
    const imageAvatarDefault = 'https://tse4.mm.bing.net/th?id=OIP.LGfXa5GoclkgmeZiARS1EQHaHd&pid=Api&P=0&h=180';
    const imagesURL = userData.image;



    console.log(selectImage);
    const postImages = async () =>{
        
            const response = await fetch(selectImage);

            const blob = await response.blob();
            uploadBytes(storageRef, blob).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                return getDownloadURL(storageRef);
               
              })
              
              .then((url) => {
                    console.log(url);
                    addPostToFireBaseRealTime(url);
              })
              .catch((error) => {
                console.error('Không thể tải lên hình ảnh:', error);
              });

            //   .then(
            //     getDownloadURL(storageRef)
            //     .then((url) => {
            //     // Insert url into an <img> tag to "download"
            //     console.log(url);
            //     })
            //     .catch((error) => {
            //         console.log(error)
            //     })
            //   )
               // Get the download URL

              

            // uploadBytes(storageRef, blob)
            //     'state_changed',
            //     (snapshot) => {
            //       // Cập nhật tiến trình tải lên ở đây (nếu cần)
            //     },
            //     (error) => {
            //       console.error('Lỗi khi tải ảnh lên Firebase Storage: ', error);
            //       Alert.alert('Lỗi', 'Không thể tải ảnh lên Firebase Storage');
            //     },
            //     () => {
            //       // Ảnh đã được tải lên thành công, bạn có thể lấy URL của ảnh từ đây
            //       ref.getDownloadURL().then((downloadURL) => {
            //         console.log('URL của ảnh đã được tải lên:', downloadURL);
            //         Alert.alert('Thành công', 'Ảnh đã được tải lên Firebase Storage');
            //         addPostToFireBaseRealTime(downloadURL);

            //       });
            //     }
              
            
        
    }

    useEffect( () => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Bạn cần cấp quyền truy cập vào thư viện ảnh để sử dụng tính năng này.');
            }
          })();
    },[]);

    const openImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result);
    
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
        }
      };
    
    const addPostToFireBaseRealTime = async (imageURL) =>{

        if(userData.image === ""){
            userData.image = imageAvatarDefault;
        }
        console.log(userData.image);

        // const idPost = dataRef.child;

        //tạo id fake để xem thông tin id
        // const idpostFake = userData.idUser + new Date().getTime();

        // console.log(idpostFake);

        const rt= new Date().getTime();
        
        console.log(imageURL);
        set(dataRef(db, 'post/' + rt), {
          id : rt,
          idUserPost : userData.idUser,
          contentPost: contentPost,
          imagePost: imageURL,
          timePost: timePost,
          nameUserPost: userData.username,
          imageUserPost: userData.image,  
            }).catch((error) =>{                        //dòng này fix thêm lỗi nếu lỗi firebase hãy sửa từ dòng này đến 161
                console.log('lỗi đăng lên firebase')
            }).then(()=>{
            Alert.alert('Đăng bài thành công');
            navigation.navigate('ManageBottom');
        })
    }
    

    return(
        
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={ () => navigation.navigate('ManageBottom')}>
                    <Image source={require('./images/edit.png')} style={{width : 28 , height : 28 ,}}></Image>
                </TouchableOpacity>
                <Text style={styles.textHeader}>Tạo bài viết</Text>
                <TouchableOpacity style={styles.btn_post} onPress={postImages}>
                    <Text style={{ fontSize : 15, color : 'white' , fontWeight : 'bold'}}>Đăng</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.bodyPost}>
                    <View style={styles.ViewAvatarPost}>
                        <View style={styles.imagesAvatar}>
                            <Image source={{ uri : imagesURL || imageAvatarDefault}} style={{ width : 50 , height  : 50 , borderRadius :25}}/>
                        </View>
                        <Text style={{marginLeft : 10}}>{userData.username}</Text>
                    </View>
                    <View style={styles.ViewPostInput}>
                        <TextInput placeholder='Bạn đang nghĩ gì ?' multiline={true} style={{ minHeight : 60}} onChangeText={(Text) => setContentPost(Text) }/>
                    </View>
        
                </View>
                <Image  source={{ uri: selectImage}} style={{width : '100%' , height : 400}}></Image>
            </ScrollView>
            <View style ={[styles.card, styles.elevation]}>
                    <TouchableOpacity onPress={openImagePicker} style={{flexDirection  :'row'}}>
                        <Icon name="image" size={26} color="#2E7D32" />
                        <Text style={{fontSize : 16 , fontWeight : '500'}}>  Image/Hình ảnh </Text>
                    </TouchableOpacity>
            </View>
        </View>

       
    )
    };



const styles = StyleSheet.create({
    container:{
        flex : 1,
    },
    header :{
        flexDirection : "row",
        justifyContent :'space-between',
        alignItems : 'center',
        backgroundColor : '#E5E5E5',
        paddingTop : 50,
        paddingBottom: 20,
        paddingEnd : 10,
        paddingStart : 10,
        height  :110,
    },
    textHeader :{
        fontSize : 20,
        fontWeight : '500',
    },
    btn_post :{
        width : 65,
        height : 40,
        backgroundColor : '#272727',
        borderRadius : 10,
        justifyContent : 'center',
        alignItems : 'center'
    },
    bodyPost :{
        marginLeft : 10
    },

    ViewAvatarPost :{
        height : 70 ,
        flexDirection : 'row' , 
        alignItems : 'center', 
    },
    imagesAvatar:{
        width : 50,
        height : 50,
        borderRadius : 25,
        borderWidth : 1,
        justifyContent :'center',
        alignItems:'center'
    },
    ViewPostInput :{
        
    },
    pickAdds :{
        borderTopEndRadius : 20,
        borderTopStartRadius  :20,
        height : 60,
        position :'absolute',
        bottom :0,
        right :0,
        left :0,
        borderWidth :2,
        borderColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: {
            width: 0,
            height: -10
        },
        borderStyle: 'solid',
        shadowColor: 'black',
        shadowRadius: 20,
        shadowOpacity: 1
    },
    card: {
        backgroundColor: 'white',
        borderTopEndRadius : 20,
        borderTopStartRadius  :20,     
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%',
        position :'absolute',
        bottom :0,
        right :0,
        left :0,
        height :60,
        shadowOffset: {
            width: 0,
            height: -2
        },
       
        shadowColor: '#263238',
        shadowRadius: 5,
        shadowOpacity: 0.5,
        justifyContent :'center'
      },
      elevation: {
        elevation: 25,
        shadowColor: '#0F0F0F',
      },

});