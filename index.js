#! /usr/bin/env node
const request = require('request'),
  chalk = require('chalk'),
  log = console.log,
  env = require('./env'),
  username = env.USERNAME,
  apiToken = env.API_TOKEN,
  email = env.EMAIL,
  timeSpent = '1m',
  comment = 'testing work log api'
  data = {  
    'author':{  
       'self':`https://fusioncharts.jira.com/rest/api/2/user?username=${username}`,
       'name': `${username}`,
       'key': `${username}`,
       'accountId':'557058:46262cb6-aa13-4fa1-ba6b-bdf39d55a135',
       'active':true
    },
    'self':`https://fusioncharts.jira.com/rest/api/2/user?username=${username}`,
    'updateAuthor': {},
    'comment' : comment,
    'timeSpent': timeSpent
  },
  domain = env.DOMAIN,
  issueIdOrKey = '61122',

  // Set the headers
  headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Basic ` + new Buffer(`anindya@fusioncharts.com:${apiToken}`).toString('base64')
  },
  // Configure the request
  options = {
    url: `https://${domain}.jira.com/rest/api/2/issue/${issueIdOrKey}/worklog`,
    method: 'POST',
    headers: headers,
    json: true,
    body: data
  };
// Start the request
request(options, function (error, response, body) {
  if (!error && !body.errorMessages) {
    log(chalk.green.underline('worklog added!'));
    log(chalk.hex('#00a200')(`worklog author: ${body.author.displayName}`));
    log(chalk.hex('#00a200')(`description: ${body.comment}`));
    log(chalk.hex('#00a200')(`time spent: ${body.timeSpent}`));
  } else {
    log(chalk.red.bold(`error: ${body.errorMessages[0]}`));
  }
});
