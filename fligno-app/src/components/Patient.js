import React, {Component} from 'react'
import {savePatient, getSpecificPatient, getPatient, updatePatient, deletePatient} from './PatientFunctions'



class Patient extends Component {

    constructor(){
        super()
        this.state = this.getInitialState();

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.reset = this.reset.bind(this);
        this.updatePatient = this.updatePatient.bind(this)
        this.deletePatient = this.deletePatient.bind(this)
        this.setStatus = this.setStatus.bind(this)
    }

    getInitialState = () => ({
            patients: [],
            firstName: '',
            lastName: '',
            contactNo: '',
            patientID: '',
            status: 'active'
    })

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e){
        e.preventDefault()

        const newPatient = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            contactNo: this.state.contactNo,
            patientID: this.state.patientID,
            status: this.state.status
        }

        savePatient(newPatient).then(res => {
            console.log(newPatient)
            if(res) {
                this.props.history.push(`/patient`)
            }
            this.reset();
            this.getData();
        }).catch(err => {
            console.log(err)
        })
    }

    reset(){
        this.setState(
            ({
                firstName: '',
                lastName: '',
                contactNo: '',
                patientID: '',
                status: 'active'
            })
        )
    }

    getData(){
        getPatient().then(res => {
            
            this.setState({
                patients: res
            })
            
        }).catch(errors => {
            console.log(errors);
        })
    }

    componentDidMount() {
        this.getData();
    }

    // edit
    setEditData = (e) =>{

        getSpecificPatient(e).then(res => {
            this.setState(
                ({
                    firstName: res.data[0].firstName,
                    lastName: res.data[0].lastName,
                    contactNo: res.data[0].contactNo,
                    patientID: res.data[0].id,
                    status: res.data[0].status
                })
            )
            
        }).catch(err => {
            console.log(err)
        })
    }
    updatePatient = (e) =>{

        e.preventDefault()

        const editPatient = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            contactNo: this.state.contactNo,
            patientID: this.state.patientID,
            status: this.state.status
        }

        updatePatient(editPatient).then(res => {
            console.log(res)
            this.reset();
            this.getData();
        })

    }

    deletePatient = (e) =>{
        
        deletePatient(e.id).then(res => {
            console.log(res)
            this.reset()
            this.getData()
        }).catch(error => {
            console.log(error)
        })
    }
    setStatus = (e) =>{
        
        
        const editPatient = {
            firstName: e.patient.firstName,
            lastName: e.patient.lastName,
            contactNo: e.patient.contactNo,
            patientID: e.patient.id,
            status: e.status
        }
        console.log(editPatient)
        updatePatient(editPatient).then(res => {
            this.reset();
            this.getData();
        })
    }

    render() {
        const adminComponent = (
            <tbody>

                {this.state.patients.map((patient,i) => 
                <tr key={patient.id}>
                    <th scope="row">{ i+1 }</th>
                    <td>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td>{patient.contactNo}</td>
                    <td>
                    <button onClick={() => {this.setStatus({'patient':patient, 'status':'active'}) }} type="button" className={patient.status === 'active'? 'btn btn-primary btn-sm':'btn btn-secondary btn-sm'}>Active</button>
                    <button onClick={() => {this.setStatus({'patient':patient, 'status':'expired'}) }} type="button" className={patient.status === 'expired'? 'btn btn-warning btn-sm':'btn btn-secondary btn-sm'}>Expired</button>
                    <button onClick={() => {this.setStatus({'patient':patient, 'status':'recovered'}) }} type="button" className={patient.status === 'recovered'? 'btn btn-success btn-sm':'btn btn-secondary btn-sm'}>Recovered</button>&nbsp; | &nbsp;
                    <button onClick={() => {this.setEditData({'id':patient.id}) }} type="button" className="btn btn-success btn-sm">Edit</button>
                    <button onClick={() => {this.deletePatient({'id':patient.id}) }} type="button" className="btn btn-danger btn-sm">Delete</button> 
                    </td>
                </tr>
                )}

            </tbody>
            
        )
        
        const userComponent = (
            <tbody>

                {this.state.patients.map((patient,i) => 
                <tr key={patient.id}>
                    <th scope="row">{ i+1 }</th>
                    <td>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td>{patient.contactNo}</td>
                    <td>
                    <button type="button" className={patient.status === 'active'? 'btn btn-primary btn-sm':'btn btn-secondary btn-sm'}>Active</button>
                    <button type="button" className={patient.status === 'expired'? 'btn btn-warning btn-sm':'btn btn-secondary btn-sm'}>Expired</button>
                    <button type="button" className={patient.status === 'recovered'? 'btn btn-success btn-sm':'btn btn-secondary btn-sm'}>Recovered</button>
                    </td>
                </tr>
                )}
                
            </tbody>
        )

        const adminComponent2 = (
            <div>

            <hr/>
            <h4>Save New Patient</h4>
            <br/>

            <form noValidate onSubmit={this.state.patientID? this.updatePatient: this.onSubmit}> 
            <div className="row">
                <div className="col">
                <label htmlFor="firstName">First Name</label>
                <input type="text" 
                    id="firstName"
                    name="firstName"
                    className="form-control" 
                    placeholder="First name"
                    value={this.state.firstName}
                    onChange={this.onChange}
                />
                </div>
                <div className="col">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" 
                    id="lastName"
                    name="lastName"
                    className="form-control" 
                    placeholder="Last name"
                    value={this.state.lastName}
                    onChange={this.onChange}
                />
                </div>
            </div>
            <div className="row">
                <div className="col">
                <label htmlFor="contactNo">Contact Number</label>
                <input type="text" 
                    id="contactNo" 
                    name="contactNo"
                    className="form-control" 
                    placeholder="Contact Number" 
                    value={this.state.contactNo}
                    onChange={this.onChange}
                />
                </div>
            </div>
            <br/>
                <button type="submit" className="btn btn-primary">{this.state.patientID ? 'Update Patient' : 'Save New Patient'}</button> &nbsp;
                <button type="button" onClick={this.reset} className= {this.state.patientID ? "btn btn-secondary" : "btn btn-secondary hidden"}>Clear</button>
            </form>

            </div>
        )


        return (
            <div className="container">
                <div className="jumbotron mt-5">

                    <button type="button" className="btn btn-success btn-sm"><h4>{localStorage.userrole === '1'? 'ADMIN' : 'MERE USER'}</h4></button>

                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PATIENT DASHBOARD</h1>
                        
                    </div>
                    
                    <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Contact #</th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>

                        {localStorage.userrole === '1'? adminComponent : userComponent}

                        </table>

                        {localStorage.userrole === '1'? adminComponent2 : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default Patient