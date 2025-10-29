import styles from './imageCard.module.css';
import { useState } from 'react';

import imageIcon from '../../assets/icons/image.svg';
import deleteIcon from '../../assets/icons/delete.svg';

export default function ImageCard() {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      className={styles.imageContainer}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img src={imageIcon} />
      {isHovering && (
        <div className={styles.overlay}>
          <button className={styles.deleteBtn}>
            <img src={deleteIcon} alt="delete icon" />
          </button>
          <button className={styles.setCurrentBtn}>Set as Current Image</button>
        </div>
      )}
    </div>
  );
}
