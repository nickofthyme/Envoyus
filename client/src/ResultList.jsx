import React from 'react';
// import axios from 'axios';
import moment from 'moment';
// import ProgressBar from './progressbar.jsx';
var RelevantSpec = (props) => (
  <div>
    <div>
      cpu: ??
    </div>
    <div>
      screen size: ??
    </div>
    <div>
      Condition: ??
    </div>
  </div>
);



class List extends React.Component {
  constructor(props) {
    super(props)
  }
  goToLink() {
    window.location.href = "http://www.yahoo.com"
  }
  render () {
    return (
      <div className='col-md-6'>
        <div className='lead' onClick={this.goToLink}>
          {this.props.listing.title}
        </div>
        <div>
          Price: {this.props.listing.price}
        </div>
        <div>
          Posted Date: {moment(this.props.listing.updateDate).fromNow()}
        </div>
        <div>
          Condition:
        </div>
        <div>
          Relevant Specs:
          <div>
            <RelevantSpec />
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
    )
  }
}

var ResultList = (props) => (
  <div>
    <div>
      {props.listings.map((listing, index) => 
        <List listing={listing} key={index}/> 
      )}
    </div>
  </div>
);


export default ResultList;
