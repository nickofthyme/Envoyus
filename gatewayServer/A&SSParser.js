let fs = require('fs');
let _ = require('lodash');
let rawdata = require('./areasAndSubareas.json');
let areaData = require('./NEWareasFirst.json');
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


let data = rawdata
// let data = rawdata.slice(556,565)



let parseLocation = (area, subarea, areaObj) => {
  let locationStr;
  if (subarea !== null) {
    locationStr = [subarea, areaObj.state, areaObj.country].join(', ');
  } else {
    locationStr = area;
  }
  // return locationStr.split(' ').join('+').replace('/', '+').replace('-', '+').replace('+++', '+').replace('++', '+').replace(',', '+').replace('-', '+');
  return locationStr.split(' ')[2].replace('/', '+').replace('-', '+').replace('+++', '+').replace('++', '+').replace(',', '+').replace('-', '+');
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

let getLocation = (locQuery) => {
  console.log('loc Q => ', locQuery);
  return axios({
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
    return null;
  });
};

let makeAreas = async (data, getLocation) => {
  arr = []
  for (let i = 0; i < data.length; i++) {
    let { area, areaDescription, subarea, subareaDescription } = data[i];
    let lastIndex = arr.length - 1;
    if ( area !== null && subarea === null ) {
      console.log('New: area = '+ areaDescription, 'subarea = '+ subareaDescription);

      let res;
      try{
        res = await getLocation(parseLocation(areaDescription, subareaDescription, null));
      }
      catch (e) {
        console.error('Error: ' , e)
        res = null;

      }
      arr[ lastIndex + 1 ] = {
        area,
        areaDescription,
        location: res,
        subareas: []
      };
    }
  };
  console.log('New file => ', JSON.stringify(arr))
  fs.writeFileSync('areasFormated.json', JSON.stringify(arr));
}

let findAreaIndex = (area, areaArr) => {
  for (let i = 0; i < areaArr.length; i++) {
    if ( areaArr[i] === area ) {
      return i;
    }
  }
}


let makeSubareas = async (data, getLocation, arr) => {
  for (let i = 0; i < data.length; i++) {
    let { area, areaDescription, subarea, subareaDescription } = data[i];
    if ( subarea !== null ) {
      console.log('Add Subareas: area = ' + areaDescription, 'subarea = ' + subareaDescription);
      let areaIndex = findAreaIndex(area, arr);
      console.log('Found area is ' + arr[areaIndex] + ' should equal ' + area);
      let res;
      try{
        res = await getLocation(parseLocation(null, subareaDescription, arr[ areaIndex ]));
      }
      catch (e) {
        console.error('Error: ' , e)
        res = null;
      }
      arr[ areaIndex ].subareas = {
        subarea,
        subareaDescription,
        location: res,
      };
    }
  };
  console.log('New file => ', JSON.stringify(arr))
  fs.writeFileSync('SubareasFormated.json', JSON.stringify(arr));
}


// makeSubareas(data, getLocation, areaData)


let fixAreas = async (areaData) => {
  errors = []
  for (let i = 0; i < areaData.length; i++) {
    let area = areaData[i]
    if (areaData[i].location === null) {
      console.log('UPDATE AREA: area = '+ area.areaDescription);
      let res;
      try{
        locality = parseLocation(area.areaDescription, null, null)
        errors.push({area:area.area, why:locality ,index:i})
        res = await getLocation(locality);
      }
      catch (e) {
        console.error('Error: ' , e)
        res = null;
      }
      areaData[i].location = res;
    }
  }
  console.log('New area file => ', JSON.stringify(areaData))
  console.log('had errors =>', errors)
  console.log('total errors => ', errors.length);
  fs.writeFileSync('NEWareasSecond.json', JSON.stringify(areaData));
}

// let testData = areaData.splice(0, 5)
// console.log('testdata ', testData)

fixAreas(areaData)


// let makeAreas = (data, getLocation) => {
//   data.reduce( (arr, location, i) => {
//     let { area, areaDescription, subarea, subareaDescription } = location;
//     let lastIndex = arr.length - 1;
//     if ( area !== null && subarea === null ) {
//       console.log('New: area = '+ areaDescription, 'subarea = '+ subareaDescription);
//       let res = hey // getLocation(parseLocation(areaDescription, subareaDescription, null));
//       arr[ lastIndex + 1 ] = {
//         area,
//         areaDescription,
//         location: res,
//         subareas: []
//       };
//     } else {
//       console.log('Existing: area = '+ areaDescription, 'subarea = '+ subareaDescription);
//       let lastIndex = arr.length - 1;
//       arr[ lastIndex ].subareas.push({
//         subarea,
//         subareaDescription,
//         location: null // getLocation(parseLocation(null, subareaDescription, arr[ lastIndex ])),
//       });
//     }
//     return arr;
//   }, []);
// }




// console.log('New file => ', JSON.stringify(newjson))

// let doThis = () => {
//   console.log('--------------------------------------')
//   console.log(JSON.stringify(newjson));
  // fs.writeFileSync('areasFormated.json', newjson);
//   console.log('--------------------------------------')
// }
//
// setTimeout(doThis, 20000)





























//
