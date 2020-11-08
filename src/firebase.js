import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDF4Utu1SL5HWpQqr9p6Lcj_LHVzuKCCYE",
    authDomain: "react-crud-5dd61.firebaseapp.com",
    databaseURL: "https://react-crud-5dd61.firebaseio.com",
    projectId: "react-crud-5dd61",
    storageBucket: "react-crud-5dd61.appspot.com",
    messagingSenderId: "216034302027",
    appId: "1:216034302027:web:6fc6e61a1d7f5c34ae15ce"
};
// Initialize Firebase
var fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();