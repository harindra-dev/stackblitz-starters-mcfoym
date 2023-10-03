import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ProfilePermissions from '../ProfilePermissions';

const EmployeeInformation = () => {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    // console.log({ event, newValue });
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab value={1} label="Employee Information" />
        <Tab value={2} label="Profile Permissions" />
      </Tabs>
      {value === 1 && <div className="d-container">Employee Information</div>}
      {value === 2 && <ProfilePermissions />}
    </React.Fragment>
  );
};

export default EmployeeInformation;
