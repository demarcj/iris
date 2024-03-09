// Firebase
import { collection, getDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from "@/firebase/firebase";

export async function getStaticProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const repo = await res.json();
  return { props: { repo } };
}

// const q = query(collection(db, `properties`));
//   onSnapshot(q, (querySnapshot) => {
//     let items: any[] = [];
//     querySnapshot.forEach(item => { items = [item.data(), ...items]; });
//     // 58d405ff-85a3-45c7-a0a4-646b1670dec9
//     // const item = items.find(item => item.id === param.id);
//     const item = items.find(item => item.id === `58d405ff-85a3-45c7-a0a4-646b1670dec9`);
//   })