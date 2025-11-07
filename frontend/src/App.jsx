import './index.css';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import Sidebar from './components/sidebar/Sidebar';

// get env variables
const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  // get all albums
  const [albums, setAlbums] = useState([]);
  async function fetchAlbums() {
    try {
      const url = `${API_URL}/albums`;

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
      const url = `${API_URL}/display/album`;

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
      const url = `${API_URL}/display/image`;

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
