import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar.jsx';

class App extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      resultList: []
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
        <div className='container-fluid'>
          <div>
            <SearchBar handleSearch={this.handleSearch}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;