import styles from './albumsPage.module.css';
import { useOutletContext } from 'react-router';
import { Link } from 'react-router';
import { useRef } from 'react';

import AlbumCard from '../components/dashboard/AlbumCard';

export default function AlbumsPage() {
  const context = useOutletContext();
  const albums = context.albums.data;
  const refreshAlbums = context.refreshAlbums;

  const dialogRef = useRef(null);
  const nameInputRef = useRef(null);

  function openDialog() {
    dialogRef.current?.showModal();
  }
  function closeDialog() {
    dialogRef.current?.close();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const albumName = nameInputRef.current.value.trim();
    if (!albumName) return;

    try {
      const response = await fetch('http://localhost:3000/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: albumName }),
      });

      if (!response.ok) throw new Error('Failed to create album');

      console.log('Album created successfully');

      await refreshAlbums();
    } catch (err) {
      console.error(err);
    } finally {
      closeDialog();
      e.target.reset();
    }
  }

  return (
    <>
      <div className={`card ${styles.albumSection}`}>
        <div className={styles.header}>
          <h1>All Albums</h1>
          <button onClick={openDialog}>Create Album</button>
        </div>

        <div className={styles.albums}>
          {!albums ||
            albums.map((album) => (
              <Link to={`/albums/${album.id}`} key={album.id}>
                <AlbumCard data={album} />
              </Link>
            ))}
        </div>
      </div>

      <dialog ref={dialogRef} className="dialog">
        <p>Create Album</p>
        <form onSubmit={handleSubmit}>
          <input
            ref={nameInputRef}
            type="text"
            name="name"
            id="albumName"
            placeholder="Album name"
            required
          />
          <div className="dialogButtons">
            <button type="button" onClick={closeDialog}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
