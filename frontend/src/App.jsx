import './index.css';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import Sidebar from './components/sidebar/Sidebar';

export default function App() {
  // get all albums
  const [albums, setAlbums] = useState([]);
  async function fetchAlbums() {
    try {
      const url = 'http://localhost:3000/albums';

      const response = await fetch(url);
      const data = await response.json();

      setAlbums(data);
    } catch (err) {
      console.error('Error fetching albums:', err);
    }
  }

  // call on initial load
  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="app">
      <Sidebar />
      <Outlet context={{ albums, refreshAlbums: fetchAlbums }} />
    </div>
  );
}
