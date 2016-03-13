# Elastic Search
For each recipe, we have numerical values like rating, dishes, comments, cooked. 

In addition to filtering according to the query sting the user provided, we also multiply the numerical value to be the ultimate score. We use the [function
score](https://www.elastic.co/guide/en/elasticsearch/guide/current/function-score-query.html) function provided by elastic search.

Some numerical values will be huge, like the likes, cooked, so we use the log function to smooth it out. For rating, we can simply
use the original value since it it on 0-10 scale.