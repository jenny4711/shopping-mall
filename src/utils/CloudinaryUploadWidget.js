import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

const CloudinaryUploadWidget = ({ uploadImage }) => {
  const [uploadedImages, setUploadedImages] = useState([]); 

  useEffect(() => {
    const myWidget = window.cloudinary.createUploadWidget(
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
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리
    return () => {
      document
        .getElementById("upload_widget")
        .removeEventListener("click", myWidget.open);
    };
  }, [uploadImage]); 

  return (
    <div>
      <Button id="upload_widget" size="sm" className="ml-2">
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
