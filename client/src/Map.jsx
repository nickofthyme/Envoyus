import Helmet from 'react-helmet';
import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { GoogleMapLoader, GoogleMap, Marker, withGoogleMap } from 'react-google-maps';


const ShowMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
  >
    {props.markers.map((marker, index) => (
      <Marker key={index}
        {...marker}
      />
    ))}
  </GoogleMap>
));

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  getMarkers() {
    const coordinates = this.props.listings.map((listing) => {
      const marker = {
        position: {
          lat: Number(listing.lat),
          lng: Number(listing.long),
        },
        defaultAnimation: 2,
      };
      return marker;
    });
    return coordinates;
  }

  render() {
    const markers = this.getMarkers();
    console.log(markers);
    return (
      <div style={{ height: '100%' }}>
        <Helmet
          title="Getting Started"
        />
        <ShowMap
          containerElement={
            <div style={{ width: 500, height: 500 }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          onMapLoad={this.handleMapLoad.bind(this)}
          markers={markers}
        />
      </div>
    );
  }
}

export default Map;
