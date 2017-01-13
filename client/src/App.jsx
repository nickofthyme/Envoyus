import React from 'react';
import ReactDOM from 'react-dom';
import testData from '../testData.js';
import SearchBar from './components/SearchBar.jsx';
import ResultList from './components/ResultList.jsx';
// import LoggedInStatus from './components/LogIn.jsx';
import Map from './components/Map.jsx';
import axios from 'axios';

// React
// import * as boot from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';


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
        zipcode: ''
      }
    };
  }

  componentDidMount() {
    this.getMyLocation();
  }


  handleSearch(searchTerm) {
    console.log(searchTerm);
    console.log(this.state.location);
    axios.post('http://localhost:3000/graphql',
      `{
        craigslist(query:"${searchTerm}", size: 10) {
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
      { headers: { 'Content-Type': 'application/graphql' }
      })
    .then((response) => {
      console.log(response);
      const listings = response.data.data.craigslist.results;
      console.log(listings, ' this is listings');
      this.setState({
        resultList: listings
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
          locationGiven: true
        }
      });
      console.log(latitude, longitude);
    }
    function error() {
      self.setState({
        loading: '',
        location: {
          longitude: '',
          latitude: '',
          locationGiven: false
        }
      });
      console.log('asking user for input');
    }
    this.setState({ loading: '' });
    navigator.geolocation.getCurrentPosition(success, error);
  }


  render() {
    return (
      <div>

      <Navbar inverse collapseOnSelect >
        <Navbar.Header>
          <Navbar.Brand>
            <a className="logo" href="#" ><span id="logocolor">Envoyus</span></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
            <NavItem eventKey={2} href="#">Link Right</NavItem>
        </Nav>
       </Navbar.Collapse>
     </Navbar>


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

      <div className="footer">
        <span>Posted by: Hege Refsnes</span>
        <span>Contact information: <a href="mailto:someone@example.com">
        someone@example.com</a>.</span>
      </div>

      </div>
    );
  }
  }


export default App;
