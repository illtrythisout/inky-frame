import styles from './albumSection.module.css';
import { Link } from 'react-router';

import AlbumCard from './AlbumCard';

export default function AlbumsSection({ albums }) {
  console.log('From the albums section: ', albums);
  return (
    <div className={`card ${styles.albumSection}`}>
      <div className={styles.header}>
        <h3>Albums Section</h3>
        <button>Create Album</button>
      </div>
      <div className={styles.albums}>
        {!albums ||
          albums.map((album) => {
            return (
              <Link to={`/albums/${album.id}`}>
                <AlbumCard key={album.id} data={album} />
              </Link>
            );
          })}
      </div>
    </div>
  );
}
