import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import axios from 'axios';
import logo from '../Assets/ww_logo_white.svg';
import background from '../Assets/login_background.svg';
import './Login.css';
import axios from 'axios';
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

    login() {
        const { username, password } = this.state
        if (username && password) {
            axios.post('/api/login', { username: username.toLowerCase(), password: password }).then(res => {

            })
        }
    }

    register() { }

    render() {
        return (
            <div className='login'  >
                <img src={background} className='background' alt='textured' />
                <img src={logo} className='logo' alt='Wayfaring World logo' />
                <div className='loginInputs column' >
                    <Link to='/dash' >
                        <button>Enter</button>
                    </Link>
                    <input type='text' className='' onChange={(e) => this.handleUsernameChange(e.target.value)} />
                    <input type='text' className='' onChange={(e) => this.handlePasswordChange(e.target.value)} />
                    
                    <a href={process.env.REACT_APP_LOGIN}>
                        <button>Login</button>
                    </a>

                    <button onClick={() => this.handleAuthClick()} >Login/Register</button>

                </div>
            </div>
        )
    }
}



// export default connect(null, { addUser })(Auth);