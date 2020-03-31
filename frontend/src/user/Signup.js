import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Menu from "../core/Menu";
import { signup } from "../auth";

const Signup = (props) => {
    
    const [values, setValues] = useState({
        user_name: "",
        user_email: "",
        user_password:"",
        user_phone: "",
        user_status:0,
        formSuccess:false,
        error:"",
        user_type:0
    });
    
    useEffect(() => {
            if(props.history.location.pathname ==="/police-officer/signup"){
                setValues({...values, user_type:1});
            }else{
                setValues({...values, user_type:0});
            }
    }, [props]); 
     
     const { user_name, user_email, user_password, user_phone, user_type, error, formSuccess, user_status} = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    }
    
    const handleSubmit = event => {
        event.preventDefault();
        console.log(user_name);
       signup({ user_name, user_email, user_password, user_phone, user_type, user_status:0 }).then(data => {
           if (data.error) {
               console.log("hello");
                setValues({ ...values, error: data, formSuccess: false });
            } else {
                setValues({
                    ...values,
                    user_name: "",
                    user_email: "",
                    user_password: "",
                    user_phone:"",
                    user_type:"",
                    error: "",
                    formSuccess: true
                });
            }
        });
    }
 
    const successMessage = () => (
      <div className = "alert alert-info" style = {{ display: formSuccess ? "": "none" }}>
        New account is created
      </div>    
    );
    
    const Form = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Full Name</label>
                <input type="text" className="form-control" value={user_name} onChange={handleChange("user_name")} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" value={user_email} onChange={handleChange("user_email")} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" value={user_password} onChange={handleChange("user_password")} />                               
            </div>
             <div className="form-group">
                <label className="text-muted">Mobile No</label>
                <input type="password" className="form-control" value={user_phone} onChange={handleChange("user_phone")} />                                                              
            </div>
                                                                                  
            <button className="btn btn-primary" onClick={handleSubmit}>
                Signup
            </button>
        </form>
    );

    return (
       <div>
         <Menu />
        <div className = "container">
          <div className = "row">
            <div className = "col-md-12"> {successMessage()}</div>
            <div className = "col-md-6 offset-md-3 form-box">
              <h3 className = "text-center">Registration Form</h3>
              <h5 className = "text-center">Please fill up your details</h5>
              {Form()}
             <h6 className = "text-center">Already a member 
             <Link className="nav-link" to="/signin">
                    Sign In
                </Link></h6>
            </div>   
          </div>
        </div>
       </div>    
    );
};

export default Signup;
