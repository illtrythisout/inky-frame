import '../styles/card.css';

function Album({ id, name }) {
  return (
    <a href={`/albums/${id}`} className="card">
      <p>{name}</p>
    </a>
  );
}

export default Album;
