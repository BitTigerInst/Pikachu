var elasticsearch = require('elasticsearch');
var config = require('../config');

var client = new elasticsearch.Client({
  host: config.elasticsearch.url,
  log: ['error', 'trace']
});

client.ping({
  requestTimeout: 30000,

  // undocumented params are appended to the query string
  hello: "elasticsearch"
}, function(error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('ElasticSearch: All is well');
  }
});


/**
 * Basic recipe search based on name matching with ElasticSearch
 * @param  {[type]}   q        search term
 * @param  {Function} callback function(err, hits)
 * @return {[type]}            [description]
 */
function searchRecipeBasic(q, callback) {

  client.search({
    index: 'pikachu',
    type: 'recipes',
    body: {
      query: {
        match: {
          name: q
        }
      }
    }
  })
  .then(function(res) {
    var hits = [];

    if (res && res.hits && res.hits.hits) {
      hits = res.hits.hits.map(processResultXCF);
    }
    callback(null, hits);
  }, function(err) {
    console.trace(err.message);
    callback(err, null);
  });
}

/**
 * Enhanced recipe search with ElasticSearch function score query
 * @param  {[type]}   q        search term
 * @param  {Function} callback function(err, hits)
 * @return {[type]}            [description]
 */
function searchRecipe(q, callback) {

  client.search({
    "index": "pikachu",
    "type": "recipes",
    "body": {
      "query": {
        "function_score": {
          "query": {
            "match": {
              "name": q
            }
          },
          "functions": [
            {
              "field_value_factor": {
                "field": "likes",
                "factor": 0.1,
                "modifier": "log1p",
                "missing": 1
              }
            },
            {
              "field_value_factor": {
                "field": "rating",
                "factor": 1,
                "modifier": "none"
              }
            },
            {
              "field_value_factor": {
                "field": "dishes",
                "factor": 0.1,
                "modifier": "log1p",
                "missing": 1
              }
            },
            {
              "field_value_factor": {
                "field": "cooked",
                "factor": 0.1,
                "modifier": "log1p",
                "missing": 1
              }
            }
          ],
          "score_mode": "avg",
          "boost_mode": "multiply"
        }
      }
    }
  })
  .then(function(res) {
    var hits = [];

    if (res && res.hits && res.hits.hits) {
      hits = res.hits.hits.map(processResultXCF);
    }
    callback(null, hits);
  }, function(err) {
    console.trace(err.message);
    callback(err, null);
  });
}

function processResultXCF(hit) {
  var suffix = "@2o_50sh_1pr_1l_140w_106h_1c_1e_90q_1wh.jpg";

  hit._source.id = hit._id.split(':')[1];
  hit._source.image = hit._source.image.replace("s2.cdn", "s1.cdn") + suffix;
  return hit._source;
}

exports.searchRecipe = searchRecipe;
exports.searchRecipeBasic = searchRecipeBasic;
