import React from 'react';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      loggedIn: false,
      token: localStorage.token
    };
  }

  componentDidMount() {
    if (localStorage.token === undefined) {
      const url = window.location.href;
      const name = 'token'.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
      const results = regex.exec(url);
      if (results) {
        window.localStorage.token = results[2];
      }

      if (window.location.href !== 'http://localhost:3000/') {
        window.location.href = 'http://localhost:3000/';
      }
    }

    setTimeout(() => {
      if (localStorage.token === '') {
        localStorage.clear();
        window.location.href = 'http://localhost:3000/'; // <- logically may not need
      } else if (localStorage.token) {
        this.setState({
          loggedIn: true
        });
      }
    }, 200);
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
    if (this.state.loggedIn === true) {
      localStorage.token = '';
      this.setState({
        loggedIn: false
      });
    }
  }

  pleaseLogIn() {
    alert('please log in to continue');
  }

  render() {
    // if user is logged in
    let jsx;
    jsx = (
      <div>
          <div className="logStatus">
            { this.state.loggedIn ? 
              <a onClick={this.logOutButton.bind(this)} href="#">Log out</a>
              : <a href="http://localhost:3001/auth/facebook" target="facebook_login" >Log In</a> }
          </div>

          <div className="description">
            Envoyus <br/>
            Presents to you craigslist..<br/>
            that doesn't suck
          </div>

        <input
          type="text"
          placeholder="Search away"
          value={this.state.searchTerm}
          onChange={this.handleChange.bind(this)}
        />
        <span>
          <button className="btn hidden-sm-down btn-warning"
                  onClick={this.pleaseLogIn.bind(this)}>
                  search!
          </button>
        </span>
      </div>
    );
    return jsx;
  }
}
