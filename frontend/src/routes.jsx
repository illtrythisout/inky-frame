import App from './App';
import AlbumsPage from './pages/AlbumsPage';
import Dashboard from './pages/Dashboard';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/albums/:albumId?', element: <AlbumsPage /> },
    ],
  },
];

export default routes;
