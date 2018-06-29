import React from 'react';
import './Drawer.css';
import { Link } from 'react-router-dom';


export default (props) => {
  return (
    <div className={props.drawerToggle ? 'drawer' : 'drawer hidden'}>
      <section className='drawerContent'>
        <Link to='/trip' >
          <div className='menuItem'>Trips</div>
        </Link>

        <Link to='/gear' >
          <div className='menuItem'>Gear</div>
        </Link>

        <Link to='/' >
          <div className='menuItem'>Login</div>
        </Link>

        <Link to='/account' >
          <div className='menuItem'>MY ACCOUNT</div>
        </Link>
      </section>
    </div>
  )
};
