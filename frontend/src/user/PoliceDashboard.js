import React, { useState, useEffect } from "react";
import Menu from "../core/Menu";
import { isAuthenticated } from "../auth";
import { listPoliceComplains, updateComplainStatus, getUnresolvedComplain, getPoliceAssign } from "./apiCore";

const PoliceDashboard = () => {
    
    const { user } = isAuthenticated();
    const [complains, setComplains] = useState([]);
    const [run, setRun] = useState(false);
    const loadComplains = () => {
            listPoliceComplains(user).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setComplains(data);
            }
        }); 
     };
  
    const clickStatus = (complain_id) => {
      updateComplainStatus(complain_id).then(data => {
        if(data.error){
            console.log(data.error);
        }else{     
            unresolvedComplain();
            setRun(!run); 
        }    
      });
    };
    
    const unresolvedComplain = () => {
        getUnresolvedComplain().then(data => {
            if(data.error){
            console.log(data.error);
        }else{  
            updatePoliceAssign();
           console.log(data);
            setRun(!run); 
        }    
        });
    }
    
    const updatePoliceAssign = () => {
        getPoliceAssign(user).then(data => {
            if(data.error){
            console.log(data.error);
        }else{  
            console.log(data);
            setRun(!run); 
        }    
        });
    }
    
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
             <td onClick = {() => clickStatus(complain._id)}>{complain.complain_status === 0 ? <p>Not Solved</p> : <p>Solved</p>}</td>
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
               {user}
              </div>
            </div>
          </div>
        </div>
    );
};
export default PoliceDashboard;
