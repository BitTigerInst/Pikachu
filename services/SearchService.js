var elasticsearch = require('elasticsearch');


// Reference:
// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/quick-start.html

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.ping({
  requestTimeout: 30000,

  // undocumented params are appended to the query string
  hello: "elasticsearch"
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('ElasticSearch: All is well');
  }
});

// https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-sort.html

function searchRecipe(q, callback) {

  client.search({
    index: 'pikachu',
    type: 'recipes',
    body: {
        "query": {
            "function_score": {
                "query": {
                    "match_all": {}
                },
                "filter": {
                    "term": {
                        "name": q
                    }
                },
                "functions": [
                    {
                        "field_value_factor": {
                            "field": "likes",
                            "factor": 1,
                            "modifier": "log1p",
                            "missing": 1
                        }
                    },
                    {
                        "field_value_factor": {
                            "field": "rating"
                        }
                    },
                    {
                        "field_value_factor": {
                            "field": "dishes",
                            "factor": 1,
                            "modifier": "log1p",
                            "missing": 1
                        }
                    },
                    {
                        "field_value_factor": {
                            "field": "cooked",
                            "factor": 1,
                            "modifier": "log1p",
                            "missing": 1
                        }
                    }
                ],
                "boost_mode": "multiply"
            }
        }
    }
  }).then(function (res) {
      var hits = [];
      if (res && res.hits && res.hits.hits) {
        hits = res.hits.hits;
      }
      callback(null, hits);
  }, function (err) {
      console.trace(err.message);
      callback(err, null);
  });
}

exports.searchRecipe = searchRecipe;

