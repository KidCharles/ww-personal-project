import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTrips, deleteTrip } from '../../ducks/reducer';
import Nav from '../Nav/Nav'
// import Trip from './Trip'
import axios from 'axios';
import '../Dashboard/Dashboard.css';
import './Trip.css';

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

    // addToCart() { }

    render() {
        //mapped over props.trips
        //pss {e} to trip.. construct the look of the trip in trip JS
        let mappedTrips = this.props.trips.map((e, i) => {
            return (
                <div key={e.trips_id} style={{ "backgroundColor": e.trip_color }} className='trips' >
                    <div className='row tripBanner'>
                        <div className='row coord'>
                            <h1>coordinates</h1>
                            <div className='column coord' >
                                <img src={e.trip_img} className='' alt='trip pic' />
                                <h1>{e.trip_name}</h1>
                            </div>
                        </div>
                        <div className='column coord' >
                            <h1>Backpacker Package</h1>
                            <h1>{e.trip_short_desc}</h1>
                            <h1>${e.trip_price}</h1>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div >
                <Nav />
                <div className='backgroundPhoto'>
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