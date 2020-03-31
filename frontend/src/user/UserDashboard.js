import React, { useState, useEffect } from "react";
import Menu from "../core/Menu";
import { isAuthenticated } from "../auth";
import { listComplains } from "./apiCore";

const UserDashboard = () => {
    
    const { user } = isAuthenticated();
    const [complains, setComplains] = useState([]);

    const loadComplains = () => {
            listComplains(user).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setComplains(data);
            }
        }); 
     };
    
    useEffect(() => {
        loadComplains();
    }, []);
    const TableDesign = () => (
     <table className="table table-striped tableBox">
    <thead>
      <tr>
        <th>Sr.No</th>
        <th>Case No</th>
        <th>Car Number</th>
        <th>Car Model</th>
        <th>Registered On</th>
        <th>Status</th>
        <th>Police Assigned</th>
      </tr>
    </thead>
    <tbody>
        {complains.map((complain, index) => (
           <tr>
             <td>{index+1}</td>
             <td>{complain.complain_id}</td>
             <td>{complain.car_number}</td>
             <td>{complain.car_model}</td>
             <td>{complain.createdAt}</td>
             <td>{complain.complain_status === 0 ? "Not Solved" : "Solved"}</td>
             <td>{complain.assign_police_id}</td>
           </tr>
        ))}
    </tbody>
  </table>
      
    )
 
    return(
        <div>
        <Menu />
          <div className = "container">
            <div className = "row">
              <div className = "col-md-12">
                {TableDesign()}
              </div>
            </div>
          </div>
        </div>
    );
};
export default UserDashboard;
