import '../Dashboard/Dashboard.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            cartAmount: 0,
            userId: 0
        }
    }

    componentDidMount() {
        axios.get('/auth/user').then(user => {
            console.log(user)
            if (user.data.username !== undefined) {
                this.setState({ userId: user.data.user_id })
            }
        }).then(() => {
            axios.get(`/api/cart/${this.state.userId}`)
                .then(res => {
                    this.setState({
                        cart: res.data
                    })
                    this.countCart(res.data)
                })
        })
    };

    countCart(cart) {
        let amount = 0
        for (let i = 0; i < cart.length; i++) {
            if (!cart[i].paid)
                amount += cart[i].quantity
        }
        this.setState({ cartAmount: amount })
    };

    deleteCartItem(id) {
        axios.delete(`/api/cartDelete/${id}`)
            .then(() => {
                axios.get(`/api/cart/${this.state.userId}`).then(res => {
                    this.setState({
                        cart: res.data
                    })
                    this.countCart(res.data)
                })
            })
    };

    render() {
        // let mappedCart = this.state.cart.map((cart, i )=> )
        return (
            <div>
                <h1>THIS IS YOUR CART </h1>


                <Link to={{ pathname: '/checkout', query: { quantity: this.state.cartAmount, userId: this.state.userId } }} >
                    <button className='' >Checkout</button>
                </Link>
            </div>
        )
    }

}

export default Cart;