import styles from './currentAlbumCard.module.css';

import imageIcon from '../../assets/icons/image.svg';

export default function CurrentAlbumCard() {
  return (
    <div className={`card ${styles.widget}`}>
      <div className={styles.imageContainer}>
        <img src={imageIcon} alt="Current Album" />
      </div>
      <div className={styles.albumDescription}>
        <p className={styles.albumName}>Travel</p>
        <p className={styles.numberOfImages}>Image 12 of 13</p>
      </div>
      <h3 className={styles.description}>Current Album</h3>
    </div>
  );
}
