import { useEffect, useRef, useState } from 'react';
import { fontFamily } from 'theme/typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import IconifyIcon from 'components/base/IconifyIcon';
import EChartsReactCore from 'echarts-for-react/lib/core';
import VisitorsChartLegends from './VisitorsChartLegends';
import VisitorsChart from './VisitorsChart';
import axios from 'axios';
axios.defaults.withCredentials = true
const WebsiteVisitors = () => {
  const chartRef = useRef<EChartsReactCore>(null);
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    axios.get('https://dashadmin.nayar-valley-home-stay.in/get_device_data')
      .then(res => {
        console.log(res.data)
        const data = res.data.totalDevice.filter((device: { sell: number; }) => device.sell === 1); // Only sold devices
        setDeviceData(data);
      })
      .catch(err => {
        console.error('Error fetching device data:', err);
      });
  }, []);

  return (
    <Paper sx={{ height: 550 }}>
      {/* header */}
      <Stack alignItems="center" justifyContent="space-between" mb={-2}>
        <Typography variant="h1" fontWeight={400} fontFamily={fontFamily.workSans}>
          Sold Devices
        </Typography>
        <br />
        {/* <Button
          variant="contained"
          color="secondary"
          size="medium"
          endIcon={<IconifyIcon icon="mingcute:arrow-down-line" />}
          sx={{ py: 0.875, zIndex: 500 }}
        >
          Export
        </Button> */}
      </Stack>

      {/* polar bar chart */}
      <div className='text-white'>
        <hr/>
        <VisitorsChart chartRef={chartRef} deviceData={deviceData} />
      </div>

      {/* legends */}
      <VisitorsChartLegends chartRef={chartRef} deviceData={deviceData} />
    </Paper>
  );
};

export default WebsiteVisitors;
