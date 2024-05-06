import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [title, setTitle] = useState(""); // State variable to store video file
  const [img, setImage] = useState(null); // State variable to store image file

  const [allImage, setAllImage] = useState([]);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const result = await axios.get(
        "https://img-insrt-fetch-back.onrender.com/imgvideo"
      );
      setAllImage(result.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the image state with the selected file object
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("img", img); // Append image file to FormData
      const response = await axios.post(
        "https://img-insrt-fetch-back.onrender.com/imgvideo",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // Add the newly uploaded image to the allImage state
      setAllImage([...allImage, response.data]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={title}
          onChange={handleTitle} // Call handleVideoChange function on file input change
        />
        <br />
        <br />
        <input
          type="file"
          name="img"
          accept="image/*"
          onChange={handleImageChange} // Call handleImageChange function on file input change
        />
        <br />
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <h1>All Images</h1>
      {allImage.length > 0 &&
        allImage.map((data, index) => {
          return (
            <div key={index}>
              <span>Title: {data.title}</span>
              <br />
              <img
                style={{ height: "250px", width: "200px" }}
                src={`https://img-insrt-fetch-back.onrender.com/uploads/${data.img}`}
                alt=""
              />
              <br /> <br />
            </div>
          );
        })}
    </div>
  );
};

export default App;
