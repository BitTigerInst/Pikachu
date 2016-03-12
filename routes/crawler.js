var express = require('express');
var router = express.Router();
var Crawler = require("simplecrawler");
var cheerio = require('cheerio');
var fs = require('fs');
var config = require('../config.js');
var randomUA = require('random-ua');
// var request = require('request');
// var url = require('url');
// var parseRobots = require("robots-parser");

// Respect robots.txt
// https://github.com/cgiffard/node-simplecrawler/blob/master/example/robots-txt-example.js

var xcfParser = require('../parsers/xcfParser');
var xcfQueue = require('../resources/xcfQueue');

/* GET users listing. */
router.post('/', function(req, res, next) {

  var ipFileName = "ip_list.txt";
  var ipFilePath = "./resources/";
  var ipFile = ipFilePath + ipFileName;

  var ipData = fs.readFileSync(ipFile).toString();
  var ipAddrLine = ipData.split('\n');

  var ipPOOL = [];

  for (var i = 0; i < ipAddrLine.length - 1; i++) {
    var element = ipAddrLine[i].split(':');

    ipPOOL.push({
      "ip": element[0].trim(),
      "port": parseInt(element[1])
    });
  }

  var targetUrl = config.targetUrl;
  var initialPort = config.initialPort;
  var initialPath = config.initialPath;

  var crawler = new Crawler(targetUrl, initialPath, initialPort);

  crawler.useProxy = true;
  crawler.interval = 500;
  crawler.maxConcurrency = 5;
  crawler.maxDepth = 5;
  crawler.acceptCookies = false;

  if (xcfQueue != null && xcfQueue.length > 0) {
    for (var i = 0; i < xcfQueue.length; i++) {
      crawler.queueURL(xcfQueue[i]);
    }
  }
  // crawler.queueURL("http://www.xiachufang.com/recipe/100536063/");

  rotateIP();
  rotateUserAgent();

  var conditionIdFileType = crawler.addFetchCondition(function(parsedURL) {
    return !parsedURL.path.match(/(\.pdf$|\.png$|\.jpg$|\.js$)/i);
  });

  var conditionIdPathType = crawler.addFetchCondition(function(parsedURL) {
    return parsedURL.path.match(/(\/recipe\/|\/category\/)/i);
  });

  setInterval(queueStats, 60000);

  function queueStats() {
    console.log("-----------------------------------------");
    console.log("maximum request latency was %dms.",
    crawler.queue.max("requestLatency"));
    console.log("minimum download time was %dms.",
    crawler.queue.min("downloadTime"));
    console.log("average resource size received is %d bytes.",
    crawler.queue.avg("actualDataSize"));
    console.log("number of completed queue item: %d.",
    crawler.queue.complete());
    console.log("number of failed queue item: %d.",
    crawler.queue.errors());
    console.log("-----------------------------------------");
  }

  setInterval(rotateIP, 800);

  function rotateIP() {
    var rand = parseInt(Math.random() * ipPOOL.length);
    var ipIndex = Math.min(Math.max(0, rand), ipPOOL.length - 1);

    crawler.proxyHostname = ipPOOL[ipIndex].ip;
    crawler.proxyPort = ipPOOL[ipIndex].port;
  }

  setInterval(rotateUserAgent, 1000);

  function rotateUserAgent() {
    crawler.userAgent = randomUA.generate();
  }

  // Crawler event handlers

  crawler.on("crawlstart", function() {
    console.log("Crawl starting");
  });

  crawler.on("fetchstart", function(queueItem) {
    console.log("fetchStart", queueItem.url);
    console.log(crawler.userAgent);
    console.log(crawler.proxyHostname + ":" + crawler.proxyPort);
  });

  crawler.on("queueadd", function(queueItem) {
    console.log("queueadd: " + queueItem.url);
  });

  crawler.on("fetcherror", function(queueItem, response) {
    console.log("queueItem.url: " + queueItem.url);
    console.log("fetcherror");
    // TODO: Better Re-try Strategy
    crawler.queueURL(queueItem.url);
  });

  crawler.on("fetchdataerror", function(queueItem, response) {
    console.log("queueItem.url: " + queueItem.url);
    console.log("fetchdataerror");
    // TODO: Better Re-try Strategy
    crawler.queueURL(queueItem.url);
  });

  crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
    console.log("Completed fetching resource:", queueItem.url);
    console.log("Received %s (%d bytes)", queueItem.url, responseBuffer.length);
    console.log("Resource of type %s", response.headers['content-type']);

    // Do something with the data in responseBuffer
    if (response.headers['content-type'].indexOf("text/html") > -1) {
      // Content Parse and Save
      xcfParser(queueItem, responseBuffer);
    }

  });

  crawler.on("complete", function() {
    console.log("Finished!");
  });

  crawler.start();

  res.send('respond with a resource');
});

module.exports = router;
