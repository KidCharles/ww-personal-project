import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTrips, deleteTrip } from '../../ducks/reducer';
import Nav from '../Nav/Nav'
// import Trip from './Trip'
import axios from 'axios';
import '../Dashboard/Dashboard.css';
import './Trip.css';
import add_cart from '../Assets/add_cart_button.svg'

class Trips extends Component {
    //cahnge to functional
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        axios.get('/api/trips').then((res) => {
            this.props.getTrips(res.data);
        })

    }

    addToCartTrips(id) {
        axios.post(`/api/addToCartTrips/${id}`).then(alert('added to your cart'))
    }

    render() {
        //mapped over props.trips
        //pss {e} to trip.. construct the look of the trip in trip JS
        let mappedTrips = this.props.trips.map((e, i) => {
            return (
                <div key={e.trips_id} style={{ "backgroundColor": e.trip_color }} className='trips' >
                    <div className='row tripBanner'>
                        <div className='coord'>
                            <h1>coordinates</h1>
                            <div className='column trip_img' >
                                <img src={e.trip_img} className='' alt='trip pic' />
                                <h1>{e.trip_name}</h1>
                            </div>
                        </div>
                        <div className='' >
                            <h1>Backpacker Package</h1>
                            <h1>{e.trip_short_desc}</h1>
                            <h1>${e.trip_price}</h1>
                            <img src={add_cart} className='add_cart' onClick={() => this.addToCartTrips(e.trips_id)} />
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div >
                <Nav />
                <div className='backgroundPhoto'>

                    <div class="blue_underline ww_account">
                        <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                            <rect class="shape" height="60" width="320" />
                        </svg>
                        <div class="text">TRIPS INFO</div>
                    </div>

                    {mappedTrips}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        trips: state.trips
    }
}
export default connect(mapStateToProps, { getTrips, deleteTrip })(Trips);