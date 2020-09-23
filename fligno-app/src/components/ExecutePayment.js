import React, {Component} from 'react'
import {executePayment} from './PaymentFunctions'

class ExecutePayment extends Component {

    componentDidMount() {

        // get the payment in url 
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        
        const payment = {
            paymentId : urlParams.get('paymentId'),
            payerId: urlParams.get('PayerID'),
            amt: urlParams.get('amt'),
            userid: localStorage.userid
        }

        // pass in function - to pass in controller back-en
        executePayment(payment).then(res => {
            console.log("dsa")
            console.log(res)
            console.log("dsa")
        })
    }

    render() {

        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-4 mx-auto">
                        <h1 className="text-center">Thank You</h1>
                    </div>
                    <div>
                        <div id="paypal-button"></div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ExecutePayment