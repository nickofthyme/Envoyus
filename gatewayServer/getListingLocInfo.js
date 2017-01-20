let fs = require('fs');
let _ = require('lodash');
let axios = require('axios');
let cheerio = require('cheerio');
let $ = require('jquery');
let config = require('../config/config.privatekeys').googleMaps;
let zipToFips = require('./zipToFips.json')

// Inputs-----------
let listingsData = require('../craigslistService/newScrapeData/mbp-sfbay.json');
let outputFile = './listingsWithLocs/mbp-sfbay-FINAL.json' + '.json';

// TODO: perfect zipcode and FIPS fetching.
// TODO: Fetch area and subarea information as a fallback. Need to refactor listing scraper to record to listing.

let getLatLng = ( results ) => {
  // console.log('lat long results => ', results[0].geometry.location);
  return results[0].geometry.location;
};

let getFIPS = ({zipcode}) => {
  let FIPS;
  let catchIncrement = 0
  let newzip;
  while (FIPS !== undefined) {
    if (zipcode === undefined || zipcode === null) {
      FIPS = null;
    } else if (zipToFips[zipcode] !== undefined & catchIncrement === 0) {
      FIPS = zipToFips[zipcode];
      newzip = zipcode;
    } else if (zipToFips[zipcode + catchIncrement] !== undefined) {
      FIPS = zipToFips[zipcode + catchIncrement];
      newzip = zipcode + catchIncrement;
    } else if (zipToFips[zipcode - catchIncrement] !== undefined) {
      FIPS = zipToFips[zipcode - catchIncrement];
      newzip = zipcode - catchIncrement;
    }
    catchIncrement++;
  }
  // console.log(`FIPS for zipcode ${zipcode}: found FIPS=${FIPS} for zipcode=${newzip}`);
  return {FIPS};
}

getFIPS({zipcode: null});

// let getFIPS = ({zipcode}) => {
//   return axios.get(`http://www.zip-info.com/cgi-local/zipsrch.exe?cnty=cnty&zip=${zipcode}&Go=Go`)
//   .then( ({ data }) => {
//     $ = cheerio.load(data);
//     let FIPS = $('td')[8].children[0].data;
//     // console.log(`FIPS for zipcode ${zipcode} is ${FIPS}`);
//     return {FIPS};
//   })
//   .catch((error) => {
//     console.error(`Could not get FIPS for zipcode: ${zipcode}`);
//     return null;
//   });
// }


let getLocInfo = ( results ) => {
  let comps = results[0].address_components;
  // console.log('copms ------------ \n',comps);
  let info = {};
  // console.log(`these are the results => \n`, results);
  for (let i = 0; i < comps.length; i++) {
    if (comps[i].types[0] === 'administrative_area_level_2') {
      info.county = comps[i].long_name;
    }
    if (comps[i].types[0] === 'administrative_area_level_1') {
      info.state = comps[i].long_name;
    }
    if (comps[i].types[0] === 'postal_code') {
      info.zipcode = comps[i].long_name;
    }
    else if (comps[i].types[0] === 'country') {
      info.country = comps[i].long_name;
    }
  }
  // console.log('parsed info => \n', info);
  return info;
};

let getInfoByAreas = ({area, subarea}) => {
  // TODO: get info from listing area/subarea
  return null;
}

let getLocInfoByCity = async (cityName) => {
  // console.log('get loc by city name => ', cityName);
  let response;
  try {
    response = await axios({
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      method: 'get',
      params: {
        apikey: config.apikey,
        address: cityName
      },
      timeout: 5000,
    });
    let {data} = response;
    // console.log(`Here are the results for location by city name => : ${cityName}\n`, data.results);
    let locData, FIPS, latLng;
    try {
      locData = await getLocInfo(data.results);
    } catch(e) {
      locData = {}
    }
    try {
      FIPS = await getFIPS(locData);
    } catch(e) {
      FIPS = {}
    }
    try {
      latLng = await getLatLng(data.results);
    } catch(e) {
      latLng = {}
    }
    // console.log('locData => ',locData);
    // console.log('FIPS => ',FIPS);
    // console.log('latLng => ',latLng);
    let parsedLoc = _.assignIn(
      latLng,
      locData,
      FIPS
    );
    // console.log('-----------parsedLoc start-------------');
    // console.log(parsedLoc);
    // console.log('-----------parsedLoc end-------------');
    return parsedLoc;
  } catch (error) {
    console.error('Could not get location info by city name', error);
    return null;
  }
};

let getLocInfoByCords = async (lat, lng) => {
  // console.log(`get loc by coords => lat: ${lat}, lng: ${lng}`);
  let response;
  try {
    response = await axios({
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      method: 'get',
      params: {
        apikey: config.apikey,
        latlng: lat + ',' + lng
      },
      timeout: 5000,
    });
    let {data} = response;
    // console.log(`Here are the results for location by coords => lat: ${lat}, lng: ${lng}\n`, data.results);
    let locData, FIPS, latLng;
    try {
      locData = await getLocInfo(data.results);
    } catch(e) {
      locData = {}
    }
    try {
      FIPS = await getFIPS(locData);
    } catch(e) {
      FIPS = {}
    }
    try {
      latLng = await getLatLng(data.results);
    } catch(e) {
      latLng = {}
    }
    // console.log('locData => ',locData);
    // console.log('FIPS => ',FIPS);
    // console.log('latLng => ',latLng);
    let parsedLoc = _.assignIn(
      latLng,
      locData,
      FIPS
    );
    // console.log('-----------parsedLoc start-------------');
    // console.log(parsedLoc);
    // console.log('-----------parsedLoc end-------------');
    return parsedLoc;
  } catch (error) {
    console.error('Could not get location info by lat/lng', error);
    return null;
  }
};

let getAllLocInfo = async (listing) => {
  let {cityName, lat, lng} = listing;
  let locInfo;
  if (lat !== null && lng !== null) {
    try {
      locInfo = await getLocInfoByCords(lat, lng);
    }
    catch(e) {
      // Go on to next conditional
    }
  }
  if (cityName !== null && locInfo === undefined) {
    try {
      locInfo = await getLocInfoByCity(cityName);
    }
    catch(e) {
      // Go on to next conditional
    }
  } if (cityName === null && locInfo === undefined && lat === null && lng === null) {
    try {
      // TODO: get info from listing area/subarea
      locInfo = await getInfoByAreas(listing);
    }
    catch(e) {
      // set location info to empty object
      locInfo = {};
    }
  }
  console.log('listing...hold on...I\'ll be right back');
  // console.log('------------listing------------\n');
  // console.log(_.assignIn(listing, {location:locInfo}));
  // return listing;
  // console.log('final time => ',locInfo);
  return _.assignIn(listing, {location:locInfo});
}

let getAllLocInfoForListings = async (listings, outputFile) => {
  for (let i = 0; i < listings.length; i++) {
    await getAllLocInfo(listings[i]);
  }
  console.log('======Here are the new listings======\n', listings);
  fs.writeFileSync(outputFile, JSON.stringify(listings));
}

getAllLocInfoForListings(listingsData, outputFile);

module.exports = getAllLocInfoForListings
