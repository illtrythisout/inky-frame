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

  // get current album
  const [currentAlbum, setCurrentAlbum] = useState([]);
  async function fetchCurrentAlbum() {
    try {
      const url = 'http://localhost:3000/display/album';

      const response = await fetch(url);
      const data = await response.json();

      setCurrentAlbum(data);
    } catch (err) {
      console.error('Error fetching current album:', err);
    }
  }

  // get current image
  const [currentImage, setCurrentImage] = useState([]);
  async function fetchCurrentImage() {
    try {
      const url = 'http://localhost:3000/display/image';

      const response = await fetch(url);
      const data = await response.json();

      setCurrentImage(data);
    } catch (err) {
      console.error('Error fetching current image:', err);
    }
  }

  // call on initial load
  useEffect(() => {
    fetchAlbums();
    fetchCurrentAlbum();
    fetchCurrentImage();
  }, []);

  return (
    <div className="app">
      <Sidebar />
      <Outlet
        context={{
          albums,
          refreshAlbums: fetchAlbums,
          currentAlbum,
          currentImage,
        }}
      />
    </div>
  );
}
