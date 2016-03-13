#### 提问0：能讲讲elastic search怎么实现的吗？

答：ES+MongoDB具体实现过程：
https://github.com/BitTigerInst/Pikachu/blob/master/docs/mongodb_elasticsearch_setup.md

#### 提问1：为什么没用mysql？
答：MEAN stack选型，主要考虑了数据读取存储的
1. 便利性：MongoDB可以方便地存储类似JSON的BSON文件，而在前端的API请求中，返回的JSON与存储的BSON结构内容类似
2. 灵活性：MongoDB是schemaless，在开发过程可以灵活地增加field

#### 提问2：能不能请教一下，你们用的什么样的服务器？还是目前还是全部host在local的？
答：最开始部署到了IBM Bluemix上，因为是开源Cloud Foundry的PaaS，能够很快的得到Node.js runtime; MongoDB 采用了mLab host的MongoB; 目前后端services host均在本地，未来会考虑部署到服务器上，比如Heroku, Bluemix，都是备选项

#### 提问3：这个是一台机器抓，还是多台多个ip呢？
答：一台机器，使用多个IP proxy进行抓取

#### 提问4：如果用amazon云会不会被封呢？
答：如果不使用IP Address Rotation的话，还是很可能被封的；也有很多网站对于来自AWS、阿里云等IP段的爬虫进行封禁
