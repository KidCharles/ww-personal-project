import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav'
// import Trip from './Trip'
import axios from 'axios';
import '../Dashboard/Dashboard.css';


import '../../App.css';
import './Trip.css';

class Trips extends Component {
    //cahnge to functional
    constructor(props) {
        super(props)
        this.state = {
            trips: []
        }
    }

    componentDidMount() {
        axios.get('/api/trips').then((res) => {
            this.setState({
                trips: res.data
            })
        })
    }

    deleteTrip(id) {
        console.log(id)
        axios.delete(`/api/trip/${id}`).then(res => {
            this.setState({
                trips: res.data
            })
        })
    }

    addToCart() { }

    render() {
        //mapped over props.trips
        //pss {e} to trip.. construct the look of the trip in trip JS
        let mappedTrips = this.state.trips.map((e, i) => {
            return (
                <div key={e.trips_id} style={{ "backgroundColor": e.trip_color }} className='trips column' >
                    <div>
                        <h1>coordinates</h1>
                        <h1>{e.trip_name}</h1>
                        <img src={e.trip_img} className='' alt='trip pic' />
                        <h1>Backpacker Package</h1>
                        <h1>{e.trip_short_desc}</h1>
                        <h1>${e.trip_price}</h1>
                        <button onClick={() => { this.deleteTrip(e.trips_id) }} >X</button>
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
export default connect(mapStateToProps)(Trips);