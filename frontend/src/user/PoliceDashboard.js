import React, { useState, useEffect } from "react";
import Menu from "../core/Menu";
import { isAuthenticated } from "../auth";
import { listComplains, getUnresolvedComplain, getComplainAssign, getPoliceDetails, updatePoliceAssign, updateComplainStatus} from "./policeApiCore";

const PoliceDashboard = () => {
    
    const { user } = isAuthenticated();
    const [complains, setComplains] = useState([]);
    const [run, setRun] = useState(false);
    const [status, setStatus] = useState([]);
    const [customer, setCustomer] = useState([]);

     const loadComplains = () => {
            listComplains(user).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setComplains(data);
            }
        }); 
     };
    
    const policeDetails = () => {
        getPoliceDetails(user).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setStatus(data.user_status);
                unresolvedComplain(data.user_status, 0);
            }
        });
    };
    
    const unresolvedComplain = (status, complain_status) => {
        if(status == 0 && complain_status == 0){
        getUnresolvedComplain().then(data => {
            if(data.error){
            upPoliceStatus(user, 0);
        }else{  
            upComplainAssign();
            upPoliceStatus(user, 1);
            upComplainStatus();
        }    
        });
        }
    };
    
    const upComplainAssign = () => {
        getComplainAssign(user).then(data => {
            if(data.error){
            console.log(data.error);
        }else{  
            console.log(data);
        }    
        });
    };
    const upComplainStatus = (complain_id) => {
        updateComplainStatus(complain_id).then(data => {
            if(data.error){
            console.log(data.error);
        }else{  
            console.log(data);
        }    
        });
    };
    
    const upPoliceStatus = (user, status) => {
        console.log(status);
        updatePoliceAssign(user, status).then(data => {
            if(data.error){
            console.log(data.error);
        }else{  
            console.log(data);
            setRun(!run);
        }    
        });
    }
    
    useEffect(() => {
        policeDetails();
    }, []);
    
    useEffect(() => {
        loadComplains();
    }, [run])
        
    const clickStatus =  (complain_id, complain_status, event) => {
        event.preventDefault();
        upComplainStatus(complain_id);
        unresolvedComplain(0, complain_status);
        setRun(!run);
    };
    
    const getCustomerDetails = (user_id, event) => {
        event.preventDefault();
       getPoliceDetails(user_id).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                console.log(data);
               setCustomer(data); 
            }
        });
    };
    
    const showCustomerDetails = () => (
      <div className = "hello">
        Username: {JSON.stringify(customer.user_name)}
      </div>    
    );
   const listDesign = () => (
     <div className = "row">
        {complains.map((complain, index) => (
      <div className = "col-md-4">
         <div className = "box">
           <h5>{complain.complain_id}</h5>
           <table className="table table-striped table-bordered tableBox">
              <tr>
             <td>Car Number</td>
             <td>{complain.car_number}</td></tr>
              <tr>
             <td>Car Model</td>
             <td>{complain.car_model}</td></tr>
             <tr>
             <td>Car Number</td>
             <td>{complain.car_number}</td></tr>
             <tr>
             <td>Registered On</td>
             <td>{complain.createdAt.toString().slice(0,10)}</td></tr>
             <tr>
             <td>Status</td>
             <td onClick = {(event) => clickStatus(complain._id, complain.complain_status, event)}>{complain.complain_status === 0 ? <p>Not Solved</p> : <span className="badge badge-success">Solved</span>}</td></tr>
            <tr>
             <td>Customer</td>
             <td onClick = {(event) => getCustomerDetails(complain.user_id, event)}>CUST{complain.user_id.slice(0,6)}
             {showCustomerDetails()}
             </td></tr>     
           </table>
         </div>
      </div>
      ))}
     </div>     
    );
    
    useEffect(() => {
        loadComplains();
    }, [run]);
 
    return(
        <div>
        <Menu />
          <div className = "container">
               {JSON.stringify(complains) ? listDesign() : "No Cases"}
                {JSON.stringify(customer)}
          </div>
        </div>
    );
};
export default PoliceDashboard;
