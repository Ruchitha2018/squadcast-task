import React, { useState, useEffect } from "react";
import Menu from "../core/Menu";
import { isAuthenticated } from "../auth";
import { listComplains, getUnresolvedComplain, getComplainAssign, getPoliceDetails, updatePoliceAssign, updateComplainStatus} from "./policeApiCore";

const PoliceDashboard = () => {
    
    const { user } = isAuthenticated();
    const [complains, setComplains] = useState([]);
    const [run, setRun] = useState(false);
    const [status, setStatus] = useState([]);
    
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
        
    const clickStatus = (event) => (complain_id, complain_status) => {
        console.log(event);
        event.preventDefault();
        unresolvedComplain(0, complain_status);
        upComplainStatus(complain_id);
        setRun(!run);
    };
 
    const listTable = () => (
      <table className="table table-striped tableBox">
    <thead>
      <tr>
        <th>Sr.No</th>
        <th>Case No</th>
        <th>Car Number</th>
        <th>Car Model</th>
        <th>Registered On</th>
        <th>Status</th>
        <th>Customer</th>
      </tr>
    </thead>
    <tbody>
        {complains.map((complain, index) => (
           <tr>
             <td>{index+1}</td>
             <td>{complain.complain_id}</td>
             <td>{complain.car_number}</td>
             <td>{complain.car_model}</td>
             <td>{complain.createdAt.toString().slice(0,10)}</td>
             <td onClick = {() => clickStatus(complain._id, complain.complain_status)}>{complain.complain_status === 0 ? <p>Not Solved</p> : <p>Solved</p>}</td>
             <td>{complain.user_id}
                 <td>Hello</td>
               </td>
           </tr>
        ))}
    </tbody>
  </table>
    );  
    useEffect(() => {
        loadComplains();
    }, [run]);
 
    return(
        <div>
        <Menu />
          <div className = "container">
            <div className = "row">
              <div className = "col-md-12">
               {JSON.stringify(complains) ? listTable() : "No Cases"}
               {status}
              </div>
            </div>
          </div>
        </div>
    );
};
export default PoliceDashboard;
