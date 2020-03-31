import { API } from "../config";

//PoliceOfficer Complains List
export const listPoliceComplains = (userId) => {
    
    return fetch(`${API}/police/list-complains/${userId}`, {
        method: "GET",
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {return data;})
};


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

//Check Complain Status
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

//Get Police Assign
export const  getPoliceAssign = (user) => {
    console.log(user);
    return fetch(`${API}/police/update-complain/${user}/1`, {
        method: "GET",
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {return data;})
}

export const addComplain = complain => {
    
    return fetch(`${API}/complain/add`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(complain)
    }).then(response => {
            return response.json();
        }).catch(err => {
            console.log(err);
        });
};

export const listComplains = (userId) => {
    return fetch(`${API}/complain/list/${userId}`, {
        method: "GET",
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {return data;})
};

export const policeAvail = () => {
     return fetch(`${API}/complain/policeAvail/1`, {
        method: "GET",
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {return data;})
}

export const checkComplainStatus = () => {
    return fetch(`${API}/complain/checkComplainStatus/1`, {
        method: "GET",
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {return data;})
}

export const updatePoliceAvail = () => {
    return fetch(`${API}/complain/updatePoliceStatus/1`, {
        method: "GET",
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {return data;})
}

export const updatePoliceAssign = () => {
    return fetch(`${API}/complain/updatePoliceStatus/1`, {
        method: "GET",
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {return data;})
}

export const updateComplain = () => {
    return fetch(`${API}/complain/updateComplain/1/1`, {
        method: "GET",
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {return data;})
}


