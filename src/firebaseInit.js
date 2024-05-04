// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_KxKVk1fT0GnCKmXNhsmZEqmAESW7ayw",
  authDomain: "inha-react.firebaseapp.com",
  projectId: "inha-react",
  storageBucket: "inha-react.appspot.com",
  messagingSenderId: "554297088454",
  appId: "1:554297088454:web:2bdfe04f9029601b3efac7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); // 밖에서 사용할 거니까 export