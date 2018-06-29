import React, { Component } from 'react';
import routes from './routes';
import { getTrips, getGear } from './ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';

import './App.css';

class App extends Component {
  
  
  componentDidMount() {
    // axios.get('/api/insta').then(res => {
    //     this.setState({ insta: res.data })
    // })
    axios.get('/api/trips').then((res) => {
        this.props.getTrips(res.data);
    })
    axios.get('/api/gear').then((res) => {
        this.props.getGear(res.data);
    })
}

  render() {
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default connect(null, { getTrips, getGear })(App);
