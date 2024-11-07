import React, { useEffect, useState, useRef } from "react";
import { imageDb } from "../../utils/firebase/Config.jsx";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadImage from "../../utils/firebase/uploadImage.jsx"

function FirebaseImageUpload() {
    const [img, setImg] = useState("");
    const inputRef = useRef(null);
    const [imgUrl, setImgUrl] = useState([]);
    const notify = () => toast.error("Wow so easy!");
    const [vid, setVid] = useState("");

    const handleClick = async () => {
        if (!img) {
            alert("Please select an image to upload.");
            return;
        }
        const url = await uploadImage(img);
        if (url) {
            console.log("Download URL:", url);
        }
        setImgUrl((prevUrls) => [...prevUrls, url]);
    };

    const handleImageClick = () => {
        inputRef.current.click();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setImg(file);
    }

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
            <div class="border border-primary" onClick={handleImageClick} style={{ width: '30%' }}>
                {img ? (
                    // <img src={URL.createObjectURL(img)} alt="upload" style={{ height: '300px', width: '300px' }} />
                    <video
                        className="img-fluid border rounded-3 shadow-lg"
                        style={{ height: '100%', width: '100%' }}
                        controls
                        muted
                        loop
                        autoPlay
                    >
                        <source src={URL.createObjectURL(img)} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <img src="\logo\upload.webp" alt="upload" style={{ height: '300px', width: '300px' }} />
                )}
                <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
            </div>
            <br />
            {/* <button onClick={handleClick}>Upload</button> */}
            <br />
            {/* {imgUrl.map((dataVal) => {
                return (
                    <div>
                        <img src={dataVal} width='200px' height='200px' />
                        <br />
                    </div>
                )
            })} */}
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