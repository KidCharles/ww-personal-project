import React from 'react';
import Nav from '../Nav/Nav';
import About_page from '../Assets/about_page.svg';

export default function About() {
    return (
        <div>
            <Nav />
            <img src={About_page} className='background' alt='' />
        </div>
    )
}