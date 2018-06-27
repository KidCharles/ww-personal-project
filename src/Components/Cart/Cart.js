import '../Dashboard/Dashboard.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './Cart.css'


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
            // console.log(user)
            if (user.data.username !== undefined) {
                this.setState({ userId: user.data.user_id })
            }
        }).then(() => {
            axios.get(`/api/cart/${this.state.userId}`)
                .then(res => {
                    this.setState({
                        cart: res.data
                    })
                    //FIX THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    this.countCart(res.data)
                })
        })
    };

    countCart(cart) {
        let amount = 0
        for (let i = 0; i < cart.length; i++) {
            if (!cart[i].paid)
                amount += cart[i].gear_price;
                // amount += cart[i].trips_price;
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
        console.log(this.state)
        let mappedCart = this.state.cart.map((e, i) => {
            return (
                <div key={i} >
                    {
                        this.state.cart[i].gear_name
                            ?
                            <div className='gearPicParent' >

                                <img src={this.state.cart[i].gear_img} />

                                {/* <div style={{ background: `url('${this.state.cart[i].gear_img}')`, width: '200px', height: '200px', backgroundSize: 'cover' }} className='gearpic' ></div> */}
                                <p>{this.state.cart[i].gear_name}:  ${this.state.cart[i].gear_price}</p>
                            </div>
                            :
                            <div className='gearPicParent' >
                                <p> {this.state.cart[i].trip_name}:  ${this.state.cart[i].trips_price}</p>
                            </div>

                    }
                    <button className='delete-button' onClick={() => this.deleteCartItem(e.cart_id)}>x</button>
                </div>
            )
        })
        return (
            <div>
                <Nav />
                <h1>THIS IS YOUR CART </h1>

                {mappedCart.length > 0 ?
                    <div className='gearPhoto'>
                        {mappedCart}
                    </div>
                    : null
                }
                <Link to={{ pathname: '/checkout', query: { quantity: this.state.cartAmount, userId: this.state.userId } }} >
                    <button className='' >Checkout</button>
                </Link>
            </div>
        )
    }

}

export default Cart;