import App from './App';
import AlbumsPage from './pages/AlbumsPage';
import Dashboard from './pages/Dashboard';
import ViewAlbum from './pages/ViewAlbum';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'albums', element: <AlbumsPage /> },
      { path: 'albums/:albumId', element: <ViewAlbum /> },
    ],
  },
];

export default routes;
