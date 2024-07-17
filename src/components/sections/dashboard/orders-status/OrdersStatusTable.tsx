import { useState, useEffect } from 'react';
import axios from 'axios';
import { GridRowsProp } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import { DataGrid, GridColDef, GridRowParams, GridEventListener } from '@mui/x-data-grid';

import './Main.css';
import { PhoneIphone } from '@mui/icons-material';

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

const useOrdersStatusData = () => {
  const [data, setData] = useState<GridRowsProp<OrderRow>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<{ data: OrderRow[] }>('http://localhost:5021/getAllData');
        const processedData = res.data.data.map((item) => {
          return { ...item };
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
  const [openInfo, setOpenInfo] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const columns: GridColDef[] = [
    { field: 'userID', headerName: 'User ID', minWidth: 150, flex: 1, resizable: false },
    { field: 'username', headerName: 'User Name', minWidth: 200, flex: 2, resizable: false },
    { field: 'role', headerName: 'Role', minWidth: 200, flex: 2, resizable: false },
    { field: 'email', headerName: 'Email', minWidth: 120, flex: 1, resizable: false },
    { field: 'phone', headerName: 'Phone', minWidth: 120, flex: 1, resizable: false },
    { field: 'verified', headerName: 'Verified', minWidth: 100, flex: 1, resizable: false },
  ];

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const { userID } = params.row;
    axios.post(`http://localhost:5021/get_user_data_by_userID/${userID}`, { userId: userID })
      .then(res => {
        setUserData(res.data.user); // Assuming the response data is an array
        setOpenInfo(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderCell = (params: GridRowParams<OrderRow>) => {
    const isReportChecked = params.row.verified;
    const field = params.field as keyof OrderRow;
    const [stat, setStat] = useState<boolean | undefined>();


    return (
      <div
        className={isReportChecked === 1 ? 'btn btn-outline-success px-4' : isReportChecked === 'warn' ? 'btn-outline-warning btn px-4' : 'btn-outline-danger btn px-4'}
        style={{ background: '', color: '', width: '', textAlign: 'start', paddingLeft: '3px' }}
      >
        <b onClick={() => setStat(!stat)} className='text-uppercase' style={{ fontSize: '14px' }}>
          {params.row[field] === 1 ? <i className="bi fs-5 bi-patch-check-fill"></i> : <i className="bi fs-5 bi-ban-fill"></i>}
        </b>
      </div>
    );
  };

  const [allDevicesOpen, setAllDevicesOpen] = useState(false);
  const [allDevices, setAllDevices] = useState<any[]>([]);
  const [allRelays, setAllRelays] = useState<any[]>([]);
  const [allRelaysOpen, setAllRelaysOpen] = useState(false);

  const handleAllDevices = (userID: any) => {
    axios.get(`http://localhost:5021/get_specific_users_connected_devices/${userID}`)
      .then(res => {
        setAllDevices(res.data.totalDevice);
        setAllDevicesOpen(true);
        setOpenInfo(false);
        setAllRelaysOpen(false);
        console.log(res.data.totalDevice)
      })
      .catch(err => console.log(err));
  };

  const handleAllRelays = (userID: any) => {
    axios.get(`http://localhost:5021/get_specific_users_relay_data/${userID}`)
      .then(res => {
        setAllRelays(res.data.relayData);
        setAllRelaysOpen(true);
        setOpenInfo(false);
        setAllDevicesOpen(false);
        console.log(res.data.relayData)
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='py-2'>
      {!openInfo && !allDevicesOpen && !allRelaysOpen && <DataGrid
        rows={rows}
        columns={columns.map((column) => ({
          ...column,
          renderCell: column.field === 'verified' ? renderCell : undefined,
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
      />}
      {openInfo && <button className='btn px-3 mx-0 rounded-0 fs-4 fw-bold w-100 text-white' style={{ background: "#070F25" }} onClick={() => setOpenInfo(!openInfo)}>Close</button>}
      {allDevicesOpen && <button className='btn px-3 mx-0 rounded-0 fs-4 fw-bold w-100 text-white' style={{ background: "#070F25" }} onClick={() => setAllDevicesOpen(!allDevicesOpen)}>Close</button>}
      {allRelaysOpen && <button className='btn px-3 mx-0 rounded-0 fs-4 fw-bold w-100 text-white' style={{ background: "#070F25" }} onClick={() => setAllRelaysOpen(!allRelaysOpen)}>Close</button>}
      {openInfo && userData && (
        <div className='container-fluid my-4 w-100 border border-dark rounded p-3' style={{ background: '#0B1739' }}>
          <center className='fs-1 fs-bold mb-4'>Information {userData.username}</center>
          <div className='row'>
            <div className='col-sm-12 col-lg-6 col-md-6'>
              <table className='table table-borderless' style={{ background: '#0B1739', border: '3px solid #0B1739' }}>
                <thead style={{ background: '#0A1330' }}>
                  <tr>
                    <th style={{ background: '#0A1330', color: 'white' }}>Name</th>
                    <th style={{ background: '#0A1330', color: 'white' }}>{userData.username}</th>
                  </tr>
                </thead>
                <tbody style={{ background: '#0A1330' }}>
                  <tr style={{ background: '#0A1330' }}>
                    <td style={{ background: '#0B1739', color: 'white' }}><span className='fw-bold fs-6'>User ID</span><br /></td>
                    <td style={{ background: '#0B1739', color: 'white' }}><span className='fs-6'>{userData.userID}</span><br /></td>
                  </tr>
                  <tr style={{ background: '#0A1330' }}>
                    <td style={{ background: '#0A1330', color: 'white' }}><span className='fw-bold fs-6'>Role</span><br /></td>
                    <td style={{ background: '#0A1330', color: 'white' }}><span className='fs-6'>{userData.role}</span><br /></td>
                  </tr>
                  <tr style={{ background: '#0B1739' }}>
                    <td style={{ background: '#0B1739', color: 'white' }}><span className='fw-bold fs-6'>Email</span><br /></td>
                    <td style={{ background: '#0B1739', color: 'white' }}><span className='fs-6'>{userData.email}</span><br /></td>
                  </tr>
                  <tr style={{ background: '#0A1330' }}>
                    <td style={{ background: '#0A1330', color: 'white' }}><span className='fw-bold fs-6'>Phone</span><br /></td>
                    <td style={{ background: '#0A1330', color: 'white' }}><span className='fs-6'>{userData.phone}</span><br /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <div className='col-sm-12 col-lg-6 col-md-6 mb-3'> */}
            {/* <img className='col-sm-12 col-lg-6 col-md-6 mb-3' src='https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg' style={{maxWidth:'275px',maxHeight:'300px'}} /> */}
            <img className='col-sm-12 col-lg-6 col-md-6 mb-3' src='https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg' style={{ maxWidth: '500px', maxHeight: '500px' }} />
            {/* </div> */}
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-6'>
                  <button className='btn btn-primary' onClick={() => handleAllDevices(userData.userID)}>All Devices</button>
                </div>
                <div className='col-6'>
                  <button className='btn btn-primary' onClick={() => handleAllRelays(userData.userID)}>All Relays</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {allDevicesOpen && (
        <div className='my-4 w-100 rounded p-3' style={{ background: '#0B1739' }}>
          <h2>All Devices for {userData.userID}</h2>
          <table className='hide750px table table-borderless table-responsive-sm table-responsive-md' style={{ background: '#0B1739', border: '3px solid #0B1739', overflow: 'auto', minWidth: '300px', maxWidth: '1920px' }}>
            <thead >
              <tr>
                <th style={{ background: '#0A1330', color: 'white' }}>Device ID</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Version</th>
                {/* <th style={{ background: '#0A1330', color: 'white' }}>Address</th> */}
                <th style={{ background: '#0A1330', color: 'white' }}>Type</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Relay1</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Relay2</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Relay3</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Relay4</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Status</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Stock</th>
                {/* <th style={{ background: '#0A1330', color: 'white' }}>User ID</th> */}
                <th style={{ background: '#0A1330', color: 'white' }}>Query</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Created </th>
                <th style={{ background: '#0A1330', color: 'white' }}>Updated </th>
              </tr>
            </thead>
            <tbody>
              {allDevices.map((device, idx) => (
                <tr key={device.id}>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.deviceid}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.version}</td>
                  {/* <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.address}</td> */}
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.type}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.relay1 ==='' ||device.relay1 ==='N/A' || device.relay1===null ?<b className='bi bi-x-lg text-danger'></b>:device.relay1}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.relay2 ==='' ||device.relay2 ==='N/A' || device.relay2===null ?<b className='bi bi-x-lg text-danger'></b>:device.relay2}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.relay3 ==='' ||device.relay3 ==='N/A' || device.relay3===null ?<b className='bi bi-x-lg text-danger'></b>:device.relay3}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.relay4 ==='' ||device.relay4 ==='N/A' || device.relay4===null ?<b className='bi bi-x-lg text-danger'></b>:device.relay4}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.status}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.stock ? 'Sell':"Not Sell"}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.query}</td>
                  {/* <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.userID}</td> */}
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{new Date(device.createdAt).toLocaleString()}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{new Date(device.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <table className='more750px table table-borderless table-responsive-sm table-responsive-md' style={{ background: '#0B1739', border: '3px solid #0B1739', overflow: 'auto', minWidth: '300px', maxWidth: '1920px' }}>
            <thead >
              <tr>
                <th style={{ background: '#0A1330', color: 'white' }}>Device ID</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Address</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Query</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Relay1</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Relay2</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Relay3</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Relay4</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Status</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Stock</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Type</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Version</th>
                <th style={{ background: '#0A1330', color: 'white' }}>User ID</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Created At</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {allDevices.map((device, idx) => (
                <tr key={device.id}>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.deviceid}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.address}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.query}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.relay1}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.relay2}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.relay3}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.relay4}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.status}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.stock}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.type}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.version}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{device.userID}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{new Date(device.createdAt).toLocaleString()}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{new Date(device.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      )}

      {allRelaysOpen && (
        <div className='my-4 w-100 border border-dark rounded p-3' style={{ background: '#0B1739' }}>
          <h2>All Relays</h2>
          <table className='hide750px table table-borderless table-responsive-sm table-responsive-md' style={{ background: '#0B1739', border: '3px solid #0B1739', overflow: 'auto', minWidth: '300px', maxWidth: 'px' }}>
            <thead style={{ background: '#0A1330', color: 'white' }}>
              <tr>
                {/* <th>ID</th> */}
                <th style={{ background: '#0A1330', color: 'white' }}>Relay ID</th>
                <th style={{ background: '#0A1330', color: 'white' }}> Area</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Device Name</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Device Company </th>
                <th style={{ background: '#0A1330', color: 'white' }}>Power</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Status</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Connected</th>
                <th style={{ background: '#0A1330', color: 'white' }}>D. ID</th>
                {/* <th>User ID</th> */}
                <th style={{ background: '#0A1330', color: 'white' }}>Created</th>
                <th style={{ background: '#0A1330', color: 'white' }}>Updated</th>
              </tr>
            </thead>
            <tbody>
              {allRelays && allRelays.map((relay,idx) => (
                <tr key={idx}>
                  {/* <td>{relay.id}</td> */}
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{relay.relayID}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{relay.connectedArea}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{relay.relayName}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{relay.deviceCompanyName}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{relay.power}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{relay.status}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{relay.deviceConnected ? 'Yes' : 'No'}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{relay.deviceID}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{new Date(relay.createdAt).toLocaleString()}</td>
                  <td style={{ background: `${idx % 2 == 0 ?  '#0B1739':'#0A1330'}`, color: 'white' }}>{new Date(relay.updatedAt).toLocaleString()}</td>
                  {/* <td>{relay.userID}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default OrdersStatusTable;
