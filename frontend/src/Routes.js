import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/AdminRoute";
import PoliceOfficerRoute from "./auth/PoliceOfficerRoute";
import UserRoute from "./auth/UserRoute";
import UserDashboard from "./user/UserDashboard";
import AddComplain from "./user/AddComplain";
import PoliceDashboard from "./user/PoliceDashboard";

import './style.css';

const Routes = () => {
  
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/user/signup" exact component={Signup} />
                <Route path="/police-officer/signup" exact component={Signup} />
                 <Route path="/signin" exact component={Signin} />
                <UserRoute path="/user/dashboard" exact component={UserDashboard}  />
                <UserRoute path="/user/add-complain" exact component={AddComplain}  />
                <PoliceOfficerRoute path="/police-officer/dashboard" exact component={PoliceDashboard}  />

            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
