'use server';

import { LoginModel } from "@/_models";

// Firebase
import { getDocs, doc, collection, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const get_login = async (login: LoginModel): Promise<LoginModel> => {
  return new Promise(async (res, rej) => {
    try{
      const doc = collection(db, `login`);
      const q = query(doc, where(`user_name`, `==`, login.user_name), where(`password`, `==`, login.password));
      const querySnapshot = await getDocs(q);
      let items = {} as LoginModel;
      querySnapshot.forEach(item => items = item.data() as LoginModel);
      res(items)
    } catch(e) {
      console.error(e);
    }
  })
}