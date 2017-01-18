import React from 'react';
import axios from 'axios';
import { HCenter, LabeledInput, ListingGrid, LabeledDropdown } from './containers';
import { Button } from 'react-bootstrap';
import Relay from 'react-relay';

// RecommendGrid = Relay.createContainer(ListingGrid, {
//   fragments: {
//     store: () => Relay.QL`
//       fragment on Query {
//         craigslist(query: "i5 macbook", from: 20, size: 8) { 
//           results {
//             title
//             price
//             cityName
//             imageUrls
//           } 
//         }
//       }
//     `
//   }
// })

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.store);
    return (
      <div className='splash-ctn'>
        <div className='splash-panel'>
          <header className='splash-nav'>
            <div className='nav-links-ctn'>
              About
            </div>
            <div className='nav-links-ctn'>
              Sign Up
            </div>
            <div className='nav-links-ctn'>
              Login
            </div>
          </header>
          <HCenter className='splash-image-ctn'>
            <div className='splash-content-ctn'>
              <div className='splash-intro-text'>
                <span style={{fontSize: 48, fontWeight: 800, color: '#555'}}>Envoyus</span>
                <br />
                <br />
                <span style={{fontSize: 42, fontWeight: 600, color: '#555'}}>
                  Your new product search.
                </span>
                <br />
                <span style={{fontSize: 18, color: '#555'}}>
                  Thousands of curated listings, with one click
                </span>
              </div>
              <div className='splash-search-ctn'>
                <div style={{
                  width: '65%',
                  borderRight: '1px solid #ccc',
                  padding: '15px 15px 0 15px',
                  height: '100%',
                }}>
                  <LabeledInput 
                    label='Search' 
                    placeholder='Nintendo DS' 
                    width='100%'
                    activeClass='input-ctn-active-style' />
                </div>
                <div style={{
                  width: '14%',
                  padding: '15px 0 0 15px',
                  height: '100%',
                }}>
                  <LabeledDropdown
                    label='City'
                    width='100%'
                    activeClass='input-ctn-active-style' />
                </div>
                <div style={{
                  width: '20%',
                  padding: '15px 0 0 15px',
                  height: '100%',
                }}>
                  <Button bsSize='lg' bsClass='btn search-btn'>Search</Button>
                </div>
              </div>
            </div>
          </HCenter>
        </div>
        
        <HCenter>
          <div className='splash-recommend'>
            <p className='subheader'>Recommended</p>
            <ListingGrid 
              height='360px' 
              store={[
                {
                  "title": "Apple MacBook Air 11.6\" 11  i5  1.6Ghz 4GB 128GB AppleCare",
                  "price": "750",
                  "cityName": "los altos",
                  "imageUrls": [
                    "https://images.craigslist.org/00l0l_dZkW9tcn1af_600x450.jpg",
                    "https://images.craigslist.org/00s0s_7OYZSLh9Uxf_600x450.jpg",
                    "https://images.craigslist.org/00909_kxgrKusHVvY_600x450.jpg",
                    "https://images.craigslist.org/00Q0Q_9PrdRg7eMZY_600x450.jpg",
                    "https://images.craigslist.org/00707_iscddNdTefa_600x450.jpg",
                    "https://images.craigslist.org/00f0f_bBJgsAs1ky6_600x450.jpg",
                    "https://images.craigslist.org/00Z0Z_D9Mmt0wEOP_600x450.jpg"
                  ]
                },
              ]}
              columns={4} />
          </div>
        </HCenter>
      </div>
    );
  }
}

App = Relay.createContainer(App, {
  fragments: {
    store: () => Relay.QL`
      fragment on Query {
        craigslist(query: "i5 macbook", from: 20, size: 8) { 
          results {
            title
            price
            cityName
            imageUrls
          } 
        }
      }
    `
  }
})

export default App;