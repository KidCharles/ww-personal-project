import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/ww_logo_white.svg';
import background from '../Assets/login_background.svg';
import video from '../Assets/ww_video.mp4';
import './Login.css';
import loginbutton from '../Assets/login_button.svg';
import enter_button from '../Assets/enter_button.svg';
import logo_outline from '../Assets/logo_outline.js';
// import logo_outline from '../Assets/logo_outline.svg';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className='login'  >
                <div>
                    <video className="video" autoPlay="true" loop='true' >
                        <source src={video} type="video/mp4" />
                    </video>
                </div>
                <img src={background} className='background' alt='textured' />
                {/* <img src={logo} className='logo' alt='Wayfaring World logo' /> */}
                {/* <img src={logo_outline} className='logo' alt='Wayfaring World logo' /> */}
                {logo_outline}
                <div className='loginInputs column' >
                    <Link to='/dash' >
                        <div class="svg-wrapper">
                            <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                                <rect class="shape" height="60" width="320" />
                            </svg>
                            <div class="text">ENTER</div>
                        </div>
                    </Link>

                    <div className='loginButton' >
                    <a href={process.env.REACT_APP_LOGIN}>
                        {/* <img src={loginbutton} className='loginButton' /> */}
                        <div class="text ">LOGIN</div>
                    </a>
                    </div>

                    {/* <input type='text' className='' onChange={(e) => this.handleUsernameChange(e.target.value)} />
                    <input type='text' className='' onChange={(e) => this.handlePasswordChange(e.target.value)} /> */}
                    {/* <button onClick={() => this.handleAuthClick()} >Login/Register</button> */}
                </div>
            </div>
        )
    }
}



// export default connect(null, { addUser })(Auth);