import App from './App';
import AlbumPage from './pages/AlbumPage';
import Dashboard from './pages/Dashboard';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/albums/:albumId?', element: <AlbumPage /> },
    ],
  },
];

export default routes;
