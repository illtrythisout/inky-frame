import styles from './viewAlbum.module.css';
import { useOutletContext, useParams } from 'react-router';
import { useRef } from 'react';
// get env variables
const API_URL = import.meta.env.VITE_API_URL;

import ImageCard from '../components/album/ImageCard';

export default function ViewAlbum() {
  const { albums, refreshAlbums } = useOutletContext();
  const { albumId } = useParams();

  // handle image upload dialog
  const dialogRef = useRef(null);
  const fileInputRef = useRef(null);

  function openDialog() {
    dialogRef.current?.showModal();
  }
  function closeDialog() {
    dialogRef.current?.close();
  }

  // get the current album
  if (!albums || !albums.data) return;
  const album = albums.data.find((album) => album.id === Number(albumId));

  // handle image upload
  async function handleSubmit(e) {
    e.preventDefault();

    const file = fileInputRef.current.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/albums/${albumId}/images`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      console.log('Image uploaded successfully');

      await refreshAlbums();
    } catch (err) {
      console.error(err);
    } finally {
      closeDialog();
      e.target.reset();
    }
  }

  return (
    <>
      <div className="card">
        <div className={styles.header}>
          <h1>{album.name}</h1>
          <button onClick={openDialog}>Upload Image</button>
        </div>
        <div className={styles.imagesContainer}>
          {album?.images?.map((image) => (
            <ImageCard
              data={image}
              refreshAlbums={refreshAlbums}
              key={image.id}
            />
          ))}
        </div>
      </div>

      <dialog ref={dialogRef} className="dialog">
        <p>Upload Image</p>
        <form onSubmit={handleSubmit}>
          <input
            ref={fileInputRef}
            type="file"
            name="file"
            id="file"
            required
          />
          <div className="dialogButtons">
            <button type="button" onClick={closeDialog}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
