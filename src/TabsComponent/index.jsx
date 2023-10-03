import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TabsComponent = () => {
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
        <Tab value={1} label="Tab 1" />
        <Tab value={2} label="Tab 2" />
      </Tabs>
      {value === 1 && <div className="d-container">Tab 1 Content</div>}
      {value === 2 && <div className="d-container">Tab 2 Content</div>}
    </React.Fragment>
  );
};

export default TabsComponent;
