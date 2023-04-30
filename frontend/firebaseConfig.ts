import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDCjOZ_gHMPIu0jjOdTi6vKmz0TquhJdE4",
    authDomain: "cpd-persona-generator.firebaseapp.com",
    projectId: "cpd-persona-generator",
    storageBucket: "cpd-persona-generator.appspot.com",
    messagingSenderId: "354167954408",
    appId: "1:354167954408:web:d0043858e1d95369b4a25d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export  {app, auth};
