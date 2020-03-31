import { Link, withRouter } from "react-router-dom";
import React, { Fragment } from "react";
import { signout, isAuthenticated } from "../auth";

const Menu = ( {history} ) => {
    return(
        <div>
        <ul className="nav nav-tabs bg-primary">
          <li className="nav-item">
                    <Link className="nav-link" to="/home">
                       Home
                    </Link>
                </li>
            {isAuthenticated() && isAuthenticated().role === 0 && (
               <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to="/user/dashboard">
                        Dashboard
                    </Link>
                </li>
               <li className="nav-item">
                    <Link className="nav-link" to="/user/add-complain">
                        Add Your Complain
                    </Link>
                </li>
              </Fragment>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/dashboard" >
                        Dashboard
                    </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signin">
                            Signin
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/user/signup">
                            User Signup
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/police-officer/signup">
                            Police Officer Signup
                        </Link>
                    </li>
                </Fragment>
            )}
            {isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link" onClick={() => signout(() => { history.push("/signin"); }) }>
                        Signout
                    </span>
                </li>
            )}
        </ul>
    </div>
    );
};
export default withRouter(Menu);
