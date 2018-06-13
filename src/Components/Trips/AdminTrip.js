import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTrip } from '../../ducks/reducer';
import axios from 'axios';
import Nav from '../Nav/Nav'
import './Trip.css';
import '../../App.css';
import '../Dashboard/Dashboard.css';


class AdminTrip extends Component {
    constructor(props) {
        super()
        this.state = {
            trip_name: '',
            trip_img: '',
            trip_long_desc: '',
            trip_short_desc: '',
            trip_price: 0,
            trip_color: '',
        }
    }

    handleTripName(val) {
        this.setState({ trip_name: val })
    }

    handleTripImg(val) {
        this.setState({ trip_img: val })
    }

    handleLongDesc(val) {
        this.setState({ trip_long_desc: val })
    }

    handleShortDesc(val) {
        this.setState({ trip_short_desc: val })
    }

    handleTripPrice(val) {
        this.setState({ trip_price: val })
    }

    handleTripColor(val) {
        this.setState({ trip_color: val })
    }

    handleClick() {

        let body = {
            trip_name: this.state.trip_name,
            trip_img: this.state.trip_img,
            trip_long_desc: this.state.trip_long_desc,
            trip_short_desc: this.state.trip_short_desc,
            trip_price: this.state.trip_price,
            trip_color: this.state.trip_color,
        }
        !body.trip_name
            ?
            alert('please fill out form correctly')
            :
            axios.post('/addtrip', body).then((trips) => {
                // make sure this endpoint sends back an updated trips list
                // then update trips on redux state 
                this.setState({trips: trips.data})

                this.props.addTrip(this.state.trips)
            })
    }

    render() {
        return (
            <div className='backgroundPhoto' >
                <Nav />
                <form className='mappedtrip column' >
                    <p>TRIP NAME:</p>

                    <input type='text' className='column' onChange={(e) => this.handleTripName(e.target.value)} />
                    <p>TRIP ICON:</p>

                    {/* image URL */}
                    <input type='text' className='column' onChange={(e) => this.handleTripImg(e.target.value)} />
                    <p>LONG DESCRIPTION:</p>

                    <input type='text' className='column' onChange={(e) => this.handleLongDesc(e.target.value)} />
                    <p>SHORT DESCRIPTION:</p>

                    <input type='text' className='column' onChange={(e) => this.handleShortDesc(e.target.value)} />
                    <p>TRIP PRICE:</p>

                    <input type='number' className='column' onChange={(e) => this.handleTripPrice(e.target.value)} />
                    <p>COLOR:</p>

                    <input type='color' className='column' onChange={(e) => this.handleTripColor(e.target.value)} />
                    <br />
                    <button onClick={()=> this.handleClick()} >CREAT NEW TRIP</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { addTrip })(AdminTrip);