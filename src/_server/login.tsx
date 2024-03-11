'use server';

import { LoginModel } from "@/_models";

// Firebase
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const get_login = async (data: LoginModel) => {
  return new Promise(async (res, rej) => {
    try{
      const docRef = doc(db, "login", data.user_name);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        localStorage.setItem(`user`, JSON.stringify(docSnap.data()));
        res(true);
      } else {
        rej();
      }
    } catch(e) {
      console.error(e);
    }
  })
}