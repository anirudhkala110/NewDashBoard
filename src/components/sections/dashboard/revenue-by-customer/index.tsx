import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import RateChip from 'components/chips/RateChip';
import DateSelect from 'components/dates/DateSelect';
import EChartsReactCore from 'echarts-for-react/lib/core';
import RevenueChartLegends from './RevenueChartLegends';
import RevenueChart from './RevenueChart';

const RevenueByCustomer = () => {
  const chartRef = useRef<EChartsReactCore>(null);
  const [revenueData, setRevenueData] = useState({
    categories: [],
    series: [],
  });
  const [timeFrame, setTimeFrame] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [previousView, setPreviousView] = useState(null);
  const [total, setTotal] = useState()
  const fetchSalesData = async (timeFrame: string) => {
    try {
      const price = await axios.get(`http://localhost:5021/total_price`);
      if (price) {
        setTotal(price.data.total)
      }
      const response = await axios.get(`http://localhost:5021/device_sales?timeFrame=${timeFrame}`);
      const { salesData } = response.data; // Destructure salesData from the response

      // Process salesData to aggregate total amounts per month and type
      const monthlyData = salesData.reduce((acc, item) => {
        const month = new Date(item.sellDate).toLocaleString('default', { month: 'short' });
        const typeKey = `Type ${item.type + 1}`;

        if (!acc[month]) {
          acc[month] = {
            month,
            'Type 1': 0,
            'Type 2': 0,
            'Type 3': 0,
          };
        }

        acc[month][typeKey] += item.price;
        // setTotal(total => total + acc[month][typeKey])

        return acc;
      }, {});

      // Extract categories (months) and series (data for each type)
      const categories = Object.keys(monthlyData).sort(); // Sort months chronologically
      const series = [
        {
          name: 'Type 1',
          data: categories.map(month => monthlyData[month]['Type 1']),
        },
        {
          name: 'Type 2',
          data: categories.map(month => monthlyData[month]['Type 2']),
        },
        {
          name: 'Type 3',
          data: categories.map(month => monthlyData[month]['Type 3']),
        },
      ];

      setRevenueData({ categories, series });
    } catch (err) {
      console.error('Error fetching sales data:', err);
    }
  };

  useEffect(() => {
    fetchSalesData(timeFrame);
  }, [timeFrame]);

  const handleBarClick = (month) => {
    setSelectedMonth(month); // Set the selected month to show detailed data
    setPreviousView({ categories: revenueData.categories, series: revenueData.series }); // Store previous view for navigation
  };

  const handleBackClick = () => {
    setSelectedMonth(null); // Reset selected month to go back to the main chart view
    setRevenueData(previousView); // Restore previous view data
  };

  // Calculate total price for the selected month
  const totalPrices = selectedMonth ? {
    'Type 1': revenueData.series[0].data[revenueData.categories.indexOf(selectedMonth)],
    'Type 2': revenueData.series[1].data[revenueData.categories.indexOf(selectedMonth)],
    'Type 3': revenueData.series[2].data[revenueData.categories.indexOf(selectedMonth)],
  } : null;

  return (
    <Paper sx={{ height: { xs: 700, md: 600 } }}>
      <Typography variant="subtitle1" color="text.secondary">
        <h2>
          Revenue by Type (Sell)
          <hr />
        </h2>
      </Typography>

      <Stack justifyContent="space-between" mt={1}>
        <Stack alignItems="center" gap={0.875}>
          {selectedMonth ? (
            <Typography variant="body2" fontWeight={600} letterSpacing={1}>
              {totalPrices && (
                <React.Fragment>
                  <h3>
                    Total Price for {selectedMonth}:{' '}
                    {parseInt(totalPrices['Type 1']) + parseInt(totalPrices['Type 2']) + parseInt(totalPrices['Type 3'])}₹
                  </h3>
                  <hr />
                  Type 1 - {totalPrices['Type 1']}₹
                  <hr />
                  Type 2 - {totalPrices['Type 2']}₹
                  <hr />
                  Type 3 - {totalPrices['Type 3']}₹
                </React.Fragment>
              )}
            </Typography>

          ) : (
            <Typography variant="h3" fontWeight={600} letterSpacing={1}>
              {/* Placeholder for total revenue */}
              Total Revenue: {total}
              <hr />
            </Typography>
          )}
          <RateChip rate={'14.8%'} isUp={true} />
        </Stack>

        <Stack alignItems="center" spacing={2}>
          <DateSelect onChange={setTimeFrame} />
        </Stack>
      </Stack>

      {/* <Box display={{ xs: 'block', md: 'none' }}>
        <RevenueChartLegends chartRef={chartRef} sm={true} />
      </Box> */}

      <Box height={400}>
        {selectedMonth ? (
          <Box>
            <Typography variant="body1" color="text.secondary">
              {selectedMonth}: Type 1 - {revenueData.series[0].data[revenueData.categories.indexOf(selectedMonth)]}, Type 2 - {revenueData.series[1].data[revenueData.categories.indexOf(selectedMonth)]}, Type 3 - {revenueData.series[2].data[revenueData.categories.indexOf(selectedMonth)]}
            </Typography>
            <button onClick={handleBackClick} className='btn-primary btn my-3'>Back</button>
          </Box>
        ) : (
          <RevenueChart chartRef={chartRef} data={revenueData} onClickBar={handleBarClick} />
        )}
      </Box>
    </Paper>
  );
};

export default RevenueByCustomer;
