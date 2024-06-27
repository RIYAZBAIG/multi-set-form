import React from 'react';
import { TextField, Grid } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
// import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


function PersonalDetails({ data, handleChange, errors }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({
      ...data,
      [name]: value
    });
  };

  const handleDateChange = (date) => {
    handleChange({
      ...data,
      dob: date
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={2}>
        {['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip', 'country'].map((field, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
              required
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              fullWidth
              variant="standard"
              type={field === 'phone' ? 'number' : 'text'}
              value={data[field] || ''}
              onChange={handleInputChange}
              error={!!errors[field]}
              helperText={errors[field]}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={6}>
          <MobileDatePicker
            label="Date of Birth"
            inputFormat="MM/dd/yyyy"
            value={data.dob || null}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                name="dob"
                fullWidth
                variant="standard"
                error={!!errors.dob}
                helperText={errors.dob}
              />
            )}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

export default PersonalDetails;
