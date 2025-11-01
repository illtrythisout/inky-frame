import styles from './dashboard.module.css';
import { useOutletContext } from 'react-router';

import CurrentImageCard from '../components/dashboard/CurrentImageCard';
import CurrentAlbumCard from '../components/dashboard/CurrentAlbumCard';
import TemperatureCard from '../components/dashboard/TemperatureCard';
import AlbumsSection from '../components/dashboard/AlbumsSection';

export default function Dashboard() {
  const context = useOutletContext();
  return (
    <div id={styles.page}>
      <CurrentImageCard />
      <CurrentAlbumCard />
      <TemperatureCard />
      <AlbumsSection
        albums={context.albums.data}
        refreshAlbums={context.refreshAlbums}
      />
    </div>
  );
}
