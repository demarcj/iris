import {
	collection,
	onSnapshot,
	query,
	getDocs,
	doc,
	getDoc,
	updateDoc,
	orderBy,
	Timestamp,
	runTransaction,
	where,
	addDoc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

export async function updatePropertyImageReference(
	property_id: string,
	publicImageUrl: string[]
) {
	const property_ref = doc(collection(db, "properties"), property_id);
	if (property_ref) {
		await updateDoc(property_ref, { images: publicImageUrl });
	}
}
