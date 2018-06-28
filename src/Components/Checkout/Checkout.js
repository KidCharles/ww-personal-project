import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Nav from '../Nav/Nav';
import SweetAlert from 'sweetalert2-react';
import './Checkout.css'
import test from '../Assets/test.svg';
import '../Dashboard/Dashboard.css';


export default class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            alertToggle: false,

            id: '',
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: '',

            price: 0,

            show: false
        }
    }

    componentDidMount() {
        axios.get("/api/userInfo").then(res => {
            this.setState({
                id: res.data.user_id,
                street1: res.data.street1,
                street2: res.data.street2,
                city: res.data.city,
                state: res.data.state,
                zip: res.data.zip
            })
        })
        let amount = this.props.location.query.quantity
        amount *= 100
        this.setState({
            price: amount
        })
    };

    handleClick() {
        this.setState({
            redirect: true
        })
    }

    // onPurchaseConfirmation() {
    //     axios.put(`/api/updatePaid/${this.state.id}`)
    // }

    onToken = (token) => {
        token.card = void 0;
        axios.post(`/api/payment/${this.state.id}`, { token, amount: this.state.price /* the amount actually charged*/ })
            .then(response => {
                // this.onPurchaseConfirmation();
                this.setState({ alertToggle: true })
            });
    }

    render() {
        console.log(this.state)
        if (this.state.redirect)
            return <Redirect to='/cart' />
        return (
            <div>
                <Nav />
                <div className='backgroundPhoto content' >
                    <div>
                        <p>Your address:</p>
                        <p>street: {this.state.street1}</p>
                        <p>city: {this.state.city}</p>
                        <p>state: {this.state.state}</p>
                        <p>zip: {this.state.zip}</p>
                        <p>If your address is not correct, please update it on your "Account" page before completing your purchase</p>
                    </div>
                    <h1> Your Total is: ${this.state.price / 100}.00</h1>
                    <StripeCheckout
                        token={this.onToken}
                        stripeKey={'pk_test_BZOzha6BMPIWIleFQ5q0Myht'}
                        amount={this.state.price} // The amount displayed at the bottom of the payment form
                    />
                    {
                        this.state.alertToggle
                            ?
                            <div className='thanks' >
                                <img src={test} className='' alt='' />
                                <button type='' className='' onClick={() => this.handleClick()} >NEXT</button>
                            </div >
                            :
                            null
                    }
                </div>
            </div>
        )
    }

}