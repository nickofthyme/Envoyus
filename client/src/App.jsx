import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar.jsx';
import testData from './testData.js';
import ResultList from './ResultList.jsx'

class App extends React.Component { 
  constructor(props) {
    super(props)
    var listings = testData.map(listing=>listing._source)
    console.log(listings)
    this.state = {
      searchTerm: '',
      resultList: listings
    }
  }
  handleSearch(searchTerm) {
    console.log(searchTerm)
  }

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
            <SearchBar handleSearch={this.handleSearch}/>
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