import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { getGear } from '../../ducks/reducer';
import Nav from '../Nav/Nav';
import '../Dashboard/Dashboard.css';
import './Gear.css';
import add_cart from '../Assets/add_cart_black.svg'



class Gear extends Component {
    constructor() {
        super()
        this.state = {
            toggle: true
        }
    }
    componentDidMount() {
        axios.get('/api/gear').then((res) => {
            this.props.getGear(res.data);
        })
    }

    handleToggle() {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    addToCartGear(id) {
        axios.post(`/api/addToCartGear/${id}`).then(alert('added to your cart'))
    }


    render() {
        console.log(this.state)
        let mappedGear = this.props.gear.map((e, i) => {
            return (
                <div key={e.gear_id} className='gearPicParent' >
                    <div style={{ background: `url('${e.gear_img}')`, width: '200px', height: '200px', backgroundSize: 'cover' }} className='gearpic'  >
                    
                                <img src={add_cart} className='add_cart' onClick={() => this.addToCartGear(e.gear_id)} />
                    
                        <h2 className="bottom-right">${e.gear_price}</h2>
                    </div>
                    <p>{e.gear_name}</p>
                </div>
            )
        })
        return (
            <div>
                <Nav />
                <div className='backgroundPhoto gearPhoto'  >
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