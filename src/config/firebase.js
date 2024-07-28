import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAg9Xt-PCN2ulFKtSC61tyNeX7nAx01TZo",
    authDomain: "codebrew-f4665.firebaseapp.com",
    projectId: "codebrew-f4665",
    storageBucket: "codebrew-f4665.appspot.com",
    messagingSenderId: "874161335896",
    appId: "1:874161335896:web:25f51bf80caf92434b642d",
    measurementId: "G-ZSBXC2GQ3T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };