import React from "react";
import "./App.css";
import html2canvas from "html2canvas";

import Cropper from "react-easy-crop";
import Button from "@mui/material/Button";

import getCroppedImg from "./utils/cropImage";

import filter from "./assets/logo.png";

export default function App() {
  const inputRef = React.useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

  const [image, setImage] = React.useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedImg, setCroppedImg] = React.useState(null);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const printRef = React.useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const onDownload = async () => {
    const result = await getCroppedImg(image, croppedArea);
    setCroppedImg(result);
  };

  return (
    <div className="container">
      <div className="container-cropper">
        {image ? (
          <>
            <div className="cropper">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          </>
        ) : null}
      </div>

      {croppedImg && (
        <div ref={printRef} className="container-preview">
          <img className="user-image" src={croppedImg} alt="" />
          <img className="user-filter" src={filter} alt="" />
        </div>
      )}

      <div className="container-buttons">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onSelectFile}
          style={{ display: "none" }}
        />
        <button className="button-black" onClick={triggerFileSelectPopup}>
          Escolher
        </button>
        <button className="button-yellow" onClick={onDownload}>
          Aplicar
        </button>
        <button className="button-green" onClick={handleDownloadImage}>
          Download
        </button>
      </div>
    </div>
  );
}
