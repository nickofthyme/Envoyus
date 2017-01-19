import React from 'react';
import { LabeledInput } from '../containers';

export const MainTopBar = props => (
  <div className='main-top-bar'>
    <div className='top-bar-logo'>
      <i className="fa fa-grav"></i>
    </div>
    <div className='top-bar-search-ctn'>
      <LabeledInput 
        placeholder='Macbook Pro' 
        width='100%'
        activeClass='input-ctn-active-style' />
    </div>
    <div className='top-bar-nav-ctn'>
      <div className='nav-links2-ctn'>
        About
      </div>
      <div className='nav-links2-ctn'>
        Sign Up
      </div>
      <div className='nav-links2-ctn'>
        Login
      </div>
    </div>
  </div>
);
