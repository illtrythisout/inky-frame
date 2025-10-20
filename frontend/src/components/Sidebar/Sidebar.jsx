import styles from './sidebar.module.css';
import { Link } from 'react-router';

// assets
import inkyIcon from '../../assets/inky.svg';
import dashboardIcon from '../../assets/icons/dashboard.svg';
import albumsIcon from '../../assets/icons/albums.svg';
import settingsIcon from '../../assets/icons/settings.svg';

export default function Sidebar() {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.logoContainer}>
        <img src={inkyIcon} alt="Inky Logo" className={styles.logo} />
        <h1>Inky</h1>
      </div>
      <Link to="/">
        <img src={dashboardIcon} alt="dashboard" />
        <p>Dashboard</p>
      </Link>
      <Link to="/albums">
        <img src={albumsIcon} alt="albums" />
        <p>Albums</p>
      </Link>
      <Link to="/settings">
        <img src={settingsIcon} alt="settings" />
        <p>Settings</p>
      </Link>
      <h2 className={styles.brandTitle}>Inky Frame</h2>
    </div>
  );
}
