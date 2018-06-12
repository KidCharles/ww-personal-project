import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
// import Gear from '../Gear/Gear';
import Trips from '../Trips/Trips';



class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // trips:[],
            // gear: []
        }
    }

    componentDidMount() {
        //axios call to db, gear / trips  .then => res update redux state 
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
        //let mapped trips/gear
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