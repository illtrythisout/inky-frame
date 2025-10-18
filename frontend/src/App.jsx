import './index.css';
import { Outlet } from 'react-router';
import Sidebar from './components/Sidebar/Sidebar';

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <Outlet />
    </div>
  );
}
