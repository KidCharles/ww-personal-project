import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/ww_logo_white.svg';
import background from '../Assets/login_background.svg';
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className='login'  >
                <img src={background} className='background' alt='textured' />
                <img src={logo} className='logo' alt='Wayfaring World logo' />
                <div className='loginInputs column' >
                    <Link to='/dash' >
                        <button>Enter</button>
                    </Link>
                    <a href={process.env.REACT_APP_LOGIN}>
                        <button>Login</button>
                    </a>
                    {/* <input type='text' className='' onChange={(e) => this.handleUsernameChange(e.target.value)} />
                    <input type='text' className='' onChange={(e) => this.handlePasswordChange(e.target.value)} /> */}
                    {/* <button onClick={() => this.handleAuthClick()} >Login/Register</button> */}
                </div>
            </div>
        )
    }
}



// export default connect(null, { addUser })(Auth);