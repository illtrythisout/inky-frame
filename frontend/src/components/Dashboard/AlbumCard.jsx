import styles from './albumCard.module.css';

import imageIcon from '../../assets/icons/image.svg';

export default function AlbumCard() {
  return (
    <div className={styles.albumCard}>
      <div className={styles.imageContainer}>
        <img src={imageIcon} />
      </div>
      <p className={styles.albumName}>New Album</p>
      <p>13 images</p>
    </div>
  );
}
