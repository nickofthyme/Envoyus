import React from 'react';
// import axios from 'axios';
// import moment from 'moment';
// import ProgressBar from './progressbar.jsx';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      loggedIn: false,
      token: localStorage.token
    };
  }


  componentDidMount() {
    console.log('workingggggg');

    if (localStorage.token === undefined) {
      const url = window.location.href;
      const name = 'token'.replace(/[\[\]]/g, '\\$&');
      let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    // var url = 'http://localhost:3000/'
      if (results) {
        console.log(results[2]);
        window.localStorage.token = results[2];
      }

      if (window.location.href !== 'http://localhost:3000/') {
        window.location.href = 'http://localhost:3000/';
      }

    // if( !localStorage ) {
    //   this.setState({ loggedIn: false })
    // }
    }

    setTimeout(() => {
      console.log(localStorage.token);

      if (localStorage.token === '') {
        localStorage.clear();
        window.location.href = 'http://localhost:3000/'; // <- logically may not need
      // this.setState({
      //   loggedIn: false
      // })
      } else if (localStorage.token) {
        this.setState({
          loggedIn: true
        });
      }
    }, 200);


    // this.setState({
    //   token: localStorage.token
    // });
  }

  handleChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }
  handleClick() {
    this.props.handleSearch(this.state.searchTerm);
    this.setState({
      searchTerm: ''
    });
  }

  logOutButton() {
    console.log('outside if');
    if (this.state.loggedIn === true) {
      // localStorage.clear();
      localStorage.token = '';
      // console.log('before')
      // window.location.href = '/'
      // console.log('after')
      this.setState({
        loggedIn: false
      });
    }
  }

  pleaseLogIn() {
    alert('please log in to continue');
  }


  // var url = window.location.href;
  //   var name = 'token'.replace(/[\[\]]/g, "\\$&");
  //   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url)
  //   if (results) {
  //     console.log(results[2]);
  //     window.localStorage.token = results[2];
  //   }
  //   this.getMyLocation();

  render() {
    // if user is logged in
    if (this.state.loggedIn === false) {
      return (
        <div>
           <div className="logStatus">
              <a href="http://localhost:3001/auth/facebook" target="facebook_login" >
                Log In
              </a>
            </div>

            <div className="description">
             Envoyus <br/>
             Presents to you craigslist..<br/>
             that doesn't suck
            </div>

          <input
            placeholder="Search away"
            // className="form-control"
            // type="text"
            // placeholder="Enter Item "
            // value={this.state.searchTerm}
            // onChange={this.handleChange.bind(this)}
          />
          <span>
            <button className="btn hidden-sm-down btn-warning"
                    onClick={this.pleaseLogIn.bind(this)}>
                    search!
            </button>
          </span>
        </div>
      );
    }

    // if user is logged in
    if (this.state.loggedIn) {
      return (
        <div>
           <div className="logStatus">
              <a onClick={this.logOutButton.bind(this)} href="#">
                Log out
              </a>
            </div>

            <div className="description">
             Envoyus <br/>
             Presents to you craigslist..<br/>
             that doesn't suck
            </div>

          <input
            // className="form-control"
            type="text"
            placeholder="Search away"
            value={this.state.searchTerm}
            onChange={this.handleChange.bind(this)}
          />
          <span>
            <button className="btn hidden-sm-down btn-success"
                    onClick={this.handleClick.bind(this)}>
                    search!
            </button>
          </span>
        </div>
      );
    }
  }
}

export default SearchBar;
