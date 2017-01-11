import React from 'react';
// import axios from 'axios';
// import moment from 'moment';
// import ProgressBar from './progressbar.jsx';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
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

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter Item "
          value={this.state.searchTerm}
          onChange={this.handleChange.bind(this)}
        />
        <span>
          <button className="btn hidden-sm-down"
                  onClick={this.handleClick.bind(this)}>
                  search!
          </button>
        </span>
      </div>
    );
  }
}

export default SearchBar;
