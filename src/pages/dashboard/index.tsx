import Grid from '@mui/material/Grid';
import TopCards from 'components/sections/dashboard/top-cards';
import WebsiteVisitors from 'components/sections/dashboard/website-visitors';
import RevenueByCustomer from 'components/sections/dashboard/revenue-by-customer';
import Products from 'components/sections/dashboard/products';
// import CompletedTask from 'components/sections/dashboard/completed-task';
import OrdersStatus from 'components/sections/dashboard/orders-status';
import axios from 'axios';
import { useState } from 'react';
import { useUser } from 'routes/context/UserContext';
import Login from 'pages/authentication/Login';
import Signup from 'pages/authentication/Signup';
// import Signup from 'pages/authentication/Signup';

axios.defaults.withCredentials = true
const Dashboard = () => {
  const userData = useUser()
  const [login, setLogin] = useState<any>(userData.user.login)
  const [signUp, setSingup] = useState(true)
  // console.log(login)
  // setLogin(userData.user.login)
  return (
    <>
      {login ? <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
        <Grid item xs={12}>
          <TopCards />
        </Grid>

        <Grid item xs={12} xl={4}>
          <WebsiteVisitors />
        </Grid>

        <Grid item xs={12} xl={8}>
          <RevenueByCustomer />
        </Grid>

        <Grid item xs={12} xl={4}>
          <Products />
        </Grid>

        {/* <Grid item xs={12} xl={8}>
        <CompletedTask />
      </Grid> */}

        
      </Grid> : <div className='d-flex align-items-center justify-content-center ' style={{ height: '85vh' }}>
        <div className='rounded p-2' style={{ minHeight: '320px', minWidth: '300px',background:'#0a0e3b' }}>
          <div className='d-flex'>
            <button className='btn w-50 mx-1' style={{ background: `${signUp ? '#7F25FB' : '#2055B6'}`, color: `${signUp ? 'white' : 'black'}`, cursor: `${signUp ? 'progress' : 'pointer'}`, fontWeight: 'bolder' }} onClick={() => setSingup(true)}>Login</button>
            <button className='btn w-50 mx-1' style={{ background: `${!signUp ? '#7F25FB' : '#2055B6'}`, color: `${!signUp ? 'white' : 'black'}`, cursor: `${!signUp ? 'progress' : 'pointer'}`, fontWeight: 'bolder' }} onClick={() => setSingup(false)}>Sign Up</button>
          </div>
          <hr />
          {signUp ? <Login /> : <Signup />}
        </div>
      </div>}
    </>
  );
};

export default Dashboard;
