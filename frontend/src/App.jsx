import './styles/app.css';
import Album from './components/Album';
import AddItem from './components/Add-Item';

function App() {
  const albums = [
    { name: 'Bla', id: 1 },
    { name: 'Bla', id: 2 },
    { name: 'Bla', id: 3 },
    { name: 'Bla', id: 4 },
    { name: 'Bla', id: 5 },
    { name: 'Bla', id: 6 },
    { name: 'Bla', id: 7 },
    { name: 'Bla', id: 8 },
    { name: 'Bla', id: 9 },
  ];

  return (
    <>
      <h1>Inky Frame</h1>
      <section id="albums">
        <h2>Albums</h2>
        <div className="wrapper">
          {albums.map((album) => {
            return <Album key={album.id} {...album} />;
          })}
          <AddItem itemToAdd="album" />
        </div>
      </section>
    </>
  );
}

export default App;
