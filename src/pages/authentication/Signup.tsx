import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import IconifyIcon from 'components/base/IconifyIcon';
import paths from 'routes/paths';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

axios.defaults.withCredentials = true;

interface User {
  [key: string]: string;
}

const Signup = () => {
  const [user, setUser] = useState<User>({ username: '', email: '', password: '', phone: '', role: 'Consumer', address: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [msg_type, setMsg_Type] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const handleVerifyEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://dashadmin.nayar-valley-home-stay.in/verifyEmail', { email: user.email });
      setMsg(response.data.msg);
      setMsg_Type(response.data.msg_type);
      setOtpSent(response.data.otpSent);
      setTimer(300); // Set timer for 5 minutes (300 seconds)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://dashadmin.nayar-valley-home-stay.in/verifyOTP', { otp });
      if (response.data.msg === "OTP verified successfully") {
        setOtpVerified(true)
      }
      else {
        setOtpVerified(false)

      }
      setTimer(null); // Stop the timer
      setMsg(response.data.msg);
      setMsg_Type(response.data.msg_type);
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://dashadmin.nayar-valley-home-stay.in/register/email', {
        username: user.username,
        role: user.role,
        phone: user.phone,
        password: user.password,
        email: user.email,
        address: user.address
      });
      setMsg(response.data.msg);
      setMsg_Type(response.data.msg_type);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (timer !== null && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer ? prevTimer - 1 : 0));
      }, 1000);
    } else if (timer === 0) {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp(null);
    }
    return () => clearInterval(timerInterval);
  }, [timer]);
  const [owner, setOwner] = useState(false)
  const [admin, setAdmin] = useState(false)
  useEffect(() => {
    axios.get('https://dashadmin.nayar-valley-home-stay.in/getAdmin')
      .then(res => {
        console.log(res.data)
        setAdmin(res.data.validation)
      })
      .catch(err => {
        console.log(err)
      })
    axios.get('https://dashadmin.nayar-valley-home-stay.in/getOwner')
      .then(res => {
        console.log(res.data)
        setOwner(res.data.validation)
      })
      .catch(err => {
        console.log(err)
      })
  })
  return (
    <>
      <Typography align="center" variant="h3" fontWeight={600}>
        SignUp
        <hr />
      </Typography>
      {otpSent && !otpVerified && (
        <Typography align="center" variant="h6" color="error">
          OTP will expire in {Math.floor(timer! / 60)}:{('0' + (timer! % 60)).slice(-2)}
        </Typography>
      )}
      {msg && (
        <Typography align="center" variant="h6" color={`${msg_type}`} fontWeight={100}>
          {msg}
        </Typography>
      )}
      {isLoading && (
        <Stack alignItems="center" style={{ position: 'absolute', zIndex: '1000', top: '', left: '49%' }}>
          <CircularProgress size={50} />
        </Stack>
      )}
      {!otpVerified ? (
        <Stack component="form" direction="column" gap={2} onSubmit={otpSent ? handleVerifyOTP : handleVerifyEmail}>
          <TextField
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleInputChange}
            variant="filled"
            placeholder="Your Email"
            autoComplete="email"
            fullWidth
            autoFocus
            required
            disabled={otpSent || isLoading}
          />
          {otpSent && (
            <TextField
              id="otp"
              name="otp"
              type="text"
              value={otp || ''}
              onChange={(e) => setOtp(e.target.value)}
              variant="filled"
              placeholder="Enter OTP here sent on your Email"
              fullWidth
              required
              disabled={isLoading}
            />
          )}
          <Stack direction="row" justifyContent="center" gap={2}>
            {!otpSent && (
              <button
                className='btn'
                style={{ background: '#7F25FB', color: 'white', fontWeight: 'bolder' }}
                type="submit"
                onClick={handleVerifyEmail}
                disabled={isLoading}
              >
                Send OTP
              </button>
            )}
            {otpSent && (
              <button
                className='btn'
                style={{ background: '#7F25FB', color: 'white', fontWeight: 'bolder' }}
                type="submit"
                onClick={handleVerifyOTP}
                disabled={isLoading}
              >
                Verify OTP
              </button>
            )}
          </Stack>
        </Stack>
      ) : (
        <Stack component="form" direction="column" gap={2} onSubmit={handleSubmit}>
          <TextField
            id="username"
            name="username"
            type="text"
            value={user.username}
            onChange={handleInputChange}
            variant="filled"
            placeholder="Your Name"
            autoComplete="username"
            fullWidth
            required
            disabled={isLoading}
          />
          <TextField
            id="phone"
            name="phone"
            type="number"
            value={user.phone}
            onChange={handleInputChange}
            variant="filled"
            placeholder="Your Phone Number"
            fullWidth
            required
            disabled={isLoading}
          />
          <TextField
            id="address"
            name="address"
            type="text"
            value={user.address}
            onChange={handleInputChange}
            variant="filled"
            placeholder="Your Complete Address. . . "
            fullWidth
            required
            disabled={isLoading}
          />
          <TextField
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            variant="filled"
            placeholder="Your Password"
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <IconifyIcon icon={showPassword ? 'ion:eye' : 'ion:eye-off'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={isLoading}
          />
          {/* <select className='form-select border-secondary' style={{ background: 'transparent', color: 'blue' }}>
            <option selected disabled>--Select Role--</option>
            <option value={'Owner'}>Owner</option>
            <option value={'Admin'}>Admin</option>
            <option value={'Consumer'}>Consumer</option>

          </select> */}
          <FormControl variant="filled" fullWidth>
            {/* <InputLabel id="role-label">Role</InputLabel> */}
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={user.role}
              onChange={handleInputChange}
              disabled={isLoading}
              className='form-select border-secondary'
              style={{ background: '', color: '' }}
            >
              <MenuItem value="" disabled>--Select Role--</MenuItem>
              <MenuItem value="Owner" disabled={!owner}>Owner</MenuItem>
              <MenuItem value="Admin" disabled={!admin}>Admin</MenuItem>
              <MenuItem value="Consumer">Consumer</MenuItem>
            </Select>
          </FormControl>
          <button
            className='btn'
            style={{ background: '#7F25FB', color: 'white', fontWeight: 'bolder' }}
            type="submit"
            disabled={isLoading}
          >
            Register
          </button>
        </Stack>
      )}
    </>
  );
};

export default Signup;
