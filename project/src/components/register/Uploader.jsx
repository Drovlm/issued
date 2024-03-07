{/*import React, { useState } from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import './Uploader.css'

function Uploader () {
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No selected file");

    return (
        <main>
            <form
                action=""
                onClick={() => document.querySelector(".input-filed").click()}
            >
                <input
                    type="file"
                    accept="image/*"
                    className="input-filed"
                    hidden
                    onChange={({ target: { files } }) => {
                        files[0] && setFileName(files[0].name);
                        if (files) {
                            setImage(URL.createObjectURL(files[0]));
                        }
                    }}
                />

                {image ? (
                    <img
                        src={image}
                        width={180}
                        height={180}
                        style={{ objectFit: 'cover', borderRadius: '110px' }}
                        alt={fileName}
                    />
                ) : (
                    <>
                        <MdCloudUpload color="#1475cf" size={60} />
                        <p>Browse file to upload</p>
                    </>
                )}
            </form>

            <section className="uploaded-row">
                <span className="upload-content">
                    {fileName}
                    <MdDelete
                        onClick={() => {
                            setFileName("No selected file");
                            setImage(null);
                        }}
                    />
                </span>
            </section>
        </main>
    );
}

export default Uploader;*/}