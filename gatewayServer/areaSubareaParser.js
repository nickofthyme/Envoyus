let fs = require('fs');
let _ = require('lodash');
let rawdata = require('./areasAndSubareas.json');
let axios = require('axios');
let config = require('../config/config.privatekeys').googleMaps;

// To convert this...
// {"area": "phx", "areaDescription": "phoenix, AZ", "subarea": null, "subareaDescription": null},
// {"area": "phx", "areaDescription": "phoenix, AZ", "subarea": "cph", "subareaDescription": "central/south phx"},
// {"area": "phx", "areaDescription": "phoenix, AZ", "subarea": "evl", "subareaDescription": "east valley"},
// {"area": "phx", "areaDescription": "phoenix, AZ", "subarea": "nph", "subareaDescription": "phx north"},
// {"area": "phx", "areaDescription": "phoenix, AZ", "subarea": "wvl", "subareaDescription": "west valley"},

// To this...
// {"area": "phx", "areaDescription": "phoenix, AZ",
//   "subareas": [
//     {
//       "subarea": "cph",
//       "subareaDescription": "central/south phx"
//     },
//     {
//       "subarea": "evl",
//       "subareaDescription": "east valley"
//     },
//     {
//       "subarea": "nph",
//       "subareaDescription": "phx north"
//     },
//     {
//       "subarea": "wvl",
//       "subareaDescription": "west valley"
//     }
//   ]
// }


// let testResults = {
//   "results": [
//     {
//       "address_components": [
//         {
//           "long_name": "South Mountain Park",
//           "short_name": "South Mountain Park",
//           "types": [
//             "establishment",
//             "food",
//             "park",
//             "point_of_interest",
//             "restaurant"
//           ]
//         },
//         {
//           "long_name": "10919",
//           "short_name": "10919",
//           "types": [
//             "street_number"
//           ]
//         },
//         {
//           "long_name": "South Central Avenue",
//           "short_name": "S Central Ave",
//           "types": [
//             "route"
//           ]
//         },
//         {
//           "long_name": "South Mountain Village",
//           "short_name": "South Mountain Village",
//           "types": [
//             "neighborhood",
//             "political"
//           ]
//         },
//         {
//           "long_name": "Phoenix",
//           "short_name": "Phoenix",
//           "types": [
//             "locality",
//             "political"
//           ]
//         },
//         {
//           "long_name": "Maricopa County",
//           "short_name": "Maricopa County",
//           "types": [
//             "administrative_area_level_2",
//             "political"
//           ]
//         },
//         {
//           "long_name": "Arizona",
//           "short_name": "AZ",
//           "types": [
//             "administrative_area_level_1",
//             "political"
//           ]
//         },
//         {
//           "long_name": "United States",
//           "short_name": "US",
//           "types": [
//             "country",
//             "political"
//           ]
//         },
//         {
//           "long_name": "85042",
//           "short_name": "85042",
//           "types": [
//             "postal_code"
//           ]
//         }
//       ],
//       "formatted_address": "South Mountain Park, 10919 S Central Ave, Phoenix, AZ 85042, USA",
//       "geometry": {
//         "location": {
//           "lat": 33.34697,
//           "lng": -112.0846007
//         },
//         "location_type": "APPROXIMATE",
//         "viewport": {
//           "northeast": {
//             "lat": 33.34831898029149,
//             "lng": -112.0832517197085
//           },
//           "southwest": {
//             "lat": 33.3456210197085,
//             "lng": -112.0859496802915
//           }
//         }
//       },
//       "place_id": "ChIJfybkSL8aK4cRdZqNLRVyfmQ",
//       "types": [
//         "establishment",
//         "food",
//         "park",
//         "point_of_interest",
//         "restaurant"
//       ]
//     }
//   ],
//   "status": "OK"
// }


let data = rawdata.slice(556,558)

console.log(data);



let parseLocation = (area, subarea, areaObj) => {
  let locationStr;
  if (area === null) {
    locationStr = subarea; // [subarea, areaObj.state, areaObj.country].join(', ');
  } else {
    locationStr = area;
  }
  return locationStr.split(' ').join('+').replace('/', '+');
};

let getLatLng = ( results ) => {
  return results[0].geometry.location;
};

let getLocInfo = ( results ) => {
  let comps = results[0].address_components;
  let info = {};
  for (let i = 0; i < comps.length; i++) {
    if (comps[i].types[0] === 'administrative_area_level_2') {
      info.county = comps[i].long_name;
    } else if (comps[i].types[0] === 'administrative_area_level_1') {
      info.state = comps[i].long_name;
    } else if (comps[i].types[0] === 'postal_code') {
      info.zipcode = comps[i].long_name;
    } else if (comps[i].types[0] === 'country') {
      info.country = comps[i].long_name;
    }
  }
  return info;
};

const getLocation = (locQuery) => {
  console.log('loc Q => ', locQuery);
  axios({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    method: 'get',
    params: {
      apikey: config.apikey,
      address: locQuery
    },
    timeout: 5000,
    responseType: 'json'
  })
  .then( ({ data }) => {
    console.log('Here are the results for ' + locQuery + ' ->', data.results);
    let parsedLoc = _.assignIn(
      getLatLng(data.results),
      getLocInfo(data.results)
    );
    console.log(parsedLoc);
    return parsedLoc;
  })
  .catch((error) => {
    console.error('This Error Occured: ', error);
    return error;
  });
};


let newjson = data.reduce( (arr, location, i) => {
  let { area, areaDescription, subarea, subareaDescription } = location;
  if ( area !== null && subarea === null ) {
    console.log('New: area = '+ areaDescription, 'subarea = '+ subareaDescription);
    arr.push({
      area,
      areaDescription,
      location: getLocation(parseLocation(areaDescription, subareaDescription, null)),
      subareas: []
    });
  } else {
    console.log('Existing: area = '+ areaDescription, 'subarea = '+ subareaDescription);
    let lastIndex = arr.length - 1;
    arr[ lastIndex ].subareas.push({
      subarea,
      subareaDescription,
      location: getLocation(parseLocation(null, subareaDescription, arr[ lastIndex ])),
    });
  }
  return arr;
}, []);



let doThis = () => {
  console.log('--------------------------------------')
  console.log(JSON.stringify(newjson));
  // fs.writeFileSync('areasFormated.json', newjson);
  console.log('--------------------------------------')
}


console.log('wait 20 seconds')
setTimeout(doThis, 20000)





























//
