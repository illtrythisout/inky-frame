import styles from './albumSection.module.css';

import AlbumCard from './AlbumCard';

export default function AlbumsSection() {
  return (
    <div className={`card ${styles.albumSection}`}>
      <div className={styles.header}>
        <h3>Albums Section</h3>
        <button>Create Album</button>
      </div>
      <div className={styles.albums}>
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
      </div>
    </div>
  );
}
