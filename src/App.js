import React from 'react';
import './style.css';
import './responsive.css';
import './index.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import ProfilePermissions from './ProfilePermissions';
import EmployeeInformation from './EmployeeInformation';
import TabsComponent from './TabsComponent';
import ProfilePermissionsList from './ProfilePermissionsList';
import EmployeeSearch from './EmployeeSearch';

import { Link } from 'react-router-dom';

export default function App() {
  // console.log({ ProfilePermissions, EmployeeInformation });

  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to={`/ProfilePermissions`}>ProfilePermissions</Link>
              </li>
              <li>
                <Link to={`/EmployeeInformation`}>EmployeeInformation</Link>
              </li>
              <li>
                <Link to={`/TabsComponent`}>TabsComponent</Link>
              </li>
              <li>
                <Link to={`/EmployeeSearch`}>Employee Search</Link>
              </li>
              <li>
                <Link to={`/ProfilePermissionsList`}>
                  ProfilePermissionsList
                </Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact component={ProfilePermissionsList} />
            <Route path="/ProfilePermissions" component={ProfilePermissions} />
            <Route
              path="/EmployeeInformation"
              component={EmployeeInformation}
            />
            <Route path="/TabsComponent" component={TabsComponent} />
            <Route path="/EmployeeSearch" component={EmployeeSearch} />
            <Route
              path="/ProfilePermissionsList"
              component={ProfilePermissionsList}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}
