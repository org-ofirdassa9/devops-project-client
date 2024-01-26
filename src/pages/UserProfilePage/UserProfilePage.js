import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, Alert, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateUserMetrics, updateUserProfile } from '../../services/user-service/user-service';
import { getComparisonReport, getOverviewReport, getTrendReport } from '../../services/reports-service/report-service';

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

  const handleSavePersonalInfo = async () => {
    const userId = JSON.parse(sessionStorage.getItem('userProfile')).user_id;
    const updatedData = {
        first_name: firstName,
        last_name: lastName,
        email: email
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

  const handleSaveHealthMetrics = async () => {
    const userId = JSON.parse(sessionStorage.getItem('userProfile')).user_id;
    const updatedData = {
        blood_pressure: bloodPressure,
        heart_rate: bodyTemperature,
        body_temperature: bodyTemperature,
        blood_sugar_level: bloodSugarLevel
    };

    const result = await updateUserMetrics(userId, updatedData);
    if (result.success) {
      setMessage('Profile updated successfully.');
      setOpenSnackbar(true);
    } else {
      setMessage('Error updating profile: ' + result.message);
      setOpenSnackbar(true);
    }
  };

  const handleComparisonReport = async () => {
    const userId = JSON.parse(sessionStorage.getItem('userProfile')).user_id;
    getComparisonReport(userId);
  };


  const handleOverviewReport = async () => {
    const userId = JSON.parse(sessionStorage.getItem('userProfile')).user_id;
    getOverviewReport(userId);
  }

  const handleTrendReport = async () => {
    const userId = JSON.parse(sessionStorage.getItem('userProfile')).user_id;
    getTrendReport(userId);
  }

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
      <hr />
      <Grid container spacing={3}>
        <Grid item xs={4}>
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
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSavePersonalInfo}
          >
            Update Personal Info
          </Button>
        </Grid>
        <Grid item xs={4}>
          <h3>Health Metrics</h3>
          <div className="form-group">
            <label className="col-lg-3 control-label">Blood Pressure:</label>
            <div className="col-lg-8">
              <TextField
                id="bloodPressureField"
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
                id="heartRateField"
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
                id="bodyTemperatureField"
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
                id="bloodSugarLevelField"
                type="number"
                value={bloodSugarLevel}
                onChange={(e) => setBloodSugarLevel(e.target.value)}
              />
            </div>
          </div>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSaveHealthMetrics}
          >
            Update Health Metrics
          </Button>
        </Grid>
        <Grid item xs={4}>
          <h3>Reports</h3>
          <div style={{ marginBottom: '8px' }}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleComparisonReport}
            >
              Comparison Report
            </Button>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleOverviewReport}
            >
              Overview Report
            </Button>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleTrendReport}
            >
              Trend Report
            </Button>
          </div>
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={message.startsWith('Error') ? 'error' : 'success'} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
    <hr />
  </div>
);

}
