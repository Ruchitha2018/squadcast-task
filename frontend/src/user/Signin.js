import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";
import Menu from "../core/Menu";

const Signin = () => {
    const [values, setValues] = useState({
        user_email: "",
        user_password: "",
        error: "",
        loading: false,
        redirectToDashboard: false
    });

    const { user_email, user_password, error, redirectToDashboard } = values;
    const { token, user, role } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        signin({ user_email, user_password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                authenticate(data, () => {
                    setValues({...values, redirectToDashboard: true});
                });
            }
        });
    };

    const signInForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange("user_email")} type="email" className="form-control" value={user_email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange("user_password")} type="password" className="form-control" value={user_password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }} >
            {error}
        </div>
    );

    const redirectUser = () => {
        if (redirectToDashboard) {
            console.log(role);
            if (user && role == 1) {
                return <Redirect to="/police-officer/dashboard" />;
            } else if(user && role == 0) {
                return <Redirect to="/user/dashboard" />;
            } else {
                return <Redirect to="/admin/dashboard" />;
            }
        }  
    };

    return (
      <div>
         <Menu />
        <div className = "container">
          <div className = "row">
            <div className = "col-md-6 offset-md-3 form-box">
              <h3 className = "text-center">Welcome To Portal</h3>
              <h5 className = "text-center">Please fill up your details</h5>
                        {signInForm()}
                        {redirectUser()}
            </div>   
          </div>
        </div>
       </div>
    );
};



export default Signin;
