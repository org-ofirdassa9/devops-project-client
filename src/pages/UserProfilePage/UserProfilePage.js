import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateUserProfile } from '../../services/user-service/user-service';

export default function UserProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [bodyTemperature, setBodyTemperature] = useState('');
  const [bloodSugarLevel, setBloodSugarLevel] = useState('');

  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const storedUserProfile = sessionStorage.getItem('userProfile');
    if (storedUserProfile) {
      const userProfile = JSON.parse(storedUserProfile);
      setFirstName(userProfile.first_name || '');
      setLastName(userProfile.last_name || '');
      setEmail(userProfile.email || '');
      setBloodPressure(userProfile.blood_pressure || '');
      setHeartRate(userProfile.heart_rate || '');
      setBodyTemperature(userProfile.body_temperature || '');
      setBloodSugarLevel(userProfile.blood_sugar_level || '');
    }
  }, []);

  const handleSaveChanges = async () => {
    const userId = JSON.parse(sessionStorage.getItem('userProfile')).id;
    const updatedData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        blood_pressure: bloodPressure,
        heart_rate: heartRate,
        body_temperature: bodyTemperature,
        blood_sugar_level: bloodSugarLevel
    };

    const result = await updateUserProfile(userId, updatedData);
    if (result.success) {
      setMessage('Profile updated successfully.');
      setOpenSnackbar(true);
    } else {
      setMessage('Error updating profile: ' + result.message);
      setOpenSnackbar(true);
    }
  };

const handleCloseSnackbar = (event, reason) => {
  if (reason === 'clickaway') {
      return;
  }
  setOpenSnackbar(false);
};

  return (
    <div>
      <div className="container bootstrap snippets bootdey">
        <h1 className="text-primary">Edit Profile</h1>
        <hr/>
        <div className="row">
          <div className="col-md-9 personal-info">
            <h3>Personal info</h3>
              <div className="form-group">
                <label className="col-lg-3 control-label">First name:</label>
                <div className="col-lg-8">
                  <TextField
                    id="outlined-helperText"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Last name:</label>
                <div className="col-lg-8">
                  <TextField
                    id="outlined-helperText"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Email:</label>
                <div className="col-lg-8">
                  <TextField
                    id="outlined-helperText"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Blood Pressure:</label>
                <div className="col-lg-8">
                  <TextField
                    id="bloodPressure-field"
                    type="number"
                    value={bloodPressure}
                    onChange={(e) => setBloodPressure(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Heart Rate:</label>
                <div className="col-lg-8">
                  <TextField
                    id="heartRate-field"
                    type="number"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                  />
                </div>  
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Body Temperature:</label>
                <div className="col-lg-8">
                  <TextField
                    id="bodyTemperature-field"
                    type="number"
                    value={bodyTemperature}
                    onChange={(e) => setBodyTemperature(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Blood Sugar Level:</label>
                <div className="col-lg-8">
                  <TextField
                    id="bloodSugarLevel-field"
                    type="number"
                    value={bloodSugarLevel}
                    onChange={(e) => setBloodSugarLevel(e.target.value)}
                  />
                </div>  
              </div>
          </div>
          <div>
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleSaveChanges}>
                Save Changes
            </Button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={message.startsWith('Error') ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
           </div>
        </div>
      </div>
      <hr/>
    </div>
  );
}
