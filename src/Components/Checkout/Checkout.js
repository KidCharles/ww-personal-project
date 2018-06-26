import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false,

            price: 2500
        }
    }

    componentDidMount() {
        // let amount = this.props.location.query.quantity
        // this.setState({ price: amount })
    }

    onPurchaseConfirmation() {
        axios.put('/api/updatePaid/' + this.props.location.query.userId)
    }

    onToken = (token) => {
        token.card = void 0;
        axios.post('http://localhost:3030/api/payment', { token, amount: this.state.price /* the amount actually charged*/ }).then(response => {
            this.onPurchaseConfirmation();
            this.setState({
                redirect: true
            })
            alert('Thanks for your purchase')
        });
    }

    render() {
        if (this.state.redirect)
            return <Redirect to='/dashboard' />
        return (
            <div>
                <section>
                    {/* address */}
                </section>

                <h2> Your Total is: {this.state.price / 100}.00</h2>

                <StripeCheckout
                    token={this.onToken}
                    stripeKey={'pk_test_BZOzha6BMPIWIleFQ5q0Myht'}
                    amount={this.state.price} // The amount displayed at the bottom of the payment form
                />

            </div>
        )
    }

}