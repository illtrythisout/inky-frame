import styles from './viewAlbum.module.css';
import { useParams } from 'react-router';

import ImageCard from '../components/album/ImageCard';

export default function ViewAlbum() {
  const { albumId } = useParams();

  return (
    <div className="card">
      <h1>{albumId}</h1>
      <div className={styles.imagesContainer}>
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
      </div>
    </div>
  );
}
