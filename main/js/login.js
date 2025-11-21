// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuVjoYj9VLuk9GlLYchz7anhEet8xOd2w",
  authDomain: "quickshop-30a4c.firebaseapp.com",
  projectId: "quickshop-30a4c",
  storageBucket: "quickshop-30a4c.firebasestorage.app",
  messagingSenderId: "110869975141",
  appId: "1:110869975141:web:296f8e6f85ffc771ff768c",
  measurementId: "G-L8D0DW3ELN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);