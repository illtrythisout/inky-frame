import styles from './dashboard.module.css';

import CurrentImageCard from '../components/dashboard/CurrentImageCard';
import CurrentAlbumCard from '../components/dashboard/CurrentAlbumCard';
import TemperatureCard from '../components/dashboard/TemperatureCard';
import AlbumsSection from '../components/dashboard/AlbumsSection';

export default function Dashboard() {
  return (
    <div id={styles.page}>
      <CurrentImageCard />
      <CurrentAlbumCard />
      <TemperatureCard />
      <AlbumsSection />
    </div>
  );
}
