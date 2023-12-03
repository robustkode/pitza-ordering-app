// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAGiyAYBotFRFcPd_xWgm4wfvjdfIjti5s",

  authDomain: "food-ordering-ce859.firebaseapp.com",

  projectId: "food-ordering-ce859",

  storageBucket: "food-ordering-ce859.appspot.com",

  messagingSenderId: "410779466777",

  appId: "1:410779466777:web:4cf62bf147720dd3a8fe88",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
