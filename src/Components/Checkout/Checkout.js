import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Nav from '../Nav/Nav';

export default class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false,

            id: '',
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: '',

            price: 2500
        }
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
        })
    };

    onPurchaseConfirmation() {
        axios.put(`/api/updatePaid/${this.state.id}`)
    }

    onToken = (token) => {
        token.card = void 0;
        axios.post('http://localhost:3030/api/payment', { token, amount: this.state.price /* the amount actually charged*/ })
            .then(response => {
                this.onPurchaseConfirmation();
                this.setState({
                    redirect: true
                })
                alert('Thanks for your purchase')
            });
    }

    render() {
        if (this.state.redirect)
            return <Redirect to='/cart' />
        return (
            <div>
                <Nav />
                <section>
                    <div>{this.state.street1}</div>
                    {this.state.street2 ? <div>{this.state.street2}</div> : null}
                    <div>{this.state.city}</div>
                    <div>{this.state.state}</div>
                    <div>{this.state.zip}</div>
                    <p>If your address is not correct, please update it on your "Account" page before completing your purchase</p>
                </section>

                <h1> Your Total is: {this.state.price / 100}.00</h1>

                <StripeCheckout
                    token={this.onToken}
                    stripeKey={'pk_test_BZOzha6BMPIWIleFQ5q0Myht'}
                    amount={this.state.price} // The amount displayed at the bottom of the payment form
                />

            </div>
        )
    }

}