import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar.jsx';
import testData from './testData.js';
import ResultList from './ResultList.jsx';
import Map from './Map.jsx'

class App extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      resultList: [],
      loading: '',
      location: {
        longitude: '',
        latitude: '',
        locationGiven: true,
        zipcode: ''
      }
    }
  }
  componentDidMount() {
    this.getMyLocation();
  }
  handleSearch(searchTerm) {
    console.log(searchTerm);
    console.log(this.state.location);
    var listings = testData.map(listing=>listing._source)
    this.setState({
      resultList: listings
    })
    console.log(this.state.resultList)
  }
  
  getMyLocation() {
    var self = this
    if (!navigator.geolocation){
      console.log('please enter ')
      return;
    }
    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      self.setState({
        loading: '',
        location: {
          longitude: longitude,
          latitude: latitude,
          locationGiven: true
        }
      })
      console.log(latitude, longitude)
    }
    function error() {
      self.setState({
        loading: '',
        location: {
          longitude: '',
          latitude: '',
          locationGiven: false
        }
      })
      console.log('asking user for input')
    }
    this.setState({loading: 'getting your location'})
    navigator.geolocation.getCurrentPosition(success, error);
  }
  render() {
    return (
      <div>
        <div className='container col-md-12'>
          <h1 className='text-center'>Envoyus</h1>
        </div>
        <div className='container'>
          <div className='text-center'>
            <SearchBar handleSearch={this.handleSearch.bind(this)}/>
          </div>
          <div>
            {this.state.loading}
          </div>
          <div>
            <Map listings={this.state.resultList}/>
          </div>
          <div>
            <ResultList listings={this.state.resultList}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;