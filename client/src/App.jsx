import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar.jsx';
import testData from './testData.js';
import ResultList from './ResultList.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      resultList: []
      location: {
        longitude: ''
        latitude: ''
      }
    }
  }
  handleSearch(searchTerm) {
    console.log(searchTerm);
    var listings = testData.map(listing=>listing._source)
    this.setState({
      resultList: listings
    })
  }
  /*
  getMyLocation() {
    var output = document.getElementById("out");

    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }

    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

      var img = new Image();
      img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

      output.appendChild(img);
    }

    function error() {
      output.innerHTML = "Unable to retrieve your location";
    }

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
  }
*/
  render() {
    return (
      <div>
        <div className='container'>
          <div className='col-md-12'>
            <h1 className='text-center'>Envoyus</h1>
          </div>
        </div>
        <div className='container'>
          <div className='text-center'>
            <SearchBar handleSearch={this.handleSearch.bind(this)}/>
          </div>
          <div>
            <ResultList listings={this.state.resultList}/>
          </div>
        );
    }
}

export default App;
