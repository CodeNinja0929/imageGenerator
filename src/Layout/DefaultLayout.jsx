import Navbar from '@/pages/Navbar';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <>
      <header className="font-inter">
        <Navbar />
      </header>
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  );
};

export default DefaultLayout;
