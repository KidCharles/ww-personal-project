import React, { Component } from 'react';
import { connect} from 'react-redux';
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
            this.props.getTrips(res.data);
        })
    }

    render() {
        return (
            <div className='backgroundPhoto' >
                <Nav/>
                <h1>Gear</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        gear: state.gear
    }
}
export default connect(mapStateToProps, { getGear})(Gear);