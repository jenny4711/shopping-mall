import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

const CloudinaryUploadWidget = ({ uploadImage }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const openWidget = () => {
    // Upload widget configuration and initialization
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: CLOUDNAME,
          uploadPreset: UPLOADPRESET,
          multiple: true,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            const secureUrl = result.info.secure_url;
            console.log("이미지 업로드 완료: ", secureUrl);

            setUploadedImages((prevImages) => [...prevImages, secureUrl]);
            uploadImage(secureUrl);
          }
        }
      )
      .open();
  };

  return (
    <div>
      <Button onClick={openWidget} size="sm" className="ml-2">
        이미지 업로드 +
      </Button>
      <div>
        {uploadedImages.map((imageUrl, index) => (
          <img
            width={150}
            key={index}
            src={imageUrl}
            alt={`업로드된 이미지 ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CloudinaryUploadWidget;
