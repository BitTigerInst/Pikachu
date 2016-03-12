var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
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
 * searchRecipe() function to search with ElasticSearch API
 * @param  {[type]}   q        search term
 * @param  {Function} callback function(err, hits)
 * @return {[type]}            [description]
 */
function searchRecipe(q, callback) {

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
      hits = res.hits.hits.map(function(hit) {
        hit._source.id = hit._id.split(':')[1];
        return hit._source;
      });
    }
    callback(null, hits);
  }, function(err) {
    console.trace(err.message);
    callback(err, null);
  });
}

exports.searchRecipe = searchRecipe;
