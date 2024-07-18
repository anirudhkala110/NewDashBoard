import { Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [data, setData] = useState({ msg: '', type1_count: 0, type2_count: 0, type3_count: 0 });

  useEffect(() => {
    axios.get('https://dashadmin.nayar-valley-home-stay.in/get_all_device_data')
      .then(res => {
        // console.log("Data fetched:", res.data);
        setData(res.data); // Assuming res.data contains { msg: 'Backend Connected...', type1_count: 20, type2_count: 20, type3_count: 20 }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []); // Empty dependency array to run useEffect only once

  return (
    <Paper elevation={3} style={{ padding: '20px', overflow: 'auto' }}>
      <Typography variant="h4" fontWeight="bold">
        Devices
      </Typography>
      <br/>
      <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="subtitle2" fontWeight="bold">Devices</Typography>
        <Typography variant="subtitle2" fontWeight="bold">Stock Sell </Typography>
      </Stack>
      <hr />

      {/* <Typography variant="body1">
        Devices
      </Typography> */}

      <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="subtitle2">Device Type 1</Typography>
        <Typography variant="subtitle2">{data.type1_count ? data.type1_count : 0} </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="subtitle2">Device Type 2</Typography>
        <Typography variant="subtitle2">{data.type2_count ? data.type2_count : 0}</Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="subtitle2">Device Type 3 </Typography>
        <Typography variant="subtitle2">{data.type3_count ? data.type3_count : 0}</Typography>
      </Stack>
    </Paper>
  );
};

export default Products;
