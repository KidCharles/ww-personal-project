import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav'
import Trip from './Trip'
import axios from 'axios';
import trip1 from '../Assets/Trip-yosemite.svg';
import trip2 from '../Assets/Trip-moab.svg';
import trip3 from '../Assets/Trip-oahu.svg';


import '../../App.css';
import './Trip.css';

class Trips extends Component {
    //cahnge to functional
    constructor(props) {
        super(props)
        this.state = {
            trips:[]
        }
    }

    componentDidMount() {
        axios.get('/trips').then((res) => {
            this.setState({
                trips: res.data
            })
        })
    }

    addToCart() { }

    render() {
        //mapped over props.trips
        //pss {e} to trip.. construct the look of the trip in trip JS
        let mappedTrips = this.props.trips.map((e, i) => {
            return (
                <div key={i} style={{ "backgroundColor": e.trip_color }} className='mappedtrip' >

                    {/* <Trip
                        trips={e}
                    /> */}
                </div>

            )
        })
        return (
            <div>
                <Nav />
                <div className='trips column' >
                    <img src={trip1} className='trip navlogo' alt='Yosemite Ca trip icon' />
                    <img src={trip2} className='trip navlogo' alt='Moab Ut trip icon' />
                    <img src={trip3} className='trip navlogo' alt='Oahu Hawaii trip icon' />
                </div>
                <div>
                    {this.props.trip_name}
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