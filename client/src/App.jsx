import React from 'react';
import axios from 'axios';
import { HCenter, LabeledInput, ListingGrid } from './containers';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='splash-ctn'>
        <div className='splash-panel'>
          <header className='splash-nav'>
            <div className='nav-links-ctn'>
              About
            </div>
            <div className='nav-links-ctn'>
              Sign Up
            </div>
            <div className='nav-links-ctn'>
              Login
            </div>
          </header>
          <HCenter className='splash-image-ctn'>
            <div className='splash-content-ctn'>
              <div className='splash-intro-text'>
                <span style={{fontSize: 48, fontWeight: 800, color: '#555'}}>Envoyus</span>
                <br />
                <br />
                <span style={{fontSize: 42, fontWeight: 600, color: '#555'}}>
                  Your new product search.
                </span>
                <br />
                <span style={{fontSize: 18, color: '#555'}}>
                  Thousands of curated listings, with one click
                </span>
              </div>
              <div className='splash-search-ctn'>
                <div style={{
                  width: '65%',
                  borderRight: '1px solid #ccc',
                  padding: '15px 15px 0 15px',
                  height: '100%',
                }}>
                  <LabeledInput 
                    label='Search' 
                    placeholder='Nintendo DS' 
                    width='100%'
                    activeStyle={{
                      borderBottom: '2px solid #ade8d4'
                    }} />
                </div>
              </div>
            </div>
          </HCenter>
        </div>
        
        <HCenter>
          <div className='splash-recommend'>
            <p className='subheader'>Recommended</p>
            <ListingGrid 
              height='360px' 
              listData={[1,2,3,4,5,6,7,8,9,10]}
              columns={4} />
          </div>
        </HCenter>
      </div>
    );
  }
}