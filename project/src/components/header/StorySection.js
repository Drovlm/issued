import React, { useState } from "react";
import axios from "axios";
import { FiFilePlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const StorySection = ({ userInfo }) => {
  const [image, setImage] = useState(null);
  const [story, setStory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("User ID:", userInfo.id);
    console.log("Story text:", story);

    const formData = new FormData();
    formData.append("user_id", userInfo.id);
    formData.append("story_image", image);
    formData.append("story_text", story);

    if (image) {
      const fileBlob = new Blob([image], { type: image.type });
      formData.append("story_image", fileBlob, userInfo.id);
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/story",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      alert("Story added successfully.");
    } catch (error) {
      console.error("Error:", error);
      alert("Error: Unable to add story. Please try again.");
    }
  };

  return (
    <div className="StorySection">
      <div className="storywin">
        {/* Your existing story section code */}
        <form onSubmit={handleSubmit}>
          <div
            className="StoryImage"
            action=""
            onClick={() => document.querySelector(".input-filed").click()}
          >
            <input
              htmlFor="sty"
              id="sty"
              type="file"
              accept="image/*"
              className="input-filed"
              hidden
              onChange={({ target: { files } }) => {
                if (files) {
                  setImage(URL.createObjectURL(files[0]));
                }
              }}
            />
            {image ? (
              <img className="imgSTY" src={image} alt="Story Image" />
            ) : (
              <FiFilePlus color="#1475cf" size={120} />
            )}
          </div>
          <div
            className="story_text"
            onChange={(e) => setStory(e.target.value)}
          >
            <textarea className="story_input" type="text" value={story} />
          </div>
          <div className="optinsSTY">
            <div
              className="trashSTY"
              onClick={() => {
                setImage(null);
              }}
            >
              <MdDelete style={{ marginTop: "4px" }} />
            </div>
          </div>
          <div className="authSTY">
            <button className="ShareBTn" type="submit">
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StorySection;
