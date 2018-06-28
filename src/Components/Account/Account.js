import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav';
import '../Dashboard/Dashboard.css';



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
                    <h1>Welcome to your WW Account!</h1>
                    <p>Here you can make changes to your personal information</p>
                    <div>
                        <h1>Shipping Address</h1>
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
                        <button onClick={this.submitAddress} >Submit Changes</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Account;