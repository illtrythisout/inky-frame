import { useRef } from 'react';
import styles from './albumSection.module.css';
import { Link } from 'react-router';
import AlbumCard from './AlbumCard';
// get env variables
const API_URL = import.meta.env.VITE_API_URL;

export default function AlbumsSection({ albums, refreshAlbums }) {
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
      const response = await fetch(`${API_URL}/albums`, {
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
          <h3>Album Selection</h3>
          <button onClick={openDialog}>Create Album</button>
        </div>

        <div className={styles.albums}>
          {!albums ||
            albums.map((album) => (
              <Link to={`/albums/${album.id}`} key={album.id}>
                <AlbumCard data={album} refreshAlbums={refreshAlbums} />
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
