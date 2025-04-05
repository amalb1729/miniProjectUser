import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import "./styles.css";

function ImageUploader({ onClose }) {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const uploadCroppedImage = async () => {
    const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
    const formData = new FormData();
    formData.append("file", croppedBlob, "cropped.jpg");

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    alert("Image uploaded successfully");
    if (onClose) onClose();
  };

  return (
    <div className="image-uploader-container">
      {!image ? (
        <input type="file" accept="image/*" onChange={handleFileChange} />
      ) : (
        <>
          <div className="cropper-container">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="crop-buttons">
            <button onClick={uploadCroppedImage}>Upload</button>
            <button onClick={() => setImage(null)}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ImageUploader;
