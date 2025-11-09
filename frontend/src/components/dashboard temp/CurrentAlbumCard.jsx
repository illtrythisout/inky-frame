import styles from './currentAlbumCard.module.css';

import imageIcon from '../../assets/icons/image.svg';

export default function CurrentAlbumCard({ currentAlbum, currentImage }) {
  // find index of current image in album
  let currentImageIndex = undefined;
  if (currentAlbum.data && currentImage.data) {
    currentAlbum.data.images.forEach((image, i) => {
      currentImageIndex =
        image.id === currentImage.data.id ? i : currentImageIndex;
    });
  }

  return (
    <div className={`card ${styles.widget}`}>
      <div className={styles.imageContainer}>
        <img
          src={currentAlbum?.data?.images[0]?.url || imageIcon}
          alt="Current Album"
        />
      </div>
      <div className={styles.albumDescription}>
        <p className={styles.albumName}>
          {currentAlbum?.data?.name || 'idk 🤷‍♂️'}
        </p>
        <p className={styles.numberOfImages}>{`Image ${
          currentImageIndex + 1
        } of ${currentAlbum?.data?.images.length}`}</p>
      </div>
      <h3 className={styles.description}>Current Album</h3>
    </div>
  );
}
