import { fontFamily } from 'theme/typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import iPhone from 'assets/images/iPhone.png';
// import AWS8 from 'assets/images/AWS8.png';
import Product from './Product';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5021/getAllData')
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.log('Error fetching data:', err);
      });
  }, []); // Ensure useEffect runs only once by passing an empty dependency array

  return (
    <Stack direction="column" gap={3.75} component={Paper} height={300} padding={2} style={{overflow:'auto'}}>
      <Typography variant="h6" fontWeight={400} fontFamily={fontFamily.workSans}>
        Devices
      </Typography>

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="caption" fontWeight={400}>
          Devices
        </Typography>
        <Typography variant="caption" fontWeight={400}>
          Price
        </Typography>
      </Stack>

      {/* Render products from static data and fetched data */}
      {data.map((item) => (
        <Product key={item} item={item} />
      ))}
    </Stack>
  );
};

export default Products;
