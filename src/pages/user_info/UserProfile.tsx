import React, { useState, useEffect } from 'react';
import { useUser } from 'routes/context/UserContext';
import Splash from 'components/loading/Splash';
import avatar from '../../assets/images/avater.png';
import axios from 'axios';

axios.defaults.withCredentials = true

const UserProfile: React.FC = () => {
  const { user } = useUser();
  const [completeData, setUserCompleteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [file, setFile] = useState<File | null>(null); // State for selected file
  const [msg, setMsg] = useState<string | null>(null); // State for messages or errors

  useEffect(() => {
    if (user && user.login) {
      axios.get(`http://localhost:5021/user_profile/${user.email}`)
        .then(res => {
          setUserCompleteData(res.data.userCompleteData);
          console.log(res.data.userCompleteData);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  },);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  // console.log(completeData)
  const handleEditPic = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) {
      setMsg('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', user.email);
    formData.append('userID', completeData?.userID);

    // alert("Pic Entered")

    try {
      const response = await axios.post('http://localhost:5021/upload_profile_pic', formData);
      // console.log(response.data);
      setMsg(response.data.msg)
      // Optionally update state or show success message
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error, optionally set error message
    }
  };

  if (loading) {
    return <Splash />;
  }

  if (!user || user.msg_type === "error") {
    return (
      <div style={{ minHeight: '20vh' }}>
        <span className={`alert ${user.msg_type === 'error' ? '' : 'alert-success'} d-flex align-items-center justify-content-center`} style={{ background: '#241B27' }}>
          Not Authorized . . .
        </span>
        <Splash />
      </div>
    );
  }

  return (
    <div className='row'>
      <div className='col-lg-6 col-md-6 col-sm-12 p-3' style={{ background: '#0B1739', transition: '2s ease-in-out' }}>
        <div className='d-flex align-items-center justify-content-between'>
          <h1>User Profile</h1>
          <i className='bi bi-gear-fill fs-4' style={{ color: `${edit ? '#AC35DD' : ''}`, transform: `${edit ? 'rotate(-90deg)' : 'rotate(0deg)'}` }} onClick={() => setEdit(!edit)}></i>
        </div>
        <hr />
        <p>Name: <strong>{user.username}</strong></p>
        <p>Email: <strong>{user.email}</strong></p>
        <p>Address: <strong>{user.address}</strong></p>
        <p>Role: <strong>{user.role}</strong></p>
        <p>Phone: <strong>{completeData?.phone || 'N/A'}</strong></p>
        <p>Verified: <strong>{completeData?.verified ? 'Yes' : 'No'}</strong></p>
        <p>User ID: <strong>{completeData?.userID || 'N/A'}</strong></p>
        {user.role === 'Admin' && (
          <div>
            <p>Edit Customers: <strong>{completeData?.editCustomers ? 'Yes' : 'No'}</strong></p>
            <p>Edit Admin: <strong>{completeData?.editAdmin ? 'Yes' : 'No'}</strong></p>
            <p>Edit Owner: <strong>{completeData?.editOwner ? 'Yes' : 'No'}</strong></p>
            <p>Edit Self: <strong>{completeData?.editSelf ? 'Yes' : 'No'}</strong></p>
          </div>
        )}
      </div>
      <div className='col-lg-6 col-md-6 col-sm-12 p-3' style={{ background: '#0B1739' }}>
        <img className='col-12 img-thumbnail mb-3' src={`http://localhost:5021/Images/${completeData.profilePic}`} alt="User Avatar" style={{ maxHeight: '400px', width: '100%' }} />
        <center>
          <b className='bi bi-gear-fill fs-4 border rounded px-5 py-1' style={{ background: `${editImage ? '#AC35DD' : ''}`, transform: `${editImage ? 'rotate(-90deg)' : 'rotate(0deg)'} `, cursor: 'pointer' }} onClick={() => setEditImage(!editImage)}> Upload new Profile Pic</b>
        </center>
        {editImage && (
          <div>
            <label className='form-label mt-3 px-3 fs-3 rounded' style={{ background: '#5470C6' }}>Enter New Pic</label>
            {msg && <p style={{ color: '#5470C6' }}>{msg}</p>}
            <input
              type='file'
              accept='image/*' // Accepts all image file types
              className="form-control my-2"
              onChange={handleFileChange} // Call the handleFileChange function when a file is selected
              required
            />
            {/* Display file details if a file is selected */}
            {file && (
              <div>
                <p>Selected File: {file.name}</p>
                <p>File Size: {file.size} bytes</p>
                <p>File Type: {file.type}</p>
              </div>
            )}
            <button onClick={handleEditPic} className='btn btn-primary'>Save</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
