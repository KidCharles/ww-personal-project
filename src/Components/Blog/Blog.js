import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import '../Dashboard/Dashboard.css';

export default class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }
    render() {
        return (
            <div className='backgroundPhoto' >
                <Nav />
                <h1>Blog</h1>
            </div>
        )
    }
}