import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav';
import '../Dashboard/Dashboard.css';
import { Link } from 'react-router-dom';
import './Account.css'



class Account extends Component {
    constructor() {
        super()
        this.state = {
            currentS1: '',
            currentS2: '',
            currentCity: '',
            currentState: '',
            currentZip: null,

            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: null,

            id: 0,

            cart: []
        }
        this.submitAddress = this.submitAddress.bind(this)
    }

    componentDidMount() {
        axios.get("/api/userInfo").then(res => {
            this.setState({
                id: res.data.user_id,
                currentS1: res.data.street1,
                currentS2: res.data.street2,
                currentCity: res.data.city,
                currentState: res.data.state,
                currentZip: res.data.zip
            })
            axios.get(`/api/cart/${this.state.id}`).then(res => {
                this.setState({
                    cart: res.data
                })
            })
        })
    };

    handleInputChange(e) {
        let value = e.target.value
        let name = e.target.name
        this.setState({
            [name]: value
        })
    };

    submitAddress() {
        let body = {
            id: this.state.id,
            street1: this.state.street1 === '' ? this.state.currentS1 : this.state.street1,
            street2: this.state.street2 === '' ? this.state.currentS2 : this.state.street2,
            city: this.state.city === '' ? this.state.currentCity : this.state.city,
            state: this.state.state === '' ? this.state.currentState : this.state.state,
            zip: this.state.zip === '' ? this.state.currentZip : this.state.zip,
        }
        axios.put('/api/updateAddress', body).then(res => {
            axios.get('/api/getAddress').then(res => {
                console.log(res.data)
                this.setState({
                    currentS1: res.data[0].street1,
                    currentS2: res.data[0].street2,
                    currentCity: res.data[0].city,
                    currentState: res.data[0].state,
                    currentZip: res.data[0].zip
                })
            })
        })
        alert("changes submitted")
    };

    render() {
        console.log(this.state)
        return (
            <div >
                <Nav />
                <div className='backgroundPhoto content'>
                    <div className=' ww_account'>
                        <div class="blue_underline">
                            <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                                <rect class="shape" height="60" width="320" />
                            </svg>
                            <div class="text">MY WW ACCOUNT</div>
                        </div>
                    </div>

                    <p>Here you can make changes to your personal information</p>
                    <div className='addressForm'>
                        <div class="text ship">SHIPPING ADDRESS</div>
                        <p>Street 1*</p>
                        <input placeholder={this.state.currentS1} name='street1' onChange={e => this.handleInputChange(e)} />
                        <p>Street 2</p>
                        <input placeholder={this.state.currentS2} name='street2' onChange={e => this.handleInputChange(e)} />
                        <p>City*</p>
                        <input placeholder={this.state.currentCity} name='city' onChange={e => this.handleInputChange(e)} />
                        <p>State*</p>
                        <input placeholder={this.state.currentState} name='state' onChange={e => this.handleInputChange(e)} />
                        <p>Zip*</p>
                        <input placeholder={this.state.currentZip} name='zip' onChange={e => this.handleInputChange(e)} />
                        <br />

                        <div className=' ww_account'>
                            <div class="svg-wrapper">
                                <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                                    <rect class="shape" height="60" width="320" />
                                </svg>
                                <div onClick={this.submitAddress} class="text">SUBMIT CHANGES</div>
                            </div>
                        </div>

                        <div className=' ww_account'>
                            <Link to='/' >
                                <div class="svg-wrapper ">
                                    <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                                        <rect class="shape" height="60" width="320" />
                                    </svg>
                                    <div href={process.env.REACT_APP_LOGOUT} class="text">LOGOUT</div>
                                </div>
                        </Link>
                            </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default Account;