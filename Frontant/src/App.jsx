import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [title, setTitle] = useState(null); // State variable to store video file
  const [img, setImage] = useState(null); // State variable to store image file

  const [allImage, setAllImage] = useState([]);

  const getPdf = async () => {
    const result = await axios.get("http://localhost:3000/imgvideo");
    console.log(result.data);
    setAllImage(result.data);
  };

  useEffect(() => {
    getPdf();
  }, [allImage]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the image state with the selected file object
  };

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("img", img); // Append image file to FormData
    let data = await axios.post("http://localhost:3000/imgvideo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(data);
  };

  return (
    <div>
      <div>
        <input
          type="text"
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
        allImage.map((data) => {
          return (
            <div>
              <span>Title:{data.title}</span>
              <img
                style={{ height: "250px", width: "200px" }}
                src={`http://localhost:3000/uploads/${data.img}`}
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
