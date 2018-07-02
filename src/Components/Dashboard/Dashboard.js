import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTrips, getGear } from '../../ducks/reducer';
import axios from 'axios';
import Slider from "react-slick";
import Nav from '../Nav/Nav';
import './Dashboard.css';
import logo from '../Assets/cart.svg'


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
        window.scrollTo( 0, 0 ) 
        axios.get('/api/insta').then(res => {
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

        var settings = {
            dots: true,
            infinite: true,
            speed: 900,
            slidesToShow: 4,
            slidesToScroll: 2,
            // className: 'slideMargin',
            autoplay: true,
            autoplaySpeed: 3000,
            // easing: 'linear',
        };

        let mappedphotos = this.state.insta.map((e, i) =>
            <div key={"inst" + i}>
                <div className='instapic ' >
                    <img className='dashpics' alt='' src={e} />
                </div>
            </div>
        )
console.log(this.props.trips)
        let mappedTrips = this.props.trips.map((e, i) => {
            return (
                <Link to='/trip' key={"trips" + i}>
                    <div style={{ "backgroundColor": e.trip_color }} className='travelpic column' >
                        <div >
                            <img src={e.trip_img} className='tripIcon' alt='trip pic' />
                        </div>
                        {e.trip_name}
                    </div>
                </Link>
            )
        })

        let mappedGear = this.props.gear.map((e, i) => {
            return (
                <Link to='/gear' key={"gear" + i} >
                    <div className='instapic' >
                        <img src={e.gear_img} className='dashpics' alt='pictures of WW products' />
                    </div>
                </Link>
            )
        })

        return (
            <div >
                <Nav />
                <div className='backgroundPhoto content' >
                    <h1 className='title'>Gear</h1>
                    <Slider {...settings}>
                        {mappedGear}
                    </Slider>

                    <h1 className='title'>Trips</h1>
                    <Slider {...settings}>
                        {mappedTrips}
                    </Slider>

                    <h1 className='title'>Photo Gallery</h1>
                    <Slider {...settings}>
                        {mappedphotos}
                    </Slider>
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

export default connect(mapStateToProps, { getTrips, getGear })(Dashboard);