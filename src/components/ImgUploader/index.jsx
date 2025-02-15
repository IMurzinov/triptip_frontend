import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import deleteIcon from "assets/images/deleteIcon.svg";
import imgIcon from "assets/images/imgIcon.svg";

import "./index.css";

const ImgUploader = ({ locationId = 'mockLocationId', uploadUrl = 'http://localhost:3000/upload' }) => {
    const [images, setImages] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('locationId', locationId);

            // Mock response simulation
            setTimeout(() => {
                const mockResponse = { id: Date.now(), url: URL.createObjectURL(file) };
                setImages(prev => [...prev, mockResponse]);
                console.log('Файл загружен:', mockResponse);
            }, 1000);
            
            // axios.post(uploadUrl, formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // }).then(response => {
            //     // Предполагаем, что сервер возвращает URL загруженного изображения
            //     setImages(prev => [...prev, { id: response.data.id, url: URL.createObjectURL(file) }]);
            // }).catch(error => {
            //     console.error('Ошибка при загрузке файла:', error);
            // });
        });
    }, [locationId, uploadUrl]);

    const removeImage = (id, event) => {
        event.stopPropagation();  // Добавлено остановление всплытия события
        setImages(prev => prev.filter(image => image.id !== id));
    };

    const defaultRender = () => (
        <>
            <img src={imgIcon} className="img-icon" alt="Upload icon" />
            <p className="uploader-text">Перетяните или нажмите</p>
        </>
    );

    const afterUploadRender = () => (
        <div className="images-preview">
            {images.map((image, index) => (
                <div key={index} className="image-container">
                    <img src={image.url} alt="Uploaded" className="uploaded-image" />
                    <button onClick={(e) => removeImage(image.id, e)} className="delete-button">
                        <img src={deleteIcon} className='delete-icon' alt="delete uploaded photo"/>
                    </button>
                </div>
            ))}
        </div>
    );

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className="file-uploader-container">
            <input {...getInputProps()} />
            {images.length === 0 ? defaultRender() : afterUploadRender()}
        </div>
    );
};

export default ImgUploader;