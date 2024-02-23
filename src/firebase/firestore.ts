import {
	collection,
	doc,
	updateDoc
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

export async function updatePropertyImageReference(
	property_id: string,
	publicImageUrl: string[],
	key: string
) {
	const property_ref = doc(collection(db, "properties"), property_id);
	if (property_ref) {
		await updateDoc(property_ref, { [key]: publicImageUrl });
	}
}
