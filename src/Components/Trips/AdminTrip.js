import React, { Component } from 'react';
// import axios from 'axios';
import './Trip.css';
import '../../App.css';

class AdminTrip extends Component {
    constructor(props) {
        super()
        this.state = {
            trip_name: '',
            trip_img: '',
            trip_long_desc: '',
            trip_short_desc: '',
            trip_price: 0,
            trip_color: ''
        }
    }

    render() {
        return (
            <div className='mappedtrip column' >
                <form>
                    <input type='color' className=''/>
                    <input type='imgage' className=''/>
                     trip name: <input type='text' className=''/>
                </form>
            </div>
        )
    }
}

export default AdminTrip