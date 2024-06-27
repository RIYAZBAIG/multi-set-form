import React, { useState, useEffect } from "react";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import PersonalDetails from "./Components/PersonalDetails";
import EducationalDetails from "./Components/EducationalDetails";
import EmploymentDetails from "./Components/EmploymentDetails";

const steps = ["Personal Details", "Educational Details", "Employment Details"];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    personalDetails: {},
    educationalDetails: {},
    employmentDetails: {},
  });
  const [errors, setErrors] = useState({
    personalDetails: {},
    educationalDetails: {},
    employmentDetails: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/formData');
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
    fetchData();
  }, []);
  
  const saveFormData = async () => {
    try {
      await fetch('http://localhost:5000/api/formData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };
  
  // Call saveFormData whenever formData changes
  useEffect(() => {
    saveFormData();
  }, [formData]);

  const validateFields = (data) => {
    let valid = true;
    let newErrors = {};

    for (const key in data) {
      if (!data[key]) {
        valid = false;
        newErrors[key] = "This field is required";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [activeStep === 0
        ? "personalDetails"
        : activeStep === 1
        ? "educationalDetails"
        : "employmentDetails"]: newErrors,
    }));

    return valid;
  };

  const handleNext = () => {
    let currentData;
    switch (activeStep) {
      case 0:
        currentData = formData.personalDetails;
        break;
      case 1:
        currentData = formData.educationalDetails;
        break;
      case 2:
        currentData = formData.employmentDetails;
        break;
      default:
        break;
    }

    if (validateFields(currentData)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      personalDetails: {},
      educationalDetails: {},
      employmentDetails: {},
    });
    localStorage.removeItem("formData");
    localStorage.removeItem("activeStep");
  };

  const handleChange = (section, newData) => {
    setFormData({
      ...formData,
      [section]: newData,
    });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalDetails
            data={formData.personalDetails}
            handleChange={(data) => handleChange("personalDetails", data)}
            errors={errors.personalDetails}
          />
        );
      case 1:
        return (
          <EducationalDetails
            data={formData.educationalDetails}
            handleChange={(data) => handleChange("educationalDetails", data)}
            errors={errors.educationalDetails}
          />
        );
      case 2:
        return (
          <EmploymentDetails
            data={formData.employmentDetails}
            handleChange={(data) => handleChange("employmentDetails", data)}
            errors={errors.employmentDetails}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Container sx={{marginTop:'10em'}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography variant="h5" gutterBottom sx={{marginTop:'3em'}}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div style={{ marginTop: "3em" }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default App;
