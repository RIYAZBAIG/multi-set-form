import React from 'react';
import { TextField, Grid } from '@mui/material';

function EmploymentDetails({ data, handleChange, errors }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({
      ...data,
      [name]: value
    });
  };

  return (
    <Grid container spacing={2}>
      {['company', 'position', 'startDate', 'endDate', 'responsibilities', 'achievements', 'supervisor', 'supervisorPhone', 'reasonForLeaving', 'current'].map((field, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <TextField
            required
            name={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            fullWidth
            variant="standard"
            value={data[field] || ''}
            onChange={handleInputChange}
            error={!!errors[field]}
            helperText={errors[field]}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default EmploymentDetails;
