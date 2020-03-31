import { API } from "../config";

//PoliceOfficer Complains List
export const listComplains = (policeId) => {
    
    return fetch(`${API}/police/list/${policeId}`, {
        method: "GET",
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {return data;})
};

//Check and Get Unresolved Complain
export const getUnresolvedComplain = () => {
    return fetch(`${API}/police/get-unresolved-complain/1`, {
        method: "GET",
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {return data;})
}

//Get Complain Police Assign
export const  getComplainAssign = (police_id) => {
    console.log(police_id);
    return fetch(`${API}/police/update-complain-assign/${police_id}/1`, {
        method: "GET",
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {return data;})
}

//Get Police Details
export const  getPoliceDetails = (police_id) => {
    console.log(police_id);
    return fetch(`${API}/police/police-detail/${police_id}`, {
        method: "GET",
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {return data;})
}

export const updatePoliceAssign = (user_id, status_id) => {
    console.log(status_id);
    return fetch(`${API}/police/update-police-status/${user_id}/${status_id}`, {
        method: "GET",
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {return data;})
}

//Update Complain Status

export const updateComplainStatus = (complainId) => {
    
    return fetch(`${API}/police/update-complain-status/${complainId}`, {
        method: "GET",
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {return data;})
};


//

//
//export const addComplain = complain => {
//    
//    return fetch(`${API}/complain/add`, {
//        method: "POST",
//        headers: {
//            'Accept': 'application/json',
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(complain)
//    }).then(response => {
//            return response.json();
//        }).catch(err => {
//            console.log(err);
//        });
//};
//
//export const listComplains = (userId) => {
//    return fetch(`${API}/complain/list/${userId}`, {
//        method: "GET",
//        headers:{
//            'Content-Type':'application/json',
//            'Accept': 'application/json'
//        }
//    })
//    .then((response) => response.json())
//    .then((data) => {return data;})
//};
//
//export const policeAvail = () => {
//     return fetch(`${API}/complain/policeAvail/1`, {
//        method: "GET",
//        headers:{
//            'Content-Type':'application/json',
//            'Accept': 'application/json'
//        }
//    })
//    .then((response) => response.json())
//    .then((data) => {return data;})
//}
//
//export const checkComplainStatus = () => {
//    return fetch(`${API}/complain/checkComplainStatus/1`, {
//        method: "GET",
//        headers:{
//            'Content-Type':'application/json',
//            'Accept': 'application/json'
//        }
//    })
//    .then((response) => response.json())
//    .then((data) => {return data;})
//}
//
//export const updatePoliceAvail = () => {
//    return fetch(`${API}/complain/updatePoliceStatus/1`, {
//        method: "GET",
//        headers:{
//            'Content-Type':'application/json',
//            'Accept': 'application/json'
//        }
//    })
//    .then((response) => response.json())
//    .then((data) => {return data;})
//}
//

//
//export const updateComplain = () => {
//    return fetch(`${API}/complain/updateComplain/1/1`, {
//        method: "GET",
//        headers:{
//            'Content-Type':'application/json',
//            'Accept': 'application/json'
//        }
//    })
//    .then((response) => response.json())
//    .then((data) => {return data;})
//}


