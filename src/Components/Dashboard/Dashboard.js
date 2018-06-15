import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTrips, deleteTrip } from '../../ducks/reducer';
import axios from 'axios';
import Nav from '../Nav/Nav';
// import Gear from '../Gear/Gear';
// import Trips from '../Trips/Trips';
import './Dashboard.css';



class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            insta: [],
            // trips:[],
            // gear: []
        }
    }

    componentDidMount() {
        axios.get('/api/insta').then(res => {
            this.setState({ insta: res.data })
        })
        axios.get('/api/trips').then((res) => {
            this.props.getTrips(res.data);
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
            <div key={"inst" + i}>
                <div className='instapic ' >
                    <img alt='' src={e} />
                </div>
            </div>
        )

        let mappedTrips = this.props.trips.map((e, i) => {
            return (
                <Link to='/trip' key={"trips" + i}>
                    <div style={{ "backgroundColor": e.trip_color }} className='instapic column' >
                        <div>
                            <img src={e.trip_img} className='tripIcon' alt='trip pic' />
                        </div>
                        <div>
                            {e.trip_name}
                        </div>
                    </div>
                </Link>
            )
        })

        let mappedGear = this.props.gear.map((e, i) => {
            return (
                <Link to='/gear' key={"gear" + i} >
                    <div  >
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
                    <div className='row'>
                        {mappedTrips}
                    </div>
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

export default connect(mapStateToProps, { getTrips })(Dashboard);