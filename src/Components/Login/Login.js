import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import axios from 'axios';
import logo from '../Assets/ww_logo_white.svg';
import './Login.css';

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
                <img src={logo} className='logo' alt='Wayfaring World logo' />
                <div>
                    <Link to='/dash' >
                        <button>Enter</button>
                    </Link>
                </div>
                <div>
                    <button type='' className='' onClick={() => this.handleAuthClick()} >Login/Register</button>
                    <input type='text' className='' onChange={(e) => this.handleUsernameChange(e.target.value)} />
                    <input type='text' className='' onChange={(e) => this.handlePasswordChange(e.target.value)} />
                </div>


            </div>
        )
    }
}



// export default connect(null, { addUser })(Auth);