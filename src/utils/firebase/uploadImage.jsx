import { useState } from "react";
import { imageDb } from "./Config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const uploadImage = async (imgFile) => {
    try {
        const imgRef = ref(imageDb, `files/${v4()}`);
        
        // Upload the image
        await uploadBytes(imgRef, imgFile);
        console.log("File uploaded successfully!");

        // Get the download URL
        const url = await getDownloadURL(imgRef);
        return url;

    } catch (error) {
        console.error("Error uploading file:", error);
    }
}

export default uploadImage;