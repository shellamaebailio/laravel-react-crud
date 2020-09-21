import axios from 'axios'

export const savePatient = newPatient => {
    return axios
        .post('api/patient', newPatient, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}

export const updatePatient = patient => {
    
    return axios
        .put('api/patient/'+patient.patientID, patient, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}

export const deletePatient = patientID => {
    return axios 
        .delete('api/patient/'+patientID, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
}

export const getPatient = () => {
    return axios
        .get('api/patient', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getSpecificPatient = patientID => {
    return axios
        .post('api/getSpecificPatient', patientID, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

