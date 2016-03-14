# Pikachu

Description
-----------

Our goal is to build a recipe crawler and search system that discover interesting facts from recipes and provide optimized search results. The system consist of two major components, including web crawler, search.


Plan
----

Based on our experiences on web development and data science, as well as the descriptions mentioned above, we take _Feb, 2016_ as the __1st stage__ with the __primary__ goal of __prototyping__ our application following the development guild lines mentioned below. Here's the tentative timeline.

* __[2016/02/08 - 2016/02/12]__ Project Selection, Plan Discussion, Proposal Draft Writing, Resource Discovery
* __[2016/02/13 - 2016/03/07]__ System Design, Project Implementation
    * Web Crawler
    * Search
    * ~~Exploratory Analyzer / Recommender~~
* __[2016/03/08 - 2016/03/15]__ Document Writing, User Manual Writing and Video Presentation Making

Project management
------------------

[Pikachu@Trello](https://trello.com/b/VxeNSfp5/xiachufang-crawler-recommendation)

Development Guild Lines
-----------------------

- __Modularity.__ Following the principle _"loose coupling and high cohesion"_, each module should be standalone.
- __Minimalism.__ Each module should be kept short, simple, and concise. Every piece of code should be transparent upon first reading.
- __Easy extensibility.__ New modules (as new classes and functions) are should be simply add, and existing modules should be extended easily.

Language & Framework & Tech Stack
--------------------

+ Javascript: Node.js, Express.js, AngularJS
+ Database: MongoDB
+ Cloud Platform: Cloud Foundry


System Diagram
--------------


![System Architecture](https://raw.githubusercontent.com/BitTigerInst/Pikachu/master/docs/System%20Architecture.png)
---

Resource
--------

[BitTiger Project: AppStore - Website](https://slack-files.com/T0GUEMKEZ-F0J4G9QTT-274d3bc97e)


**Web Crawler**

- [node-simplecrawler](https://github.com/cgiffard/node-simplecrawler)
- [cheerio](https://github.com/cheeriojs/cheerio)
- [Node.js Web Crawler Tutorials](https://potentpages.com/web-crawler-tutorials/nodejs/)

**MEAN Stack**

MEAN is an acronym for MongoDB, Express.js , Angular.js and Node.js

A very good online course about MEAN stack on edX:

- [MongoDBx: M101x Introduction to MongoDB using the MEAN Stack](https://courses.edx.org/courses/course-v1:MongoDBx+M101x+3T2015/)


MongoDB: *MongoDB is an open-source, document database (NoSQL) designed for ease of development and scaling.*

- [M101JS: MongoDB for Node.js Developers](https://university.mongodb.com/courses/M101JS/)
- [www.mongodb.org](https://www.mongodb.org/)
- [mongoose](http://mongoosejs.com/)

Express.js: *Fast, unopinionated, minimalist web framework for Node.js.*

- [Expressjs.com](http://expressjs.com/)

Angular.js: *Angular is a development platform for building mobile and desktop web applications.*

- [AngularJS](https://angularjs.org/)

Node.js: *Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.*

- [nodejs.org](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)


**Hybrid Mobile App**

Ionic: *Ionic is an advanced HTML5 hybrid mobile app framework, it makes it incredibly easy to build beautiful and interactive mobile apps using HTML5 and AngularJS.*

- [Ionic Framework](http://ionicframework.com/)

**Search**

ElasticSearch: *Elasticsearch is a search server based on Lucene. It provides a distributed, multitenant-capable full-text search engine with an HTTP web interface and schema-free JSON documents.*

- [elastic.co](https://www.elastic.co/)
- [elasticsearch-js](https://github.com/elastic/elasticsearch-js)

Miscellaneous
-------------

[FAQ](https://github.com/BitTigerInst/Pikachu/blob/master/docs/faq.md)

[MongoDB & ElasticSearch For Full Text Search In Chinese](https://github.com/BitTigerInst/Pikachu/blob/master/docs/mongodb_elasticsearch_setup.md)

[Anti Anti-scraping Strategy](http://aaronice.github.io/2016/02/15/anti-anti-spider-strategy/)

Owner
-----

@Pikachu
