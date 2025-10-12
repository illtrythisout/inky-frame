import '../styles/card.css';

function AddItem({ itemToAdd }) {
  return (
    <button onClick={console.log(`Add ${itemToAdd}`)} className="card">
      <p>+</p>
    </button>
  );
}

export default AddItem;
