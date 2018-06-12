import React, { Component } from 'react';
import Nav from '../Nav/Nav';

export default class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }
    render() {
        return (
            <div>
                <Nav />
                <h1>Blog</h1>
            </div>
        )
    }
}