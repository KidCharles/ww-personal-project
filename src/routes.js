//import react and switch and route
import React from 'react';
import { Switch, Route } from 'react-router-dom';

//import components to be routed
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Gear from './Components/Gear/Gear';
import Trips from './Components/Trips/Trips';
import AdminTrip from './Components/Trips/AdminTrip';
// import Cart from './Components/Cart/Cart';
import Blog from './Components/Blog/Blog';
import About from './Components/About/About';
import Gear_admin from './Components/Gear/Gear_admin';

//this is setting up our routes, need EXACT on the 'home'
export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/dash' component={Dashboard} />
        <Route path='/gear' component={Gear} />
        <Route path='/trip' component={Trips} />
        <Route path='/admin' component={AdminTrip} />
        <Route path='/gearadmin' component={Gear_admin} />
        {/* <Route path='/cart' component={Cart} /> */}
        <Route path='/blog' component={Blog} />
        <Route path='/about' component={About} />
    </Switch>
)