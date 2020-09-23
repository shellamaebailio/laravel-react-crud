import React, {Component} from 'react'
import {createPayment, getPayments} from './PaymentFunctions'

class CreatePayment extends Component {

    constructor(){
        super()
        this.state = this.getInitialState();
        this.onChange = this.onChange.bind(this)
    }

    getInitialState = () => ({
        price: '', 
        payments: [],
        redirect: false,
        redirect_link: ''
    })


    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    createPayment = (e) =>{

        e.preventDefault()

        const amt = {
            amt: this.state.price,
        }

        createPayment(amt).then(res => {
            // console.log("redirect link")
            // console.log(res.data)
            this.setState({
                redirect: true, 
                redirect_link: res.data
            })

            this.renderRedirect()
            
        })

    }

    renderRedirect = () => {
    if (this.state.redirect) {
        // return <Redirect to={this.state.redirect_link} />
        window.location.href = this.state.redirect_link
    }
    }

    getData(){

        const id = {
            id: localStorage.userid,
        }

        getPayments(id).then(res => {
            
            this.setState({
                payments: res
            })
            
        }).catch(errors => {
            console.log(errors);
        })
    }

    

    componentDidMount() { 
        this.getData();
    }

    render() {

        return (
            
            <div className="container">
                {this.renderRedirect()}
                <div className="jumbotron mt-5">
                    <div className="col-sm-4 mx-auto">
                        <h4 className="text-center">Payments via Paypal</h4>
                    </div>
                    <hr/>
                    <div>
                        <h5>Payments Made</h5>

                        <table className="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Paid At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.payments.map((payment,i) => 
                            <tr key={payment.id}>
                                <th scope="row">{ i+1 }</th>
                                <td>{payment.amt}</td>
                                <td>{payment.created_at}</td>
                            </tr>
                            )}
                            
                        </tbody>
                        </table>
                    </div>
                    <div>
                        <form noValidate onSubmit={this.createPayment}>
                            <input type="number" 
                                id="price" 
                                name="price"
                                className="form-control" 
                                placeholder="Amount" 
                                value={this.state.price}
                                onChange={this.onChange}
                            />
                            <br/>
                            <button type="submit" className= "btn btn-secondary">Pay Now</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        )
    }

}

export default CreatePayment