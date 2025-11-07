import styles from './imageCard.module.css';
import { useState } from 'react';

// get env variables
const API_URL = import.meta.env.VITE_API_URL;

import imageIcon from '../../assets/icons/image.svg';
import deleteIcon from '../../assets/icons/delete.svg';

export default function ImageCard({ data, refreshAlbums }) {
  const [isHovering, setIsHovering] = useState(false);

  async function handleDelete() {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this image?'
    );
    if (!confirmDelete) return;

    try {
      const url = `${API_URL}/images/${data.id}`;

      // make delete request
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Failed to delete image: ${response.statusText}`);
      }
      const result = await response.json();

      console.log('Image deleted: ' + result);

      // refresh page
      refreshAlbums();

      return result;
    } catch (err) {
      console.error('Error deleting image:', err);
      alert('Something went wrong while deleting the image.');
    }
  }

  return (
    <div
      className={styles.imageContainer}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img src={data?.url || imageIcon} />
      {isHovering && (
        <div className={styles.overlay}>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            <img src={deleteIcon} alt="delete icon" />
          </button>
          <button className={styles.setCurrentBtn}>Set as Current Image</button>
        </div>
      )}
    </div>
  );
}
