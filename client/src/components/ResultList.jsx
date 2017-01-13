import React from 'react';
// import axios from 'axios';
import moment from 'moment';
import { Panel } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';

const RelevantSpec = props => (
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
    super(props);
  }
  goToLink() {
    window.location.href = this.props.listing.postingUrl;
  }
  render() {
    return (


      <div className='col-md-6'>
      <Panel defaultExpanded header={this.props.listing.title} bsStyle="success" onClick={this.goToLink.bind(this)} classList="results">
    <ListGroup fill>
      <ListGroupItem>Price: {this.props.listing.price}</ListGroupItem>
      <ListGroupItem>Posted Date: {moment(this.props.listing.updateDate).fromNow()}</ListGroupItem>
      <ListGroupItem>Item 3</ListGroupItem>
      <ListGroupItem>Item 4</ListGroupItem>
      <ListGroupItem>Item 5</ListGroupItem>
      <ListGroupItem>&hellip;</ListGroupItem>
    </ListGroup>
    can put text here
  </Panel>
  </div>


    );
  }
}

const ResultList = props => (
  <div>
    <div>
      {props.listings.map((listing, index) =>
        <List listing={listing} key={index}/>,
      )}
    </div>
  </div>
);


export default ResultList;


      // <div className='col-md-6'>
      //   <div className='lead' onClick={this.goToLink.bind(this)}>

      //   </div>
      //   <div>
      //     Price: {this.props.listing.price}
      //   </div>
      //   <div>
      //     Posted Date: {moment(this.props.listing.updateDate).fromNow()}
      //   </div>
      //   <div>
      //     Condition:
      //   </div>
      //   <div>
      //     Relevant Specs:
      //     <div>
      //       <RelevantSpec />
      //     </div>
      //   </div>
      //   <br></br>
      //   <br></br>
      //   <br></br>
      // </div>
