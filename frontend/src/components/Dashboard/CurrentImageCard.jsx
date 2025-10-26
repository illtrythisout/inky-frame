import styles from './currentImageCard.module.css';

import imageIcon from '../../assets/icons/image.svg';

export default function CurrentImageCard() {
  return (
    <div className={`card ${styles.widget}`}>
      <div className={styles.imageContainer}>
        <img src={imageIcon} alt="Current Image" />
      </div>
      <h3>Current Image</h3>
    </div>
  );
}
