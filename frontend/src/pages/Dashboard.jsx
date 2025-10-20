import styles from './dashboard.module.css';

import CurrentImageCard from '../components/dashboard/CurrentImageCard';
import CurrentAlbumCard from '../components/dashboard/CurrentAlbumCard';
import TemperatureCard from '../components/Dashboard/TemperatureCard';
import AlbumsSection from '../components/Dashboard/AlbumsSection';

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
