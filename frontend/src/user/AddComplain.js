import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../core/Menu";
import { policeAvail, addComplain, updatePoliceAvail, checkComplainStatus, updateComplain } from "./apiCore";
import { isAuthenticated } from "../auth";

const AddComplain = () => {
    
    const [values, setValues] = useState({
        user_id: "",
        complain_id: "",
        car_number:"",
        car_model: "",
        complain_status:0,
        assign_police_id:0,
        formSuccess:false,
        error:"",
    });
     
     const { user_id, complain_id, car_number, car_model, complain_status, assign_police_id, formSuccess, error } = values;

     const { user } = isAuthenticated();
    
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    }
    
    const handleSubmit = event => {
        event.preventDefault();
        const uniqueId = "CASE"+Math.random().toString().substr(2, 4);
          addComplain({ user_id: user, complain_id:uniqueId, car_number, car_model, complain_status, assign_police_id }).then(data => {
            if (data.error) {
                console.log(data.error);
                setValues({ ...values, error: data, success: false });
            } else {
                setValues({...values, car_no:"",formSuccess:true });
            }
        });
    }
        
    const checkPoliceAvail = () => {
     if(formSuccess){ 
         policeAvail().then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                complainStatus();
            }
        }); 
    }
 }
 
  const updatePoliceStatus = () => {
           updatePoliceAvail().then(data => {
                    if(data.error){
                        console.log(data.error);
                }else{
                    console.log(data);
                }
            });
    }
    
    const complainStatus = () => {
         checkComplainStatus().then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                updateComplainPolice();
            }
        });
    }
    
    const updateComplainPolice = () => {
         updateComplain().then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                updatePoliceStatus();
            }
        });
    }
    
    const successMessage = () => (
      <div className = "alert alert-info" style = {{ display: formSuccess ? "": "none" }}>
        Complain has registered successfully
      </div>    
    );
    
    const Form = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Car Number</label>
                <input type="text" className="form-control" value={car_number} onChange={handleChange("car_number")} />
            </div>

            <div className="form-group">
                <label className="text-muted">Car Model Number</label>
                <input type="email" className="form-control" value={car_model} onChange={handleChange("car_model")} />
            </div>                                             
            <button className="btn btn-primary" onClick={handleSubmit}>
                Add
            </button>
        </form>
    );

    return (
       <div>
         <Menu />
        <div className = "container">
          <div className = "row">
            <div className = "col-md-6 offset-md-3 form-box">
              <h3 className = "text-center">Register Your Car Stolen Complain</h3><hr />
              {successMessage()}
              {Form()}
               {checkPoliceAvail()}

            </div>   
          </div>
        </div>
       </div>    
    );
};

export default AddComplain;
