import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import ConnectFirebase from 'firebase/app';
import 'firebase/database';

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


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }


export default ConnectFirebase