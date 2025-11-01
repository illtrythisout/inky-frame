import styles from './viewAlbum.module.css';
import { useOutletContext, useParams } from 'react-router';
useOutletContext;

import ImageCard from '../components/album/ImageCard';

export default function ViewAlbum() {
  const { albums } = useOutletContext();
  const { albumId } = useParams();

  if (!albums || !albums.data) return;

  const album = albums.data.find((album) => album.id === Number(albumId));

  console.log(album);

  return (
    <div className="card">
      <h1>{albumId}</h1>
      <div className={styles.imagesContainer}>
        {!album ||
          album.images.map((image) => (
            <ImageCard data={image} key={image.id} />
          ))}
      </div>
    </div>
  );
}
