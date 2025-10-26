import styles from './albumsPage.module.css';
import AlbumCard from '../components/dashboard/AlbumCard';

export default function AlbumsPage() {
  return (
    <div className="card">
      <h1>All Albums</h1>
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
