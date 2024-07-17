// import DataBackend from 'components/sections/dashboard/orders-status/DataBackend';
import Footer from 'layouts/main-layout/Footer';
import { Outlet } from 'react-router-dom';
// import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';

const App = () => {
  // return <DataBackend />;
  return (
    <div className='' style={{ minWidth: '400px' }}>
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
