import styles from './albumSection.module.css';
import { Link } from 'react-router';

import AlbumCard from './AlbumCard';

const albumId = 3;

export default function AlbumsSection() {
  return (
    <div className={`card ${styles.albumSection}`}>
      <div className={styles.header}>
        <h3>Albums Section</h3>
        <button>Create Album</button>
      </div>
      <div className={styles.albums}>
        <Link to={`/albums/${albumId}`}>
          <AlbumCard />
        </Link>
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
