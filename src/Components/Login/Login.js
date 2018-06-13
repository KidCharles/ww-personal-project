import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import axios from 'axios';
import logo from '../Assets/ww_logo_white.svg';
import './Login.css';
// import ''

//import { addUser } from '../ducks/reducer';
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            error: '',
            loggedIn: ''
        }
    }

    handleUsernameChange(val) {
        this.setState({ username: val })
    }

    handlePasswordChange(val) {
        this.setState({ password: val })
    }

    handleAuthClick() {

    }

    login() { }

    register() { }

    render() {
        return (
            <div>
            <div className='background'>
                 {/* <a href="/Users/charleshatch/devMtn/wayfaring-world/src/Components/Assets/login_background.svg" cls ></a> */}
                <img src={logo} className='logo' alt='Wayfaring World logo' />
                <div >
                    <Link to='/dash' >
                        <button>Enter</button>
                    </Link>
                </div>
                <div>
                    <br/>
                    <br/>
                    <input type='text' className='' onChange={(e) => this.handleUsernameChange(e.target.value)} />
                    <input type='text' className='' onChange={(e) => this.handlePasswordChange(e.target.value)} />
                    <br/>
                    <br/>
                    <button type='' className='' onClick={() => this.handleAuthClick()} >Login/Register</button>
                </div>


            </div>
           
            </div>
        )
    }
}



// export default connect(null, { addUser })(Auth);