// src/components/AuthGuard.js
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
axios.defaults.withCredentials = true
const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthGuard;
