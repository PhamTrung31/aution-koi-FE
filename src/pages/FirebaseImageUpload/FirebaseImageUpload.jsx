import React, { useEffect, useState } from "react";
import { imageDb } from "./Config";
import { getDownloadURL, list, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function FirebaseImageUpload() {
    const [img, setImg] = useState("")
    const [imgUrl, setImgUrl] = useState([])

    const handleClick = async () => {
        if (!img) {
            alert("Please select an image to upload.");
            return;
        }

        try {
            const imgRef = ref(imageDb, `files/${v4()}`);
            // Upload the image
            await uploadBytes(imgRef, img);
            console.log("File uploaded successfully!");

            // Get the download URL
            const url = await getDownloadURL(imgRef);
            console.log("Download URL:", url);

            // Update the state with the new URL
            setImgUrl((prevUrls) => [...prevUrls, url]);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    useEffect(() => {
        const fetchImages = async () => {
            const imgs = await listAll(ref(imageDb, "files"));
            const urls = await Promise.all(
                imgs.items.map(async (val) => {
                    return await getDownloadURL(val);
                })
            );
            setImgUrl(urls);
        };

        fetchImages();
    }, []);

    return (
        <div className="App text-center">
            <input type="file" onChange={(e) => setImg(e.target.files[0])} />
            <button onClick={handleClick}>Upload</button>
            <br />
            {imgUrl.map((dataVal) => {
                return (
                    <div>
                        <img src={dataVal} width='200px' height='200px' />
                        <br />
                    </div>
                )
            })}
        </div>
    )
}

export default FirebaseImageUpload;