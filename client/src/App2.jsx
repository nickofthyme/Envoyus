import React from 'react';
import axios from 'axios';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { ResultList, SearchBar, Map } from './components/index.jsx';

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
    axios.post('/graphql',
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
      const listings = response.data.data.craigslist.results;
      this.setState({
        resultList: listings
      });
    });
  }

  getMyLocation() {
    const self = this;
    if (!navigator.geolocation) {
      return;
    }
    function success(position) {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      self.setState({
        loading: '',
        location: {
          longitude,
          latitude,
          locationGiven: true
        }
      });
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
    }
    this.setState({ loading: '' });
    navigator.geolocation.getCurrentPosition(success, error);
  }


  render() {
    return (
      <div>

      <Navbar collapseOnSelect >
        <Navbar.Header>
          <Navbar.Brand>
            <span><div className='logosmall' /></span>
            <span><a className="logo logocolor" href="#" >Envoyus</a></span>
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
