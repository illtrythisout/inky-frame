import '../styles/card.css';

function addAlbum(name) {
  return name;
}

function AddItem({ itemToAdd }) {
  console.log(itemToAdd);
  return (
    <button onClick={addAlbum()} className="card">
      <p>+</p>
    </button>
  );
}

export default AddItem;
