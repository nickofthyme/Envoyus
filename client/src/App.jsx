import React from 'react';
import ReactDOM from 'react-dom';
import testData from '../testData.js';
import SearchBar from './components/SearchBar.jsx';
import ResultList from './components/ResultList.jsx';
// import LoggedInStatus from './components/LogIn.jsx';
import Map from './components/Map.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      resultList: [],
      loading: '',

      logedInStatus: false,

      location: {
        longitude: '',
        latitude: '',
        locationGiven: true,
        zipcode: '',
      },
    };
  }
  componentDidMount() {
    // var url = window.location.href;
    // var name = 'token'.replace(/[\[\]]/g, "\\$&");
    // var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url)
    // if (results) {
    //   console.log(results[2]);
    //   window.localStorage.token = results[2];
    // }


    this.getMyLocation();
  }
  handleSearch(searchTerm) {
    console.log(searchTerm);
    console.log(this.state.location);
    axios.post('http://localhost:3000/graphql',
      `{
        listings(query:"${searchTerm}", size: 10) {
          results {
            title
            price
            lat
            long
            description
            postingUrl
            updateDate
          }
        }
      }`,
      { headers: { 'Content-Type': 'application/graphql' },
      })
    .then((response) => {
      console.log(response);
      const listings = response.data.data.listings.results;
      console.log(listings, ' this is listings');
      this.setState({
        resultList: listings,
      });
    });
  }

  getMyLocation() {
    const self = this;
    if (!navigator.geolocation) {
      console.log('please enter ');
      return;
    }
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      self.setState({
        loading: '',
        location: {
          longitude,
          latitude,
          locationGiven: true,
        },
      });
      console.log(latitude, longitude);
    }
    function error() {
      self.setState({
        loading: '',
        location: {
          longitude: '',
          latitude: '',
          locationGiven: false,
        },
      });
      console.log('asking user for input');
    }
    this.setState({ loading: 'getting your location' });
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
            <Map listings={this.state.resultList} currentLocation={this.state.location} />
          </div>
          <div>
            <ResultList listings={this.state.resultList}/>
          </div>
        </div>
      </div>
    );
  }
  }

export default App;
