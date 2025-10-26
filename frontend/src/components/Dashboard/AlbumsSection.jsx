import styles from './albumSection.module.css';

import AlbumCard from './AlbumCard';

const albums = [
  { name: 'Travel', numberOfImages: 13, id: 1 },
  { name: '2024', numberOfImages: 12, id: 2 },
  { name: 'Family', numberOfImages: 15, id: 3 },
  { name: 'Friends', numberOfImages: 18, id: 4 },
  { name: 'Hikes', numberOfImages: 8, id: 5 },
  { name: 'Uni', numberOfImages: 7, id: 6 },
];

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
