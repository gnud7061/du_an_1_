import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, InteractionManager, TextInput, TouchableOpacity } from 'react-native';
import { User } from './userContext';

export default function ScreenDetailTK({navigation}) {
  const {userData} = User();
    return (
      <View style={styles.container}>
        <View style={styles.DetailsInformation}>
          <View style={styles.ViewTitle}>
            <TouchableOpacity style={{ marginLeft:20}} onPress={() => navigation.navigate('ManageBottom')} >
              <Image source={require('./images/arrow_back.png')}/>
            </TouchableOpacity>
            <Text style={styles.TitleScreen}>Tài khoản</Text>
          </View>
          <View style={styles.ViewDetails}>
            <View style={styles.line}></View>
            <Text style={styles.textUser}>Gmail : {userData.email}</Text>
            <View style={styles.line}></View>

            <Text style={styles.textUser}>Username : {userData.username}</Text>
            <View style={styles.line}></View>

            <Text style={styles.textUser}>phone : {userData.numberphone}</Text>
            <View style={styles.line}></View>

            <Text style={styles.textUser}>Mật khẩu : {userData.password}</Text>
            <View style={styles.line}></View>

            <Text style={styles.textUser}>Địa chỉ : {userData.address}</Text>
            <View style={styles.line}></View>

          </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container:{
      flex :1,
      marginTop  :50,
      backgroundColor :'#EDF0F2'
    }
    ,
    DetailsInformation :{
      width :400,
      height : 500,
      alignItems: 'center',
      backgroundColor :'#EDF0F2',

    },
    ViewTitle:{
      width : 400,
      height : 50,
      alignItems: 'center',
      flexDirection:'row',      
    },
    TitleScreen:{
      marginLeft : 90,
      fontSize :25,
      fontWeight :'500'
    },
    ViewDetails:{
      width:"100%",
      height:260,
      borderRadius :10,
      borderColor:'white',
      backgroundColor:'white',
      justifyContent : 'space-between',
    },
    line: {
      width: '100%',
      height: 0.4, // Độ cao của đường kẻ ngang
      backgroundColor: '#A5A5A5', // Màu của đường kẻ ngang
    },
    textUser :{
      fontWeight : 'bold' ,
      fontSize : 15 ,
      paddingLeft : 10
    }
  });
  