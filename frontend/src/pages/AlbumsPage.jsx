import styles from './albumsPage.module.css';
import { useOutletContext } from 'react-router';
import { Link } from 'react-router';

import AlbumCard from '../components/dashboard/AlbumCard';

export default function AlbumsPage() {
  const context = useOutletContext();
  const albums = context.albums.data;
  return (
    <div className="card">
      <h1>All Albums</h1>
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
