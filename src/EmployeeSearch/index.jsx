import React, { useState } from "react";
import "./EmployeeSearch.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Divider,
  Autocomplete,
} from "@mui/material";
import data from "./api-employee-search.json";

const EmployeeSearch = () => {
  const [values, setValues] = useState(data.initial_values);
  const [errors, setErrors] = useState(data.errors);

  const handleValueChange = (event) => {
    setValues((values) => {
      return { ...values, [event.target.name]: event.target.value };
    });
  };

  return (
    <React.Fragment>
      <div className='page-title-text'>Employee Search</div>
      <div className='d-container'>
        <form noValidate autoComplete='off'>
          <div className='d-row truncation-row'>
            <div className='col-12'>
              <p className='page-text'>Search an employee by any combination below.</p>
            </div>
            <div className='col col-md-8 col-sm-12'>
              <TextField
                name='loginId'
                error={!!errors.loginId}
                helperText={errors.loginId}
                fullWidth
                label='Login ID'
                size='small'
                inputProps={{ maxLength: 45 }}
                autoComplete='off'
                onChange={handleValueChange}
                onBlur={() => {
                  values.loginId &&
                    /^-?\d+(\.\d+)?$/.test(values.loginId) &&
                    setErrors({
                      ...errors,
                      loginId:
                        "Login ID contains special characters, please remove if not intentional",
                    });
                }}
              />
            </div>
            <div className='col col-md-4 col-sm-12'>
              <TextField
                name='employeeId'
                error={!!errors.employeeId}
                helperText={errors.employeeId}
                fullWidth
                label='Employee ID'
                size='small'
                inputProps={{ maxLength: 45 }}
                autoComplete='off'
                onChange={handleValueChange}
                onBlur={() => {
                  values.employeeId &&
                    /^-?\d+(\.\d+)?$/.test(values.employeeId) &&
                    setErrors({
                      ...errors,
                      employeeId:
                        "Employee ID contains special characters, please remove if not intentional",
                    });
                }}
              />
            </div>
          </div>
          <div className='d-row truncation-row'>
            <div className='col col-md-4 col-sm-12'>
              <TextField
                name='lName'
                error={!!errors.lastName}
                helperText={errors.lastName}
                fullWidth
                label='Last Name'
                size='small'
                inputProps={{ maxLength: 45 }}
                autoComplete='off'
                onChange={handleValueChange}
                onBlur={() => {
                  values.lastName &&
                    /^-?\d+(\.\d+)?$/.test(values.lastName) &&
                    setErrors({
                      ...errors,
                      lastName: "Last Name contains numeric, please remove if not intentional",
                    });
                }}
              />
            </div>

            <div className='col col-md-4 col-sm-12'>
              <TextField
                name='fName'
                error={!!errors.firstName}
                helperText={errors.firstName}
                fullWidth
                label='First Name'
                size='small'
                inputProps={{ maxLength: 45 }}
                autoComplete='off'
                onChange={handleValueChange}
                onBlur={() => {
                  values.firstName &&
                    /^-?\d+(\.\d+)?$/.test(values.firstName) &&
                    setErrors({
                      ...errors,
                      firstName: "First Name contains numeric, please remove if not intentional",
                    });
                }}
              />
            </div>

            <div className='col col-md-4 col-sm-12'>
              <TextField
                name='mName'
                error={!!errors.middleName}
                helperText={errors.middleName}
                fullWidth
                label='Middle Name'
                size='small'
                inputProps={{ maxLength: 45 }}
                autoComplete='off'
                onChange={handleValueChange}
                onBlur={() => {
                  values.middleName &&
                    /^-?\d+(\.\d+)?$/.test(values.middleName) &&
                    setErrors({
                      ...errors,
                      middleName: "Middle Name contains numeric, please remove if not intentional",
                    });
                }}
              />
            </div>
          </div>

          <Divider sx={{ mt: "2rem", mb: "1rem" }} className='combination-divider'>
            OR
          </Divider>

          <div className='d-row truncation-row'>
            <div className='col col-md-8 col-sm-12'>
              <FormControl fullWidth size='small'>
                <Autocomplete
                  onChange={handleValueChange}
                  inputValue={values.jobTitle}
                  size='small'
                  onInputChange={(event, newInputValue) => {
                    setValues({
                      ...values,
                      jobTitle: newInputValue,
                    });
                  }}
                  id='jobTitle'
                  options={data.jobTitle.map((option) => option.title)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Job Title'
                      name='jobTitle'
                      value={values.jobTitle}
                    />
                  )}
                />
              </FormControl>
            </div>

            <div className='col col-md-4 col-sm-12'>
              <FormControl fullWidth size='small'>
                <Autocomplete
                  onChange={handleValueChange}
                  inputValue={values.location}
                  size='small'
                  onInputChange={(event, newInputValue) => {
                    setValues({
                      ...values,
                      location: newInputValue,
                    });
                  }}
                  id='location'
                  options={data.location.map((option) => option.title)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Location'
                      name='location'
                      value={values.location}
                    />
                  )}
                />
              </FormControl>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default EmployeeSearch;
