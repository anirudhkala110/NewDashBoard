import Grid from '@mui/material/Grid';
import TopCard from './TopCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Main.css'

const TopCards = () => {
  const [totalUsers, setTotalUsers] = useState(15);
  const [totalDevices, setTotalDevices] = useState(60);
  const [totalRelays, setTotalRelays] = useState(120);
  const [deviceID, setDeviceID] = useState(null);
  const [version, setVersion] = useState(1.1);
  const [type, setType] = useState(0);
  const [price, setPrice] = useState(100);

  useEffect(() => {
    axios.get('http://localhost:5021/get_users_devices_relays')
      .then(res => {
        const data = res.data;
        setTotalUsers(data.totalUsers || 0);
        setTotalDevices(data.totalDevices || 0);
        setTotalRelays(data.totalRelays || 0);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null)
  const handleTotalDevicesClick = () => {
    console.log(deviceID, version, type);
    if (deviceID === '' || version == null || type == null)
      return alert("Enter All data")
    else {
      axios.post('http://localhost:5021/put_device_data', { deviceid: deviceID, type: type, version: version, price: price })
        .then(res => {
          console.log(res)
          setMsg(res.data.msg)
          const interval = setInterval(() => {
            setMsg(null)
          }, 1500)
          clearInterval(interval)
        })
        .catch(err => {
          console.log(err)
        })
    }
    // Add your custom logic here, e.g., sending data to a server
  };

  return (
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TopCard
          title="Type of Products"
          // value={`${totalRelays}`}
          value={`3`}
          icon="bi bi-code"
          rate={'100%'}
          isUp={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TopCard
          title="Total Devices"
          value={`${totalDevices}`}
          icon="solar:bag-bold"
          rate={'20%'}
          isUp={true}
          onClick={() => setOpen(!open)} // Pass the click handler
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TopCard
          title="Total Revenue"
          value={`${totalUsers}`}
          icon="bi bi-graph-up"
          rate={'12%'}
          isUp={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TopCard
          title="Devices Sell"
          value={`${totalRelays}`}
          icon="bi bi-cart-check-fill"
          rate={'30%'}
          isUp={true}
        />
      </Grid>


      {open && (
        <div className='overlay'>
          <div className='form-container'>
            <form className='px-3'>
              <center className='fs-3 my-3'>Add Device</center>
              {msg && <p>{msg}</p>}
              <hr />
              <div className='input-group mb-3'>
                <label className='form-label'>Device ID</label>
                <input
                  className='w-100 form-control'
                  placeholder='dida01, didb02 and so on...'
                  onChange={e => setDeviceID(e.target.value)}
                />
              </div>
              <div className='input-group mb-3'>
                <label className='form-label'>Version</label>
                <input
                  className='w-100 form-control'
                  placeholder='1.2, 1.5 and so on...'
                  onChange={e => setVersion(parseFloat(e.target.value))}
                />
              </div>
              <div className='input-group mb-3'>
                <label className='form-label'>Price</label>
                <input
                  className='w-100 form-control'
                  placeholder=' Amount in Rupees'
                  onChange={e => setPrice(parseFloat(e.target.value))}
                />
              </div>
              <div className='input-group mb-3'>
                <label className='form-label'>Type</label>
                <select
                  className='w-100 form-control'
                  onChange={e => setType(parseInt(e.target.value))}
                >
                  <option value={0} selected disabled>Choose Type</option>
                  <option value={0} >Type 1</option>
                  <option value={1}>Type 2</option>
                  <option value={2}>Type 3</option>
                </select>
              </div>
            </form>
            <button className='btn btn-primary mx-2' onClick={handleTotalDevicesClick}>Submit</button>
            <button className='btn btn-secondary mx-2' onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </Grid>
  );
};

export default TopCards;
