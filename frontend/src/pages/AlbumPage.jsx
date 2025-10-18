import { useParams } from 'react-router';

export default function AlbumPage() {
  const { albumId } = useParams();

  return (
    <div className="card">
      <h1>The Album Page</h1>
      <p>{albumId}</p>
    </div>
  );
}
