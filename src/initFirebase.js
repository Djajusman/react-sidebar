import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB4Rew6VfT94NhjCCY4TgATu9lcSKuDp48",
    authDomain: "test-ddac5.firebaseapp.com",
    projectId: "test-ddac5",
    storageBucket: "test-ddac5.appspot.com",
    messagingSenderId: "107081019969",
    appId: "1:107081019969:web:02ba90b203f36dacfc8cc0",
    measurementId: "G-F9VS4W64W8"
  };

firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();
export const firebaseStorage = firebase.storage();
export default firebaseConfig;