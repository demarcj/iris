'use server';

import { PropertyModel } from "@/_models";

// Firebase
import { getDocs, collection, query, where, limit, orderBy } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const get_property = async (id: string): Promise<PropertyModel> => {
  return new Promise(async (res, rej) => {
    try{
      const q = query(collection(db, `properties`), where(`id`, `==`, id));
      const querySnapshot = await getDocs(q);
      let items = {};
      querySnapshot.forEach(item => items = item.data());
      res(JSON.parse(JSON.stringify(items)))
    } catch(e) {
      console.error(e);
    }
  })
}

export const get_properties = async (amount: number = 20): Promise<{properties: PropertyModel[]}> => {
  return new Promise(async (res, rej) => {
    try{
      const q = query(collection(db, `properties`), orderBy(`created_at`, `desc`), limit(amount), );
      const querySnapshot = await getDocs(q);
      let items: PropertyModel[] = [];
      querySnapshot.forEach(item => items = [...items, item.data() as PropertyModel]);
      res(JSON.parse(JSON.stringify({properties: items})));
    } catch(e) {
      console.error(e);
    }
  })
}

export const get_hot_deal = async (): Promise<{properties: PropertyModel[]}> => {
  return new Promise(async (res, rej) => {
    try{
      const q = query(collection(db, `properties`), where(`hot_deal`, `==`, true), limit(20));
      const querySnapshot = await getDocs(q);
      let items: PropertyModel[] = [];
      querySnapshot.forEach(item => items = [...items, item.data() as PropertyModel]);
      res(JSON.parse(JSON.stringify({properties: items})));
    } catch(e) {
      console.error(e);
    }
  });
}