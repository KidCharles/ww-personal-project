//import react and switch and route
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from "axios";

//import components to be routed
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Gear from './Components/Gear/Gear';
import Trips from './Components/Trips/Trips';
import AdminTrip from './Components/Trips/AdminTrip';
import Blog from './Components/Blog/Blog';
import About from './Components/About/About';
import Gear_admin from './Components/Gear/Gear_admin';
import Cart from './Components/Cart/Cart';
import Checkout from './Components/Checkout/Checkout';

// create a private route-----------
//class Private
class PrivateRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: null
		};
	}

	componentDidMount() {
		axios.get("/auth/user").then(response => {
			this.setState({
				authenticated: response
			});
		})
			.catch(err => {
				this.setState({ authenticated: false })

			});
	}

	render() {
		const { component: Component, ...rest } = this.props
		return this.state.authenticated === null ? (
			<div>Loading...</div>
		) : this.state.authenticated === false ? (
			<Redirect to="/" />

		) : (
					<Component {...this.props} />
				);
	}
}



// create a private route-----------

//this is setting up our routes, need EXACT on the 'home'
export default (
	<Switch>
		<Route exact path='/' component={Login} />
		<Route path='/dash' component={Dashboard} />
		<Route path='/gear' component={Gear} />
		<Route path='/trip' component={Trips} />
		<Route path='/cart' component={Cart} />
		<Route path='/checkout' component={Checkout} />
		<Route path='/blog' component={Blog} />
		<Route path='/about' component={About} />
		<PrivateRoute component={Gear_admin} path="/gearadmin" />
		<PrivateRoute component={AdminTrip} path="/admin" />
	</Switch>
)