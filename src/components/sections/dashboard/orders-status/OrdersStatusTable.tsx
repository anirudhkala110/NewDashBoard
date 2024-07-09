import { useState, useEffect } from 'react';
import axios from 'axios';
import { GridRowsProp } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

import './Main.css';

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
        const res = await axios.get<{ data: OrderRow[] }>('http://localhost:5021/getAllData');
        const processedData = res.data.data.map((item) => {
          const { latitude, longitude, address } = parseAddress(item.address);
          return { ...item, latitude, longitude, address };
        });
        setData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return data;
};

const OrdersStatusTable = () => {
  const rows = useOrdersStatusData();

  const columns: GridColDef[] = [
    { field: 'barcode', headerName: 'Barcode', minWidth: 150, flex: 1, resizable: false },
    { field: 'address', headerName: 'Address', minWidth: 200, flex: 2, resizable: false },
    { field: 'latitude', headerName: 'Latitude', minWidth: 120, flex: 1, resizable: false },
    { field: 'longitude', headerName: 'Longitude', minWidth: 120, flex: 1, resizable: false },
    { field: 'version', headerName: 'Version', minWidth: 100, flex: 1, resizable: false },
    { field: 'd_report', headerName: 'Device Report', minWidth: 100, flex: 1, resizable: false },
    { field: 'userLinked', headerName: 'User Linked', minWidth: 120, flex: 1, resizable: false },
    { field: 'data', headerName: 'Data', minWidth: 100, flex: 1, resizable: false },
  ];

  // Custom renderCell function to apply styling based on d_report field
  const renderCell = (params: GridRowParams<OrderRow>) => {
    const isReportChecked = params.row.d_report ; // Adjust condition based on your data

    // Ensure params.field is of type keyof OrderRow to avoid type errors
    const field = params.field as keyof OrderRow;

    return (
      <div className={isReportChecked==='Check' ? 'btn btn-outline-success p-1 w-100' :isReportChecked==='warn' ? 'btn-outline-warning w-100 btn p-1': 'btn-outline-danger btn w-100 p-1'} style={{background:'',color:''}}>
        {params.row[field]}
      </div>
    );
  };

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns.map((column) => ({
          ...column,
          renderCell: column.field === 'd_report' ? renderCell : undefined, // Apply custom renderCell for d_report column
        }))}
        rowHeight={50}
        editMode="row"
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        checkboxSelection
        pageSizeOptions={[10]}
        disableColumnMenu={false}
        disableVirtualization={true}
        disableRowSelectionOnClick={true}
        className=''
        slots={{
          footer: DataGridFooter,
        }}
      />
    </>
  );
};

export default OrdersStatusTable;
