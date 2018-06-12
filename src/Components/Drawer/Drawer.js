import React from 'react';
import './Drawer.css';

export default (props) => {
  return (
    <div className={props.drawerToggle ? 'drawer' : 'drawer hidden'}>
      <section className='drawerContent'>
        <div>Home</div>
        <div>Products</div>
        <div>Blog</div>
        <div>About</div>
        <div>Contact US</div>
      </section>
    </div>
  )
};
