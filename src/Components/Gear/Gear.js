import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { getGear } from '../../ducks/reducer';
import Nav from '../Nav/Nav';
import '../Dashboard/Dashboard.css';



class Gear extends Component {

    addToCart() {
        //
    }

    componentDidMount() {
        axios.get('/api/gear').then((res) => {
            this.props.getGear(res.data);
        })
    }

    render() {
        let mappedGear = this.props.gear.map((e, i) => {
            return (
                <div key={e.gear_id} className='' >
                    <img src={e.gear_img} className='' alt='Wayfaring World Product' />
                    <h1>{e.gear_name}</h1>
                </div>
            )
        })
        return (
            <div>
                <Nav />
                <div className='backgroundPhoto' >
                {/* row wrap */}
                    {mappedGear}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        gear: state.gear
    }
}
export default connect(mapStateToProps, { getGear })(Gear);