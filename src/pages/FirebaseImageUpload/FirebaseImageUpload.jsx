import React, { useEffect, useState } from "react";
import { imageDb } from "../../utils/firebase/Config.jsx";
import { getDownloadURL, listAll, ref} from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadImage from "../../utils/firebase/uploadImage.jsx"

function FirebaseImageUpload() {
    const [img, setImg] = useState("");
    const [imgUrl, setImgUrl] = useState([]);
    const notify = () => toast.error("Wow so easy!");

    const handleClick = async () => {
        if (!img) {
            alert("Please select an image to upload.");
            return;
        }
        const url = await uploadImage(img);
        if(url) {
            console.log("Download URL:", url);
        }
        setImgUrl((prevUrls) => [...prevUrls, url]);
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
            <br />
            <button onClick={notify}>Notify!</button>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
        </div>
    )
}

export default FirebaseImageUpload;