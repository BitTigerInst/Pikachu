# MongoDB & ElasticSearch For Full Text Search In Chinese

## Mongo - Connector

Install `elasticsearch`

```
brew install elasticsearch
```

Start Elastic Search

```
elasticsearch
```

Create a directory for replica set

```
mkdir -p /data/db_rs
```

Start `mongod` instance for replica set (the port here is different from default `27017`)

```
mongod --port 27018 --dbpath /data/db_rs --replSet rs0
```

(may require `sudo`)

Use `mongo-connector` to connect MongoDB and Elastic Search

```
mongo-connector --auto-commit-interval=0 -m localhost:27018 -t localhost:9200 -d elastic_doc_manager
```




## Test

### Search request
```
curl -XPOST 'http://localhost:9200/pikachu/_search?pretty=true' -d '{
  "query": {
    "filtered": {
      "query": {
        "match": {
          "name": {
            "query": "慕斯"
          }
        }
      },
      "filter": {
        "term": {
          "_type": "recipes"
        }
      }
    }
  }
}'
```

### Response

```
{
  "took" : 37,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 21,
    "max_score" : 4.257974,
    "hits" : [ {
      "_index" : "pikachu",
      "_type" : "recipes",
      "_id" : "recipe:110104",
      "_score" : 4.257974,
      "_source" : {
        "rating" : 7.7,
        "name" : "芒果慕斯",
        "dishes" : 1849,
        "ingredients" : [ "芒果", "牛奶", "淡奶", "戚风蛋糕", "鱼胶片", "细砂糖" ],
        "image" : "http://s2.cdn.xiachufang.com/1f5fde067d2411e5ae46b82a72e00100.jpg",
        "comments" : 97,
        "dateCreated" : "2011-11-01",
        "cooked" : 1539,
        "__v" : 0,
        "likes" : 38264,
        "categories" : [ "20135", "40072", "20158", "51295", "52408" ]
      }
    }, {
      "_index" : "pikachu",
      "_type" : "recipes",
      "_id" : "recipe:100493899",
      "_score" : 3.893651,
      "_source" : {
        "rating" : 8.3,
        "name" : "芒果慕斯",
        "dishes" : 382,
        "ingredients" : [ "芒果泥", "淡奶油", "吉利丁片", "糖粉（按芒果甜度加减)" ],
        "image" : "http://s2.cdn.xiachufang.com/f2a0d9867ebf11e5a55ab82a72e00100.jpg",
        "comments" : 132,
        "dateCreated" : "2015-05-15",
        "cooked" : 309,
        "__v" : 0,
        "likes" : 13107,
        "categories" : [ "51295" ]
      }
    }, {
      "_index" : "pikachu",
      "_type" : "recipes",
      "_id" : "recipe:267990",
      "_score" : 3.8853025,
      "_source" : {
        "rating" : 7.6,
        "name" : "榴莲慕斯",
        "dishes" : 261,
        "ingredients" : [ "低筋面粉", "鸡蛋", "色拉油", "鲜牛奶", "细砂糖", "细砂糖", "榴莲肉", "淡奶油", "吉利丁片", "牛奶", "糖", "淡奶油", "糖", "黄油", "糖粉", "牛奶", "朗姆酒", "wilton橙色素", "抹茶粉", "白巧克力" ],
        "image" : "http://s2.cdn.xiachufang.com/a5c2aed47d4411e5936449a26463ae26.jpg",
        "comments" : 14,
        "dateCreated" : "2013-04-15",
        "cooked" : 209,
        "__v" : 0,
        "likes" : 5161,
        "categories" : [ "51295", "20135", "40072", "20158" ]
      }
    }, {
      "_index" : "pikachu",
      "_type" : "recipes",
      "_id" : "recipe:100045187",
      "_score" : 3.8633535,
      "_source" : {
        "rating" : 8.5,
        "name" : "草莓慕斯",
        "dishes" : 4298,
        "ingredients" : [ "蛋糕胚", "草莓", "草莓酱", "动物性淡奶油", "吉丁片", "砂糖", "草莓口味QQ糖（镜面）" ],
        "image" : "http://s2.cdn.xiachufang.com/2ffd81d47dc011e5a291753d7a9f68b0.jpg",
        "comments" : 167,
        "dateCreated" : "2013-12-03",
        "cooked" : 3639,
        "__v" : 0,
        "likes" : 76904,
        "categories" : [ "20158", "51295", "20135", "52382" ]
      }
    }, {
      "_index" : "pikachu",
      "_type" : "recipes",
      "_id" : "recipe:100427641",
      "_score" : 3.1934805,
      "_source" : {
        "rating" : 6.7,
        "name" : "樱花草莓慕斯",
        "dishes" : 95,
        "ingredients" : [ "模具：2寸水滴形慕斯圈5个", "海绵蛋糕：", "慕斯层：", "淡奶油", "草莓", "细砂糖", "吉利丁", "镜面：", "雪碧", "吉利丁", "水", "盐渍樱花" ],
        "image" : "http://s2.cdn.xiachufang.com/e76393c07e8711e591e65dfac8d4b0dd.jpg",
        "comments" : 29,
        "dateCreated" : "2014-12-31",
        "cooked" : 82,
        "__v" : 0,
        "likes" : 6266,
        "categories" : [ "51295", "20158" ]
      }
    }, {
      "_index" : "pikachu",
      "_type" : "recipes",
      "_id" : "recipe:1026011",
      "_score" : 2.9202383,
      "_source" : {
        "rating" : 8.2,
        "name" : "草莓慕斯蛋糕",
        "dishes" : 5885,
        "ingredients" : [ "海绵蛋糕", "淡奶油", "草莓", "吉利丁片", "糖" ],
        "image" : "http://s2.cdn.xiachufang.com/a75046847d6011e583dfb82a72e00100.jpg",
        "comments" : 204,
        "dateCreated" : "2012-03-25",
        "cooked" : 4694,
        "__v" : 0,
        "likes" : 69149,
        "categories" : [ "20158", "51295", "51761", "52387" ]
      }
    }, {
      "_index" : "pikachu",
      "_type" : "recipes",
      "_id" : "recipe:261742",
      "_score" : 2.9202383,
      "_source" : {
        "rating" : 6.7,
        "name" : "巧克力慕斯杯",
        "dishes" : 212,
        "ingredients" : [ "黑巧克力", "淡奶油", "牛奶", "细砂糖", "吉利丁粉", "清水", "糖粉", "可可粉", "棍子饼干", "巧克力花片", "黑巧克力碎" ],
        "image" : "http://s2.cdn.xiachufang.com/b497c1a67d4111e582b9b82a72e00100.jpg",
        "comments" : 13,
        "dateCreated" : "2012-11-01",
        "cooked" : 195,
        "__v" : 0,
        "likes" : 6933,
        "categories" : [ "51295", "20135", "20158", "52405", "52408" ]
      }
    }, {
      "_index" : "pikachu",
      "_type" : "recipes",
      "_id" : "recipe:267810",
      "_score" : 2.897515,
      "_source" : {
        "rating" : 7.2,
        "name" : "酸奶慕斯HelloKitty蛋糕",
        "dishes" : 397,
        "ingredients" : [ "原味酸奶", "淡奶油", "糖粉", "柠檬汁", "吉利丁片", "温水", "红色素", "黄色素", "黑巧克力" ],
        "image" : "http://s2.cdn.xiachufang.com/8d32fa237d4411e58c6813a10792eddb.jpg",
        "comments" : 25,
        "dateCreated" : "2013-04-09",
        "cooked" : 313,
        "__v" : 0,
        "likes" : 6069,
        "categories" : [ "20135", "20158", "51295" ]
      }
    }, {
      "_index" : "pikachu",
      "_type" : "recipes",
      "_id" : "recipe:100033996",
      "_score" : 2.695013,
      "_source" : {
        "rating" : 7.4,
        "name" : "鲜橙慕斯蛋糕",
        "dishes" : 285,
        "ingredients" : [ "A、细砂糖50g，清水50g，橙片6片", "B、蛋黄2颗、鲜奶100g，细砂糖15g", "C、鱼胶粉3+1/4小匙，清水4大匙", "D、动物鲜奶油200g，细砂糖20g，白", "E、鲜榨橙汁100g，鱼胶粉1/2小匙", "F、鲜榨橙汁40g，细砂糖5g，鱼胶粉1/2小匙，清水1大匙", "G：6寸海绵蛋糕一个" ],
        "image" : "http://s2.cdn.xiachufang.com/75f555ab7dba11e5a4b023a6ba65962e.jpg",
        "comments" : 28,
        "dateCreated" : "2013-10-15",
        "cooked" : 255,
        "__v" : 0,
        "likes" : 9722,
        "categories" : [ "20158", "51761", "51295" ]
      }
    }, {
      "_index" : "pikachu",
      "_type" : "recipes",
      "_id" : "recipe:100409082",
      "_score" : 2.4283142,
      "_source" : {
        "rating" : 8.4,
        "name" : "火龙果慕斯（小蛋糕）",
        "dishes" : 970,
        "ingredients" : [ "火龙果液", "吉利丁片", "淡奶油", "糖", "饼干底材料", "优冠饼干", "黄油" ],
        "image" : "http://s2.cdn.xiachufang.com/d01bb03a7e7b11e5bf260b5e6de623fb.jpg",
        "comments" : 214,
        "dateCreated" : "2014-11-18",
        "cooked" : 746,
        "__v" : 0,
        "likes" : 26205,
        "categories" : [ "51295", "20158" ]
      }
    } ]
  }
}
```



## Dump and Restore

Dump files from MongoDB

```
mongodump
```

It will dump to `/dump` folder by default, or you my specify a path to the dump.

Restore using the dumped files

```
mongorestore --host <hostname><:port>
```

You'll have to be in the directory that contains the /dump folder, which comes from the `mongodump`. And the hostname and port should be the `replSet` hostname: `localhost`, port: `27018`

## Re-sync
If necessary, may consider **re-sync** MongoDB with ElasticSearch:

You can remove all data quickly and efficiently by [deleting the index](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/indices-delete-index.html) and [re-creating](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/indices-create-index.html) it: (here the hostname is `localhost`, port is `27018`, index name is `pikachu`)

```
curl -XDELETE http://<hostname>:<port>/<index name> curl -XPUT http://<hostname>:<port>/<index name>
```

After this, you should refresh the index to make these changes visible:

```
curl -XPOST http://<hostname>:<port>/<index name>/_refresh
```

## Reference

- [用 mongodb + elasticsearch 实现中文检索](http://blog.csdn.net/yeasy/article/details/47842437)
- [使用Mongo Connector和Elasticsearch实现模糊匹配](http://www.csdn.net/article/2014-09-02/2821485-how-to-perform-fuzzy-matching-with-mongo-connector?)
- [MongoDB 数据自动同步到 ElasticSearch](https://segmentfault.com/a/1190000003773614)
- [Resyncing the Connector](https://github.com/mongodb-labs/mongo-connector/wiki/Resyncing%20the%20Connector)
- [mongo-connector原理及改造](http://foofish.net/blog/76/mongo-connector)
- [查询与过滤条件的合并](http://es.xiaoleilu.com/054_Query_DSL/75_Queries_with_filters.html)
- [MongoBD + Solr全文搜索的历程*](http://www.edwardesire.com/full-text-search-of-mongodb-with-solr/)
- [mongo-connector原理及改造](http://foofish.net/blog/76/mongo-connector)
- [使用 Elasticsearch 实现博客站内搜索](https://imququ.com/post/elasticsearch.html)
- [StackOverflow: How to use Elasticsearch with MongoDB?](http://stackoverflow.com/questions/23846971/how-to-use-elasticsearch-with-mongodb)
- [Optimizing Search Results in Elasticsearch with Scoring and Boosting](https://qbox.io/blog/optimizing-search-results-in-elasticsearch-with-scoring-and-boosting)
- [Elasticsearch: The Definitive Guide](https://www.elastic.co/guide/en/elasticsearch/guide/current/index.html)
- [Elasticsearch权威指南（中文版）](https://www.gitbook.com/book/looly/elasticsearch-the-definitive-guide-cn/details)
- [ElasticSearch Javascript API](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/quick-start.html)
- [Elasticsearch Reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
