import { useState, useEffect } from 'react';
import axios from 'axios';
import { GridRowsProp } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import { DataGrid, GridColDef, GridRowParams, GridEventListener } from '@mui/x-data-grid';

import './Main.css';
import { PhoneIphone } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

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
// const parseAddress = (address: string) => {
//   const latLonRegex = /Latitude:\s*([0-9.]+)\s*\|\s*Longitude:\s*([0-9.]+)/;
//   const match = address.match(latLonRegex);
//   if (match) {
//     return {
//       latitude: parseFloat(match[1]),
//       longitude: parseFloat(match[2]),
//       address: address.replace(latLonRegex, '').trim(),
//     };
//   }
//   return { latitude: null, longitude: null, address };
// };

const useOrdersStatusData = () => {
  const [data, setData] = useState<GridRowsProp<OrderRow>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<{ data: OrderRow[] }>('http://localhost:5021/getAllData');
        const processedData = res.data.data.map((item) => {
          // const { latitude, longitude, address } = parseAddress(item.address);
          return { ...item };
        });
        // console.log(processedData)
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
  const [openInfo, setOpenInfo] = useState(false);
  const [userData, setUserData] = useState();

  const columns: GridColDef[] = [
    { field: 'userID', headerName: 'User ID', minWidth: 150, flex: 1, resizable: false },
    { field: 'username', headerName: 'User Name', minWidth: 200, flex: 2, resizable: false },
    { field: 'role', headerName: 'Role', minWidth: 200, flex: 2, resizable: false },
    { field: 'email', headerName: 'Email', minWidth: 120, flex: 1, resizable: false },
    { field: 'phone', headerName: 'Phone', minWidth: 120, flex: 1, resizable: false },
    { field: 'verified', headerName: 'Verified', minWidth: 100, flex: 1, resizable: false },
    // { field: 'd_report', headerName: 'Device Report', minWidth: 100, flex: 1, resizable: false },
    // { field: 'userLinked', headerName: 'User Linked', minWidth: 120, flex: 1, resizable: false },
    // { field: 'data', headerName: 'Data', minWidth: 100, flex: 1, resizable: false },
  ];

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const { userID } = params.row;
    alert(`Row clicked with ID: ${userID}`);
    // You can call your axios function or any other logic here
    axios.post(`http://localhost:5021/get_user_data_by_userID/${userID}`, { userId: userID })
      .then(res => {
        console.log(res);
        setUserData(res.data.user); // Assuming the response data is an array
        setOpenInfo(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Custom renderCell function to apply styling based on d_report field
  const renderCell = (params: GridRowParams<OrderRow>) => {
    const isReportChecked = params.row.verified; // Adjust condition based on your data

    // Ensure params.field is of type keyof OrderRow to avoid type errors
    const field = params.field as keyof OrderRow;
    const status = ['Check', 'warn', 'stop', 'error'];
    const [stat, setStat] = useState();
    const handleStatus = () => {
      console.log(status, stat);
      axios.post('http://localhost:5021/update-status', { stat: stat })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    };
    return (
      <div className={isReportChecked === 1 ? 'btn btn-outline-success px-4' : isReportChecked === 'warn' ? 'btn-outline-warning btn px-4' : 'btn-outline-danger btn px-4'} style={{ background: '', color: '', width: '', textAlign: 'start', paddingLeft: '3px' }}>
        <b onClick={e => setStat(!stat)} className='text-uppercase' style={{ fontSize: '14px' }}>
          {params.row[field] == 1 ? <i className="bi fs-5 bi-patch-check-fill"></i> : <i className="bi fs-5 bi-ban-fill"></i>}
        </b>
      </div>
    );
  };

  return (
    <div className='py-2'>
      <DataGrid
        rows={rows}
        columns={columns.map((column) => ({
          ...column,
          renderCell: column.field === 'verified' ? renderCell : undefined, // Apply custom renderCell for d_report column
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
        onRowClick={handleRowClick}
        className=''
        slots={{
          footer: DataGridFooter,
        }}
      />
      {openInfo && (
        <div className='container-fluid my-4 w-100 border border-dark rounded p-3' style={{ background: '#0B1739' }}>
          <center className='fs-4 fs-bold' >Information {userData.username}</center>
          <div className='row'>
            <div className='col-sm-12 col-lg-6 col-md-6'>
              <table>
                <thead>
                  <th>
                    Name
                  </th>
                  <th>
                    {userData.username}
                  </th>
                </thead>
                <tbody>
                  <td>
                    <tr>
                      <span className='fw-bold fs-6'>Name: {userData.username}</span><br />
                    </tr>
                    <tr>
                      <span className='fw-bold fs-6'>User ID: {userData.userID}</span><br />
                    </tr>
                    <tr>
                      <span className='fw-bold fs-6'>Role: {userData.role}</span><br />
                    </tr>
                    <tr>
                      <span className='fw-bold fs-6'>Email: {userData.email}</span><br />
                    </tr>
                    <tr>
                      <span className='fw-bold fs-6'>Phone: {userData.phone}</span><br />
                    </tr>
                  </td>
                </tbody>
              </table>
            </div>
            <div className='col-sm-12 col-lg-6 col-md-6'>
              <img className='img-thumbnail' src='https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg' style={{ width: '100%', maxWidth: '300px', maxHeight: '300px', height: '100%' }} />
            </div>
          </div>
          {/* <i className='bi bi-circle-fill me-3'></i> */}
          <strong className='fs-5 '>Permissions:</strong>
          <ul>
            <li>Self Editing: {userData.editSelf ? 'Yes' : 'No'}</li>
            <li>Owner Editing: {userData.editOwner ? 'Yes' : 'No'}</li>
            <li>Admin Editing: {userData.editAdmin ? 'Yes' : 'No'}</li>
            <li>Customer Editing: {userData.editCustomers ? 'Yes' : 'No'}</li>
          </ul>
          <button className='btn btn-dark my-2 w-50'>All Devices Information</button>
          <button className='btn btn-success my-2 w-50'>All Relays Information</button>
        </div>
      )}
    </div>
  );
};

export default OrdersStatusTable;
