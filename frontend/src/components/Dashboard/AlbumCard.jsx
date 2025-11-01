import styles from './albumCard.module.css';

import imageIcon from '../../assets/icons/image.svg';

export default function AlbumCard({ data }) {
  return (
    <div className={styles.albumCard}>
      <div className={styles.imageContainer}>
        <img src={data.images[0].url || imageIcon} />
      </div>
      <p className={styles.albumName}>{data.name}</p>
      <p>{`${data.images.length} images`}</p>
    </div>
  );
}
