import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuqVGLmoYBA_MZR-Pd1o0FCLpTGQ-BALI",
  authDomain: "iris-property-84d47.firebaseapp.com",
  projectId: "iris-property-84d47",
  storageBucket: "iris-property-84d47.appspot.com",
  messagingSenderId: "794894936298",
  appId: "1:794894936298:web:b2cb85108637257b0a4f93",
  measurementId: "G-S7T8QSZSPL"
};

const app = initializeApp(firebaseConfig);

if(!getApps.length){
  // getAnalytics(app);
}

export const db = getFirestore(app);