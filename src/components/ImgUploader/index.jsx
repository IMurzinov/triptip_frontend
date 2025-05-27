import React, { useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';

import deleteIcon from "assets/images/deleteIcon.svg";
import imgIcon from "assets/images/imgIcon.svg";

import "./index.css";

const MAX_FILES = 5;
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

const ImgUploader = ({ index }) => {
  const { watch, setValue } = useFormContext();
  const photos = watch(`tripElements.${index}.photos`) || [];

  // Очистка превью при размонтировании или изменении списка
  useEffect(() => {
    return () => {
      photos.forEach(file => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [photos]);

  // Мемоизированные обработчики
  const onDrop = useCallback(acceptedFiles => {
    const availableSlots = MAX_FILES - photos.length;
    if (availableSlots <= 0) return;

    const filesToAdd = acceptedFiles.slice(0, availableSlots);
    const filesWithPreview = filesToAdd.map(file =>
      Object.assign(file, {
        id: uuidv4(),
        preview: URL.createObjectURL(file)
      })
    );

    setValue(
      `tripElements.${index}.photos`,
      [...photos, ...filesWithPreview],
      { shouldValidate: true }
    );
  }, [photos, index, setValue]);

  const removeImageById = useCallback(id => {
    setValue(
      `tripElements.${index}.photos`,
      photos.filter(file => file.id !== id),
      { shouldValidate: true }
    );
  }, [photos, index, setValue]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
    maxSize: MAX_SIZE,
    disabled: photos.length >= MAX_FILES,
  });

  const renderDefault = () => (
    <>
      <img src={imgIcon} className="img-icon" alt="Upload icon" />
      <p className="uploader-text">
        Перетяните или нажмите
      </p>
    </>
  );

  const renderPreview = () => (
    <div className="images-preview">
      {photos.map(file => (
        <div key={file.id} className="image-container">
          <img src={file.preview} alt="Uploaded" className="uploaded-image" />
          <button onClick={() => removeImageById(file.id)} className="delete-button">
            <img src={deleteIcon} className="delete-icon" alt="Delete photo" />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div {...getRootProps()} className="file-uploader-container">
      <input {...getInputProps()} />
      {photos.length === 0 ? renderDefault() : renderPreview()}
    </div>
  );
};

export default ImgUploader;