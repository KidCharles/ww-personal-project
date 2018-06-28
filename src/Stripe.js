import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import stripe from './stripeKey';
import axios from 'axios';

class Money extends Component {
    constructor() {
        super();
        this.state = {
            price: 0
        }
    }
    onToken = (token) => {
        token.card = void 0;
        console.log('token', token);
        axios.post('/api/payment', { token, amount: this.state.price }).then(response => {
            alert('we are in business')
        });
    }

    render() {
        return (
            <div className="App">
                <StripeCheckout
                    token={this.onToken}
                    stripeKey={stripe.pub_key}
                    amount={1000}
                />
            </div>
        );
    }
}

export default Money;