import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../Nav/Nav';
// import Gear from '../Gear/Gear';
import Trips from '../Trips/Trips';



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
        //axios call to db, gear / trips  .then => res update redux state 
        axios.get('/insta')
            .then(res => {
                let images = res.data.data.map((e, i) => {
                    let images = e.images.low_resolution.url
                    return images
                })
                this.setState({ insta: images })
            }
            )
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
                <div>
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
                <h1>Dash</h1>
                Gear
                {mappedGear}
                Trips
                {mappedTrips}
                <div>
                    {mappedphotos}
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