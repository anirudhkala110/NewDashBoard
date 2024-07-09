import Grid from '@mui/material/Grid';
import TopCard from './TopCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cardsData = [
  {
    id: 1,
    title: 'Save Products',
    value: '5.8K',
    rate: '28.4%',
    isUp: true,
    icon: 'carbon:favorite-filled',
  },
  {
    id: 2,
    title: 'Stock Devices',
    value: '3.6K',
    rate: '12.6%',
    isUp: false,
    icon: 'solar:bag-bold',
  },
  {
    id: 3,
    title: 'Sale Devices',
    value: '76',
    rate: '3.1%',
    isUp: true,
    icon: 'ph:bag-simple-fill',
  },
  {
    id: 4,
    title: 'Average Revenue',
    value: '2.3K',
    rate: '11.3%',
    isUp: true,
    icon: 'mingcute:currency-dollar-2-line',
  },
];

const TopCards = () => {
  const [size, setSize] = useState()
  useEffect(() => {
    axios.get('http://localhost:5021/getAllData')
      .then(res => {
        console.log(res.data.data.length)
        setSize(res.data.data.length)
      })
      .catch(err => {
        console.log(err)
      })
  })
  return (
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      {cardsData.map((item) => {
        return (
          <TopCard
            key={item.id}
            title={item.title}
            value={`${size}k`}
            rate={item.rate}
            isUp={item.isUp}
            icon={item.icon}
          />
        );
      })}
    </Grid>
  );
};

export default TopCards;
