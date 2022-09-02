import React, { useState, useCallback } from "react";
import "./App.css";

import Cropper from "react-easy-crop";
import Button from "@mui/material/Button";

import { generateDownload } from "./utils/cropImage";
import getCroppedImg from "./utils/cropImage";

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

  const onDownload = async () => {
    const result = await getCroppedImg(image, croppedArea);
    setCroppedImg(result);
  };

  const handle = () => {
    generateDownload(croppedImg);
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

      <img className="image" src={croppedImg} alt="" />

      <div className="container-buttons">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onSelectFile}
          style={{ display: "none" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={triggerFileSelectPopup}
          style={{ marginRight: "10px" }}
        >
          Escolher
        </Button>
        <Button variant="contained" color="secondary" onClick={onDownload}>
          Aplicar
        </Button>
        <Button variant="contained" color="secondary" onClick={handle}>
          Download
        </Button>
      </div>
    </div>
  );
}
