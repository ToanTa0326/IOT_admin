// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2SpKG9JOtZdiPLyB-SLLJPvuH_GQItek",
  authDomain: "iot-nhom25.firebaseapp.com",
  databaseURL: "https://iot-nhom25-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-nhom25",
  storageBucket: "iot-nhom25.appspot.com",
  messagingSenderId: "115742284906",
  appId: "1:115742284906:web:20b7de603e6fe118c47e13",
  measurementId: "G-F27004Z48L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };
