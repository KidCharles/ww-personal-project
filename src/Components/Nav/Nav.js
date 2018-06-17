import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import logo from '../Assets/wworld_logo_white.svg';
import './Nav.css'
import Drawer from '../Drawer/Drawer'
//import the action creators


export default class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drawerToggle: false,
            //isadmin:false
        }
        this.handleHam = this.handleHam.bind(this)
    }

    //comp did mount, check in user is admin, // same enpoint, render new buttons
    //this will come back and change admin to true/false

    handleHam() {
        this.setState({ drawerToggle: !this.state.drawerToggle })
    }


    
    render() {

        // checkIsAdmin(){
        //     //ifisadmin=true{
            // return {two buttons}
        // }: return ()
        // }
        
        //:return( everything plus two new buttons)
        return (
            <div>
                <div>

                    <nav className='header row' >

                        <div className='ham' onClick={this.handleHam}>
                            <div className={this.state.drawerToggle ? 'bar bar1' : 'bar'}></div>
                            <div className={this.state.drawerToggle ? 'bar bar2' : 'bar'}></div>
                            <div className={this.state.drawerToggle ? 'bar bar3' : 'bar'}></div>
                        </div>
                                   
                        <div className='header row'>
                            <Link to='/dash' >
                                <img src={logo} className='navlogo' alt='Wayfaring man logo' />
                            </Link>
                        </div>


                        <div className='menuList' >
                            <section className='row'>
                                <Link to='/trip' >
                                    <div className='menuItem'>Trips</div>
                                </Link>
                                <Link to='/gear' >
                                    <div className='menuItem'>Gear</div>
                                </Link>
                                <Link to='/blog' >
                                    <div className='menuItem'>Blog</div>
                                </Link>
                                <Link to='/about' >
                                    <div className='menuItem'>About</div>
                                </Link>
                                <Link to='/about' >
                                    <div className='menuItem'>Contact US</div>
                                </Link>
                                <Link to='/' >
                                    <div className='menuItem'>Login/Register</div>
                                </Link>
                                    {/* {checkisAdmin()} */}
                            </section>
                        </div>

                    </nav>
                    <Drawer
                        drawerToggle={this.state.drawerToggle}
                    />
                </div>
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//     }
// }

// export default connect(mapStateToProps)(Nav)