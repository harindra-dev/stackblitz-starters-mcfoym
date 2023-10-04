import React, { useState, useEffect } from "react";
import "./EmployeeSearch.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Divider,
  Autocomplete,
  Button,
} from "@mui/material";
import data from "./api-employee-search.json";

const EmployeeSearch = () => {
  const initialFormState = {
    isSubmitted: false, // `true` when hit submit
    isSubmitting: false, // `true` when form is being insubmitting state
    isValid: true, // `true` when any of the form controls is invalid
    isDirty: false, // `true` when any of the form controls is updated
    controls: {},
    errors: { ...data.errors },
    values: { ...data.initial_values },
  };
  const [disabledControls, setDisabledControls] = useState([]);

  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    // console.log({ values });
    resetForm();
  }, []);

  const validateInputData = (inputName, inputValue) => {
    switch (inputName) {
      case "loginId":
        const isValidemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputValue);
        if (!isValidemail) {
          return `invalid Email`;
        }
        return null;
        break;
      case "employeeId":
        const isValidEmpId = /^\d{9}$/.test(inputValue);
        if (!isValidEmpId) {
          return `invalid Employee ID`;
        }
        return null;
        break;
      case "firstName":
      case "lastName":
        const isValidName = /^([a-zA-Z0-9_-]){3,33}$/.test(inputValue);
        if (!isValidName) {
          return `invalid ${inputName}`;
        }
        return null;
        break;
      case "middleName":
        const isValidMiddleName = /^([a-zA-Z0-9_-]){3,31}$/.test(inputValue);
        if (!isValidMiddleName) {
          return `invalid middle name`;
        }
        return null;
        break;
      case "jobTitle":
        if (!data.jobTitle.includes(inputValue) && inputValue) {
          return `Invalid Job Title`;
        }
        return null;
        break;
      case "location":
        if (!data.location.includes(inputValue) && inputValue) {
          return `Invalid Location`;
        }
        return null;
        break;
      default:
        return null;
    }
  };

  const handleValueChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value || null;
    // setValues((values) => {
    //   return { ...values, [inputName]: inputValue };
    // });
    setFormState((initialFormState) => {
      const newFormState = { ...initialFormState };
      newFormState.isDirty = true;
      newFormState.controls[inputName].value = inputValue;
      newFormState.controls[inputName].error = validateInputData(inputName, inputValue);
      if (newFormState.controls[inputName].error) {
        newFormState.errors[inputName] = newFormState.controls[inputName].error;
      } else {
        newFormState.errors[inputName] = null;
      }
      newFormState.controls[inputName].isValid = !newFormState.controls[inputName].error;
      newFormState.values[inputName] = inputValue;
      if (inputName === "jobTitle" && inputValue === "--Select--") {
        newFormState.values[inputName] = null;
        newFormState.controls[inputName].error = null;
        newFormState.controls[inputName].isValid = true;
      }
      if (inputName === "employeeId") {
        newFormState.values[inputName] = inputValue?.replace(/[^0-9]/g, "") || "";
        newFormState.controls[inputName].value = inputValue?.replace(/[^0-9]/g, "") || "";
      }

      const errors = newFormState.errors;
      newFormState.isValid = Object.values(errors).every((error) => !error);
      return newFormState;
    });
  };

  const handleBlur = (event) => {
    const inputName = event.target.name;
    setFormState((initialFormState) => {
      const newFormState = { ...initialFormState };
      newFormState.controls[inputName].touched = true;
      return newFormState;
    });
  };

  const resetForm = () => {
    setDisabledControls([]);
    const values = data.initial_values;
    for (let control in values) {
      initialFormState.controls[control] = initialFormState.controls[control]
        ? { ...initialFormState.controls[control] }
        : { touched: false, isValid: true, value: null, error: null };
      initialFormState.controls[control]["value"] = values[control];
      initialFormState.controls[control]["error"] = validateInputData(
        control,
        initialFormState.controls[control]["value"]
      );
      initialFormState.controls[control]["isValid"] = !initialFormState.controls[control]["error"];
      validateInputData(control, initialFormState.controls[control]["value"]);
    }
    setFormState(initialFormState);
  };
  const clearForm = () => {};

  const handleFocus = (event) => {
    const inputName = event.target.name;
    console.log({ inputName });

    switch (inputName) {
      case "loginId":
        setDisabledControls(["employeeId", "firstName", "lastName", "middleName", "location"]);
        break;
      case "employeeId":
        setDisabledControls(["loginId", "firstName", "lastName", "middleName"]);
        break;
      case "firstName":
      case "lastName":
      case "middleName":
        setDisabledControls(["loginId", "employeeId"]);
        break;
      default:
    }
  };

  return (
    <React.Fragment>
      <div className='page-title-text'>Employee Search</div>
      <form noValidate autoComplete='off'>
        <div className='d-row truncation-row'>
          <div className='col-12'>
            <p className='page-text'>Search an employee by any combination below.</p>
          </div>
          <div className='col col-md-8 col-sm-12'>
            <TextField
              onFocus={handleFocus}
              value={formState.values.loginId}
              name='loginId'
              error={
                formState.controls.loginId?.touched && formState.errors.loginId
                  ? formState.errors.loginId
                  : null
              }
              helpertext={
                formState.controls.loginId?.touched && formState.errors.loginId
                  ? formState.errors.loginId
                  : ""
              }
              fullWidth
              label='Login ID'
              size='small'
              inputProps={{ maxLength: 45 }}
              autoComplete='off'
              onChange={handleValueChange}
              onBlur={handleBlur}
              disabled={disabledControls.includes("loginId")}
            />
          </div>
          <div className='col col-md-4 col-sm-12'>
            <TextField
              value={formState.values.employeeId}
              onFocus={handleFocus}
              name='employeeId'
              error={
                formState.controls.employeeId?.touched && formState.errors.employeeId
                  ? formState.errors.employeeId
                  : null
              }
              helpertext={
                formState.controls.employeeId?.touched && formState.errors.employeeId
                  ? formState.errors.employeeId
                  : ""
              }
              fullWidth
              label='Employee ID'
              size='small'
              inputProps={{ maxLength: 45 }}
              autoComplete='off'
              onChange={handleValueChange}
              onBlur={handleBlur}
              disabled={disabledControls.includes("employeeId")}
            />
          </div>
        </div>
        <div className='d-row truncation-row'>
          <div className='col col-md-4 col-sm-12'>
            <TextField
              value={formState.values.lastName}
              onFocus={handleFocus}
              name='lastName'
              error={
                formState.controls.lastName?.touched && formState.errors.lastName
                  ? formState.errors.lastName
                  : null
              }
              helpertext={
                formState.controls.lastName?.touched && formState.errors.lastName
                  ? formState.errors.lastName
                  : ""
              }
              fullWidth
              label='Last Name'
              size='small'
              inputProps={{ maxLength: 45 }}
              autoComplete='off'
              onChange={handleValueChange}
              onBlur={handleBlur}
              disabled={disabledControls.includes("lastName")}
            />
          </div>

          <div className='col col-md-4 col-sm-12'>
            <TextField
              onFocus={handleFocus}
              name='firstName'
              error={
                formState.controls.firstName?.touched && formState.errors.firstName
                  ? formState.errors.firstName
                  : null
              }
              helpertext={
                formState.controls.firstName?.touched && formState.errors.firstName
                  ? formState.errors.firstName
                  : ""
              }
              fullWidth
              label='First Name'
              size='small'
              inputProps={{ maxLength: 45 }}
              autoComplete='off'
              onChange={handleValueChange}
              disabled={disabledControls.includes("firstName")}
              onBlur={handleBlur}
            />
          </div>

          <div className='col col-md-4 col-sm-12'>
            <TextField
              onFocus={handleFocus}
              name='middleName'
              error={
                formState.controls.middleName?.touched && formState.errors.middleName
                  ? formState.errors.middleName
                  : null
              }
              helpertext={
                formState.controls.middleName?.touched && formState.errors.middleName
                  ? formState.errors.middleName
                  : ""
              }
              fullWidth
              label='Middle Name'
              size='small'
              inputProps={{ maxLength: 45 }}
              autoComplete='off'
              onChange={handleValueChange}
              disabled={disabledControls.includes("middleName")}
              onBlur={handleBlur}
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
                onChange={(event, newValue) => {
                  handleValueChange({ target: { name: "jobTitle", value: newValue || null } });
                }}
                onInputChange={(event, newInputValue) => {
                  console.log({ event, newInputValue });
                  handleValueChange({
                    target: { name: "jobTitle", value: newInputValue || null },
                  });
                }}
                value={formState.values.jobTitle}
                size='small'
                id='jobTitle'
                disabled={disabledControls.includes("jobTitle")}
                options={["--Select--", ...data.jobTitle]}
                renderInput={(params) => (
                  <TextField
                    onFocus={() => handleFocus({ target: { name: "jobTitle" } })}
                    {...params}
                    label='Job Title'
                    name='jobTitle'
                    onBlur={handleBlur}
                    error={
                      formState.controls.jobTitle?.touched && formState.errors.jobTitle
                        ? formState.errors.jobTitle
                        : null
                    }
                    helpertext={
                      formState.controls.jobTitle?.touched && formState.errors.jobTitle
                        ? formState.errors.jobTitle
                        : ""
                    }
                  />
                )}
              />
            </FormControl>
          </div>

          <div className='col col-md-4 col-sm-12'>
            <FormControl fullWidth size='small'>
              <Autocomplete
                onChange={(event, newValue) => {
                  handleValueChange({
                    target: {
                      name: "location",
                      value: newValue || null,
                    },
                  });
                }}
                onInputChange={(event, newInputValue) => {
                  handleValueChange({
                    target: {
                      name: "location",
                      value: newInputValue || null,
                    },
                  });
                }}
                value={formState.values.location}
                disabled={disabledControls.includes("location")}
                size='small'
                id='location'
                options={[...data.location]}
                renderInput={(params) => (
                  <TextField
                    onFocus={() => handleFocus({ target: { name: "location" } })}
                    {...params}
                    label='Location'
                    name='location'
                    onBlur={handleBlur}
                    error={
                      formState.controls.location?.touched && formState.errors.location
                        ? formState.errors.location
                        : null
                    }
                    helpertext={
                      formState.controls.location?.touched && formState.errors.location
                        ? formState.errors.location
                        : ""
                    }
                  />
                )}
              />
            </FormControl>
          </div>
        </div>
      </form>
      <button type='button' onClick={resetForm}>
        Clear
      </button>
    </React.Fragment>
  );
};
export default EmployeeSearch;
