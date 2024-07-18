import { useState, useEffect } from 'react';
import axios from 'axios';
import { GridRowsProp } from '@mui/x-data-grid';

// Define the interface for the new data structure
export interface OrderRow {
  id: number;
  barcode: number;
  address: string;
  latitude: number | null;
  longitude: number | null;
  version: number;
  d_report: string;
  userLinked: string;
  data: string;
}

// Function to parse the address field and extract latitude and longitude
const parseAddress = (address: string) => {
  const latLonRegex = /Latitude:\s*([0-9.]+)\s*\|\s*Longitude:\s*([0-9.]+)/;
  const match = address.match(latLonRegex);
  if (match) {
    return {
      latitude: parseFloat(match[1]),
      longitude: parseFloat(match[2]),
      address: address.replace(latLonRegex, '').trim(),
    };
  }
  return { latitude: null, longitude: null, address };
};

const useOrdersStatusData = () => {
  const [data, setData] = useState<GridRowsProp<OrderRow>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<{ data: OrderRow[] }>('https://dashadmin.nayar-valley-home-stay.in/getAllData');
        console.log(res)
        const processedData = res.data.data.map((item) => {
          const { latitude, longitude, address } = parseAddress(item.address);
          return { ...item, latitude, longitude, address };
        });
        console.log("processedData : ",processedData);
        setData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return data;
};

export default useOrdersStatusData;
