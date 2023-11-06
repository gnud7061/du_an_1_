import { StatusBar,  } from 'expo-status-bar';
import { StyleSheet,Text, View,Image, FlatList,TextInput, TouchableOpacity, Alert} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue ,set,get,child, query, orderByChild, equalTo } from "firebase/database";
import { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { Dimensions } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyB2-QE5OBrXNuiOzvN8sA_1YPLiC5OMj7s",
    authDomain: "appreadbook-e7ad0.firebaseapp.com",
    databaseURL: "https://appreadbook-e7ad0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "appreadbook-e7ad0",
    storageBucket: "appreadbook-e7ad0.appspot.com",
    messagingSenderId: "291503301889",
    appId: "1:291503301889:web:8dcb07cb95b2db280ea700",
    measurementId: "G-3D3NGQLCBY",
    databaseURL: 'https://appreadbook-e7ad0-default-rtdb.asia-southeast1.firebasedatabase.app/'
  };


export default function ScreenBookDetail(props){

    const {navigation,route} = props
    const {params} = route

    useEffect(()=>{

 // lấy dữ liệu dạng truy vấn theo  1 cái gì đó 
 const db = getDatabase();

 // Khởi tạo một tham chiếu đến node 'sach' trong database
 const dbRef = ref(db, 'sach');
 
 // Tạo một truy vấn để lọc dữ liệu với điều kiện 'theloai' bằng 'langman'
 const queryRef = query(dbRef, orderByChild('theloai'), equalTo(params.object.name));
 
 // Thực hiện truy vấn và lấy dữ liệu
 get(queryRef).then((snapshot) => {
   if (snapshot.exists()) {
     const dataFromFirebase = snapshot.val();
 
     // Chuyển đổi dữ liệu thành mảng
     const dataArray = Object.keys(dataFromFirebase).map((key) => ({
       id: key,
       name: dataFromFirebase[key].name,
       image: dataFromFirebase[key].image,
       tieude: dataFromFirebase[key].tieude,
     }));
 
     // Xử lý dữ liệu ở đây (ví dụ: setData(dataArray))
     console.log(dataArray);
     setData(dataArray);
  
   } else {
     console.log("Không tìm thấy dữ liệu.");
     Alert.alert('Không Có Sách');
   }
 }).catch((error) => {
   console.error("Lỗi khi truy vấn dữ liệu:", error);
 });

      
    },[])

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => {navigation.navigate('ScreenBook',{object : item})}}  style = {{       flexDirection:'row',marginTop:20}}>
        <Image style = {styles.img}
          source={{uri : item.image}}
        />
          <View style = {styles.content}>
              
              <Text style = {styles.tieude}>{item.name}</Text>
              <Text numberOfLines={2} style = {styles.noidung}>{item.tieude}</Text>
          
        
            
          </View>
         {/* <View style = {{flexDirection:'column'}}>
         <TouchableOpacity  onPress={()=> {setModalVisible(!modalVisible);setid(item.id)}} style = {{marginLeft:-30,marginTop:20}}>
         <Image 
               source={{uri:('https://tse3.mm.bing.net/th?id=OIP.NPji-fyZ2EVRazt9EFzS_AHaHu&pid=Api&P=0&h=180')}} style={{width:20,height:20,marginTop:-10,marginLeft:-20}}/>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=> {setModalVisible1(!modalVisible1);setobject(item)}} style = {{marginLeft:-30,marginTop:20}}>
          <Image 
               source={{uri:('https://tse3.mm.bing.net/th?id=OIP.7xljVQvRK1Z-hTo2_xxQeAAAAA&pid=Api&P=0&h=180')}} style={{width:20,height:20,marginTop:-40,marginLeft:10}}/>
          </TouchableOpacity>
         </View> */}
      </TouchableOpacity>
      );

    const [data, setData] = useState([]);
    return(
        <View style={styles.container}>
                   <View style={styles.sreach}>
                <Image source={require('./images/sreach.png')} style={{ width : 32 , height : 32,}}/>
                <TextInput placeholder='Tìm kiếm'/>
            </View>
            {/* <Text style={{  fontSize:20,
    fontWeight:'bold',
    color:'black',}}> Thể Loại : {params.object.name}</Text> */}
        <FlatList data={data} renderItem={renderItem}>

        </FlatList>
        {/* <Button onPress={()=>{

             // lấy dữ liệu dạng bt 
                //  const db = getDatabase();
                //  const dbRef = ref(getDatabase());
                // get(child(dbRef, `sach/`)).then((snapshot) => {
                // if (snapshot.exists()) {
                //     const dataFromFirebase = snapshot.val();

                //     const dataArray = Object.keys(dataFromFirebase).map((key) => ({
                //         id: key,
                //         name: dataFromFirebase[key].name,
                //         image: dataFromFirebase[key].image,
                //         tieude: dataFromFirebase[key].tieude,
                //       }));
                //       setData(dataArray);
                //       console.log(data);
                // } else {
                //     console.log("No data available"); 
                // }
                // }).catch((error) => {
                // console.error(error);
                // });

                // lấy dữ liệu dạng truy vấn theo  1 cái gì đó 
                const db = getDatabase();

                // Khởi tạo một tham chiếu đến node 'sach' trong database
                const dbRef = ref(db, 'sach');
                
                // Tạo một truy vấn để lọc dữ liệu với điều kiện 'theloai' bằng 'langman'
                const queryRef = query(dbRef, orderByChild('theloai'), equalTo(params.object.name));
                
                // Thực hiện truy vấn và lấy dữ liệu
                get(queryRef).then((snapshot) => {
                  if (snapshot.exists()) {
                    const dataFromFirebase = snapshot.val();
                
                    // Chuyển đổi dữ liệu thành mảng
                    const dataArray = Object.keys(dataFromFirebase).map((key) => ({
                      id: key,
                      name: dataFromFirebase[key].name,
                      image: dataFromFirebase[key].image,
                      tieude: dataFromFirebase[key].tieude,
                    }));
                
                    // Xử lý dữ liệu ở đây (ví dụ: setData(dataArray))
                    console.log(dataArray);
                    setData(dataArray);
                 
                  } else {
                    console.log("Không tìm thấy dữ liệu.");
                    Alert.alert('Không Có Sách');
                  }
                }).catch((error) => {
                  console.error("Lỗi khi truy vấn dữ liệu:", error);
                });
 

        }}>caller</Button> */}
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex :1,
        marginTop :50,
        alignItems:'center',
 
      
    },
    sreach:{
        width: 260,
        height: 40,
        flex_shrink: 0,
        borderWidth:1.5,
        borderColor:'#D9D9D9',
        marginLeft : 15,
        borderRadius : 15,
        backgroundColor : '#D9D9D9',
        flexDirection :'row'
    },
    img:{
        width:96,
        height:96,
        borderRadius:10,
        
        },
        
        content:{
        marginStart:20,
        marginTop:10
        },
        
        tieude:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
        width :Dimensions.get('window').width - 96 -20 -5
        
        },
        
        noidung:{
        color:'grey',
        width :Dimensions.get('window').width - 96 -20-5
        },
});