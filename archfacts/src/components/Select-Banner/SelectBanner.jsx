import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./SelectBanner.module.css";
import editImage from "../../utils/assets/edit.svg";

function SelectBanner({ bannerAtualizado, setBannerAtualizado }) {
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setBannerAtualizado(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, [setBannerAtualizado]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        maxFiles: 1,
    });

    return (
        <div
            className={`${styles.banner} ${bannerAtualizado ? styles.hasImage : styles.noImage}`}
            {...getRootProps()}
        >
            <input style={styles.input} {...getInputProps()} />
            <div className={styles.banner_area}>
                {bannerAtualizado && (
                    <img className={styles.banner_image} src={bannerAtualizado} alt="Banner da empresa" />
                )}
                <div className={styles.edit_container}>
                    <img className={styles.edit_image} src={editImage} alt="Editar imagem" />
                    <h2>Clique aqui para selecionar a sua imagem ou arraste e solte aqui</h2>
                </div>
            </div>
        </div>
    );
}

export default SelectBanner;
