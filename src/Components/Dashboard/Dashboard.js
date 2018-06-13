import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../Nav/Nav';
// import Gear from '../Gear/Gear';
// import Trips from '../Trips/Trips';
import './Dashboard.css';



class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            insta: []
            // trips:[],
            // gear: []
        }
    }

    componentDidMount() {
        axios.get('/insta').then(res => {
            this.setState({ insta: res.data })
        })
    }

    handleChange(val) {
        this.setState({ search: val })
    }

    handleSearch() { }

    handleReset() {
        this.setState({ search: '' })
    }

    handleMyPost() {
        this.setState({ userposts: !this.state.userposts })
    }

    render() {
        let mappedphotos = this.state.insta.map((e, i) =>
            <div key={i}>
                <div className='instapic ' >
                    <img alt='' src={e} />
                </div>
            </div>
        )

        let mappedTrips = this.props.trips.map((e, i) => {
            return (
                <Link to='/trips' >
                    <div key={i} style={{ "backgroundColor": e.trip_color }} className='mappedtrip' >
                        {/* add color input on admin trip updater */}
                        {e.trip_img}
                        {e.trip_name}
                    </div>
                </Link>
            )
        })

        let mappedGear = this.props.gear.map((e, i) => {
            return (
                <Link to='/trips' >
                    <div key={i} >
                        {e.gear_img}
                    </div>
                </Link>
            )
        })

        return (
            <div >
                <Nav />
                <div className='backgroundPhoto' >
                    <h1 className='title'>Gear</h1>
                    {mappedGear}
                    <h1 className='title'>Trips</h1>
                    {mappedTrips}
                    <h1 className='title'>Insta</h1>
                    <div className='row' >
                        {mappedphotos}
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        trips: state.trips,
        gear: state.gear
    }
}

export default connect(mapStateToProps)(Dashboard);