import React, { Component } from 'react';
import Nav from '../Nav/Nav'

class Gear extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gear_id: 0,
            gear_price: 0,
            gear_pic: '',
            gear_desc: ''
            //possible search
        }
    }

    

    addToCart() {
        //
    }

    render() {
        return (
            <div>
                <Nav/>
                <h1>Gear</h1>
            </div>
        )
    }
}

export default Gear;