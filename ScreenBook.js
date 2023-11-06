import { StatusBar,  } from 'expo-status-bar';
import { StyleSheet,Text, View,Image, FlatList,TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue ,set,get,child } from "firebase/database";
import { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { Dimensions } from 'react-native';
 



export default function ScreenBook(props){
 
  const {navigation,route} = props;
  const {params} = route;
    
    return(
      <ScrollView style = {styles.container}>

      <Image
                 source={{ uri: 'https://brandkey.vn/wp-content/uploads/2022/07/thiet-ke-logo-trang-tin-tuc-tong-hop-ring-ring.jpg' }}
                  style={{ width: 150, height: 150 ,borderRadius:10}}
                  />
              <Image style = {styles.img}
              source ={{uri : params.object.image}}
              />
              <Text style = {styles.tieude}>
              {params.object.name}
            
              </Text>
              <Text style = {styles.noidung}>
              {params.object.tieude}
               </Text>
      
               <View style = {{flexDirection:'row',alignItems:"center",justifyContent:"center"}}>
             <TouchableOpacity>
      
             <Image
                 source={{ uri: 'https://tse3.mm.bing.net/th?id=OIP._PeW7-Hh7GId3whBzxcXQQHaEU&pid=Api&P=0&h=180' }}
                  style={{ width: 70, height: 70 ,borderRadius:10,margin:20}}
                  />
      
             </TouchableOpacity>
      
            <TouchableOpacity>
      
            <Image
                 source={{ uri: 'https://tse3.mm.bing.net/th?id=OIP.TRJScEJILEsTxQyonqGNtQHaD3&pid=Api&P=0&h=180' }}
                  style={{ width: 70, height: 70 ,borderRadius:10,margin:20}}
                  />
            </TouchableOpacity>
      
            <TouchableOpacity>
            <Image
                 source={{ uri: 'https://tse3.mm.bing.net/th?id=OIP.ajog7YWuVjuwleRpWIeSMQAAAA&pid=Api&P=0&h=180' }}
                  style={{ width: 70, height: 70 ,borderRadius:10,margin:20}}
                  />
      
            </TouchableOpacity>
               </View>
{/*       
              <Text style = {styles.tieude}> Đọc Thêm Tin Tức </Text>
              {
                  data123.map((data123)=> <ItemListNew key={data123.id} dulieu ={data123}/>)
              } */}
         </ScrollView>
    )
}

const styles = StyleSheet.create({
  container :{
    flex:1,
   

},

img:{
    marginStart:25,
    width:96,
    height:96,
    borderRadius:10,
},

tieude:{
    marginStart:25,
    marginEnd:25,
    fontSize:20,
    fontWeight:'bold',
    color:'black',
    marginBottom:20,
    marginTop:20,
   
    
 
},

noidung:{
    marginStart:25,
    marginEnd:25,
    color:'grey',
  
}
});