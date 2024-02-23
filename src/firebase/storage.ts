import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebase";

export async function updatePropertyImage(property_id: string, image: File) {
  try {
    if (!property_id)
      throw new Error("No restaurant ID has been provided.");

    if (!image || !image?.name)
      throw new Error("A valid image has not been provided.");

    return await uploadImage(property_id, image)
    } catch (error) {
        console.error("Error processing request:", error);
    }

}

async function uploadImage(property_id: string, image: File) {
  const file_path = `images/${property_id}/${image.name}`;
  const new_image_ref = ref(storage, file_path);
  await uploadBytesResumable(new_image_ref, image);

  return await getDownloadURL(new_image_ref);
}