import axios from 'axios'
// import { repeat } from 'lodash'

export const executePayment = newPatient => {
    return axios
        .post('api/execute-payment', newPatient, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            // return response
            this.props.history.push(response.data)
        })
        .catch(err => {
            console.log(err)
        })
}

export const createPayment = amt => {
    return axios
        .post('api/create-payment', amt, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response

        })
        .catch(err => {
            console.log(err)
        })
}
 
export const getPaypalSettings = () => {
    return axios
        .post('api/get-paypal-settings', {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

export const updatePaypalSettings = settings => {
    return axios
        .post('api/update-paypal-settings', settings, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}

export const getPayments = id => {
    return axios
        .post('api/get-payments', id, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}
