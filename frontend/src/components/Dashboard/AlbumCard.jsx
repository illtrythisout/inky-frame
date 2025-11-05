import styles from './albumCard.module.css';
import { useState } from 'react';

import imageIcon from '../../assets/icons/image.svg';
import deleteIcon from '../../assets/icons/delete.svg';

export default function AlbumCard({ data, refreshAlbums }) {
  const [isHovering, setIsHovering] = useState(false);

  async function handleDelete() {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this album?\n⚠️ NOTE: All images in the album will also be deleted'
    );
    if (!confirmDelete) return;

    try {
      const url = `http://localhost:3000/albums/${data.id}`;

      // make delete request
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Failed to delete album: ${response.statusText}`);
      }
      const result = await response.json();

      console.log('Album deleted: ', result);

      // refresh page
      refreshAlbums();

      return result;
    } catch (err) {
      console.error('Error deleting album:', err);
      alert('Something went wrong while deleting the album.');
    }
  }

  return (
    <div
      className={styles.albumCard}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={styles.imageContainer}>
        <img src={data.images?.[0]?.url || imageIcon} />
      </div>
      <p className={styles.albumName}>{data.name}</p>
      <p>{`${data.images.length} images`}</p>
      {/* delete overlay */}
      {isHovering && (
        <div className={styles.overlay}>
          <button className={styles.deleteBtn}>
            <img
              src={deleteIcon}
              alt="delete icon"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDelete();
              }}
            />
          </button>
        </div>
      )}
    </div>
  );
}
