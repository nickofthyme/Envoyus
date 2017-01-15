const axios = require('axios');
const config = require('../../config/config.privatekeys.js').scrapinghub;
const _ = require('lodash');

const getSpiderData = (project) => {
  axios({
    url: `https://storage.scrapinghub.com/items/${project}`,
    method: 'get',
    transformResponse: [(data) => {
      return data;
    }],
    // headers: {'X-Requested-With': 'XMLHttpRequest'},
    params: {
      apikey: config.apikey,
      format: 'json'
    },
    timeout: 10000,
    responseType: 'json'
  })
  .then((response) => {
    console.log(response);
    return response;
  })
  .catch((error) => {
    console.error(error);
    return error;
  });
};

// options = {
//   search_area = ?,
//   search_subarea = ?,
//   search_domain = ?,
//   search_query = ?,
//   search_category = ?,
//   search_sort = ?
// }

const setSpiderJob = (project, spider, priority, options) => {
  axios({
    url: 'https://app.scrapinghub.com/api/run.json',
    method: 'post',
    transformResponse: [(data) => {
      return data;
    }],
    params: {
      apikey: config.apikey
    },
    data: _.assignIn({
      project,
      spider,
      priority
    }, options),
    timeout: 10000
  })
  .then((response) => {
    console.log(response);
    return response.jobid;
  })
  .catch((error) => {
    console.error(error);
    return error;
  });
};

// TODO: Needs fixing, doesn't work in postman
// https://support.scrapinghub.com/topics/708-api-for-periodic-jobs/
const setPeriodicJob = (project, spider, options) => {
  axios({
    url: 'http://dash.scrapinghub.com/api/periodic_jobs',
    method: 'post',
    transformResponse: [(data) => {
      return data;
    }],
    params: {
      project
    },
    timeout: 10000,
    data: _.assignIn({
      project,
      spider
    }, options)
    // options = {
    //   hour: ? // time on the minute to run, use '*' for every minute
    //   minutes_shift: ?, // time on the hour to run, use '*' for every hour
    //   day: ?, // day of the month to run, use '*' for every day
    //   dayoftheweek: ?, // month of the year to run, use '*' for every month
    //   month: ?, // month of the year to run, use '*' for every month
    //   spiders: [{
    //     priority: 2 or 4, // 2 for CL, 4 for amazon
    //     args: {
    //       search_area = ?,
    //       search_subarea = ?,
    //       search_domain = ?,
    //       search_query = ?,
    //       search_category = ?,
    //       search_sort = ?
    //       },
    //     name: ?
    //   }]
    // }
  })
  .then((response) => {
    console.log(response);
    return response.jobid;
  })
  .catch((error) => {
    console.error(error);
    return error;
  });
};

const deleteJob = (project, job) => {
  axios({
    url: 'https://app.scrapinghub.com/api/jobs/delete.json',
    method: 'post',
    params: {
      apikey: config.apikey
    },
    data: {
      project,
      job
    },
    timeout: 10000
  })
  .then((response) => {
    console.log(response);
    return response;
  })
  .catch((error) => {
    console.error(error);
    return error;
  });
};

const deletePeriodicJob = (project, job) => {
  axios({
    url: `http://dash.scrapinghub.com/api/periodic_jobs/${job}`,
    method: 'post',
    params: {
      apikey: config.apikey,
      project
    },
    timeout: 10000
  })
  .then((response) => {
    console.log(response);
    return response;
  })
  .catch((error) => {
    console.error(error);
    return error;
  });
};

const getAllSpiderJobs = (project) => {
  axios({
    url: `https://storage.scrapinghub.com/jobq/${project}/list`,
    method: 'get',
    transformResponse: [(data) => {
      return data;
    }],
    params: {
      apikey: config.apikey,
      format: 'json'
    },
    timeout: 10000,
    responseType: 'json'
  })
  .then((response) => {
    console.log(response);
    return response;
  })
  .catch((error) => {
    console.error(error);
    return error;
  });
};

const getAllPeriodicJobs = (project) => {
  axios({
    url: '2b9b881e02eb49d78b56655fce08dc42',
    method: 'get',
    params: {
      apikey: config.apikey,
      project,
      format: 'json'
    },
    timeout: 10000
  })
  .then((response) => {
    console.log(response);
    return response;
  })
  .catch((error) => {
    console.error(error);
    return error;
  });
};


const project = config.project;
const spiders = config.spiders;

const scrapers = {
  craigslist: {
    getSpiderData: _.partial(getSpiderData, project.craigslist),
    setSpiderJob: _.partial(setSpiderJob, spiders.craigslist, project.craigslist, 2),
    deleteJob: _.partial(deleteJob, project.craigslist),
    getAllSpiderJobs: _.partial(getAllSpiderJobs, project.craigslist),
    setPeriodicJob: _.partial(setPeriodicJob, project.craigslist),
    getAllPeriodicJobs: _.partial(getAllPeriodicJobs, project.craigslist),
    deletePeriodicJob: _.partial(deletePeriodicJob, project.craigslist)
  },
  amazon: {
    getSpiderData: _.partial(getSpiderData, project.amazon),
    setSpiderJob: _.partial(setSpiderJob, spiders.amazon, project.amazon, 4),
    deleteJob: _.partial(deleteJob, project.amazon),
    getAllSpiderJobs: _.partial(getAllSpiderJobs, project.amazon),
    setPeriodicJob: _.partial(setPeriodicJob, project.amazon),
    getAllPeriodicJobs: _.partial(getAllPeriodicJobs, project.amazon),
    deletePeriodicJob: _.partial(deletePeriodicJob, project.amazon)
  }
};

module.exports = scrapers;
