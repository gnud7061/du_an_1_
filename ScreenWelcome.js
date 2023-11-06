import React, { useEffect } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

const ScreenWelcome = ({ navigation }) => {
  useEffect(() => {
    // Sử dụng setTimeout để chuyển màn hình sau 2 giây
    const timer = setTimeout(() => {
      navigation.replace('ScreenLogin'); // Chuyển đến màn hình đăng nhập
    }, 2000); // 2000 milliseconds = 2 giây

    return () => clearTimeout(timer); // Xóa timer nếu màn hình chào bị unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('./images/logo_app.png')} style={styles.imageLogo}/>
      <Text>24h Tin Tức</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo:{
    width:200,
    height:200
  }
});

export default ScreenWelcome;