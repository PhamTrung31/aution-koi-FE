import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWaT142QpLEXuvJZv_iT8ktBRqa6O9BmM",
  authDomain: "auctionkoiimage.firebaseapp.com",
  projectId: "auctionkoiimage",
  storageBucket: "auctionkoiimage.appspot.com",
  messagingSenderId: "571284920703",
  appId: "1:571284920703:web:4e41cce9abab6e003fe24a",
  measurementId: "G-5N0KVDEC6Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDb = getStorage(app)