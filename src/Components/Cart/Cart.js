import '../Dashboard/Dashboard.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './Cart.css';
import '../Dashboard/Dashboard.css';
import background_logo from '../Assets/background_logo_outline.svg'
import remove_cart from '../Assets/remove_cart_black.svg';
import checkout_button from '../Assets/checkout.svg';
import my_cart from '../Assets/my_cart.svg';
import empty_cart from '../Assets/empty_cart.svg';






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
        axios.get('/api/userInfo').then(user => {
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
                <div key={i} className='gearPicParent'  >
                    {
                        this.state.cart[i].gear_name
                            ?
                            <div className='gearPicParent' >

                                <img src={this.state.cart[i].gear_img} className='cart_item' />
                                <img src={remove_cart} className='remove_cart' onClick={() => this.deleteCartItem(e.cart_id)} />

                                {/* <div style={{ background: `url('${this.state.cart[i].gear_img}')`, width: '200px', height: '200px', backgroundSize: 'cover' }} className='gearpic' ></div> */}
                                <p>{this.state.cart[i].gear_name}:  ${this.state.cart[i].gear_price}</p>
                            </div>
                            :
                            <div className='gearPicParent' >
                                <p> {this.state.cart[i].trip_name}:  ${this.state.cart[i].trips_price}</p>
                            </div>

                    }
                </div>
            )
        })
        return (
            <div >
                <Nav />
                <div className='backgroundPhoto content'>
                    <img src={background_logo} className='background_logo' alt='' />
                    {/* <img src={my_cart} className='my_cart' /> */}

                    <div class=" blue_underline ww_account">
                        <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                            <rect class="shape" height="60" width="320" />
                        </svg>
                        <div class="text">MY WW CART</div>

                    </div>
                    
                    <div >
                        {mappedCart.length > 0 ?
                            <div className='gearPhotos'>
                                {mappedCart}
                            </div>
                            : null
                        }

                        {
                            this.state.cart.length === 0
                                ?
                                <img src={empty_cart} className='' />
                                :


                                <Link to={{ pathname: '/checkout', query: { quantity: this.state.cartAmount, userId: this.state.userId } }} >
                                    <div class="svg-wrapper  checkout">
                                        <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                                            <rect class="shape" height="60" width="320" />
                                        </svg>
                                        <div class="text ">CHECKOUT</div>
                                    </div>
                                </Link>
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default Cart;