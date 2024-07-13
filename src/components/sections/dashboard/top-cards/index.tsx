import Grid from '@mui/material/Grid';
import TopCard from './TopCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TopCards = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDevices, setTotalDevices] = useState(0);
  const [totalRelays, setTotalRelays] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5021/get_users_devices_relays')
      .then(res => {
        const data = res.data;
        // console.log(data)
        setTotalUsers(data.totalUsers || 0);
        setTotalDevices(data.totalDevices || 0);
        setTotalRelays(data.totalRelays || 0);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  return (
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TopCard
          title="Total Users"
          value={`${totalUsers}`}
          icon="carbon:user-avatar"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TopCard
          title="Total Devices"
          value={`${totalDevices}`}
          icon="solar:bag-bold"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TopCard
          title="Total Relays"
          value={`${totalRelays}`}
          icon="ph:electric-plug-fill"
        />
      </Grid>
    </Grid>
  );
};

export default TopCards;
