import fixtures from './fixtures';

import React from 'react';
import { Button } from 'react-bootstrap';
import { ListingGrid } from './containers';
import { MainTopBar } from './components';
import { Map } from './components/index.jsx';

require('style-loader!css-loader!rc-slider/assets/index.css');
const Slider = require('rc-slider');

export default class ResultsPage extends React.Component {
  constructor(props) {
    super(props);

  }
  
  render() {
    return (
      <div className='results-page'>
        <MainTopBar />
        <div className='split-pane-horiz'>
          <div className='results-ctn'>
            <div className='search-settings-ctn'>
              <div className='setting-row'>
                <div className='setting-row-label'>Price Range</div>
                <div className='setting-row-cntrl'>
                  <Slider range allowCross={false} defaultValue={[0, 20]} onChange={v => console.log(v)} />
                </div>
              </div>
              <div className='setting-row'>
                <div className='setting-row-label'>Condition Range</div>
                <div className='setting-row-cntrl'>
                  <Slider range allowCross={false} defaultValue={[20, 80]} onChange={v => console.log(v)} />
                </div>
              </div>
              <div style={{}}>
                <div className='final-setting-row'>
                  <Button>Filters</Button>
                  <div className='result-count'>30+ Results · San Francisco</div>
                </div>
              </div>
            </div>
            <div className='search-results'>
              <ListingGrid 
                height='400px' 
                listData={fixtures.listData}
                columns={2} />
            </div>
          </div>
          <div
          className='map-ctn'>
            <Map listings={[]} currentLocation={{
              longitude: '-122.408949',
              latitude: '37.783591',
              locationGiven: true,
              zipcode: ''
            }} />
          </div>
        </div>
      </div>
    );
  }
}