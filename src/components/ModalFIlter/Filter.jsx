import { useEffect, useRef, useState } from "react";
import "./Filter.styles.css";

import html2canvas from "html2canvas";
import Cropper from "react-easy-crop";

import CustomModal from "../CustomModal/CustomModal";

import getCroppedImg from "../../utils/cropImage";

import filter from "../../assets/filter.png";

export default function Filter({ buttonLabel }) {
  const inputRef = useRef();

  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImg, setCroppedImg] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  useEffect(() => {
    if (image) {
      openModal();
    }
  }, [image]);

  const closeModal = () => {
    setModalIsOpen(false);
    setCroppedImg(null);
  };

  const triggerFileSelectPopup = () => {
    inputRef.current.click();
    setCroppedImg(null);
  };

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

  const printRef = useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "now";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const handleApplyFilter = async () => {
    const croppedImage = await getCroppedImg(image, croppedArea);
    setCroppedImg(croppedImage);
    setImage(null);
  };

  return (
    <div className="container">
      <CustomModal
        openModal={openModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      >
        {image && (
          <div className="container-cropper">
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
          </div>
        )}

        {croppedImg && (
          <div ref={printRef} className="container-preview">
            <img
              className="user-image"
              src={croppedImg}
              alt="Foto do usuário"
            />
            <img
              className="filter-image"
              src={filter}
              alt="Filtro do rock in rio"
            />
          </div>
        )}

        <div className="container-action-buttons">
          {!image && (
            <button className="button-black" onClick={triggerFileSelectPopup}>
              {croppedImg ? "Trocar foto" : "Escolher foto"}
            </button>
          )}
          {image && (
            <button className="button-yellow" onClick={handleApplyFilter}>
              Aplicar filtro
            </button>
          )}
          {croppedImg && (
            <button className="button-green" onClick={handleDownloadImage}>
              Salvar foto
            </button>
          )}
        </div>
      </CustomModal>

      <div>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onSelectFile}
          style={{ display: "none" }}
        />
        <button className="action-button" onClick={triggerFileSelectPopup}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
