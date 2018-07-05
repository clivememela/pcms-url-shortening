# pcms-url-shortening

<h1>PCMS URL Shortening Website</h1>

<h2>A Java Web application with Spring Boot, and Redis.</h1>

<h3>common</h3>
<b>IDConverter.java</b> <br />
A Singleton class responsible for: <br />
1. Generating ID <br />
2. Using ID to create unique URL ID <br />
3. Using unique URL ID to retrieve original ID <br />
<br />
<b> URLValidator.java</b> <br />
A Singleton class responsible for validating URL's validity<br />
 <br />
 <b> ShortenRequest.java</b>

<h3>controller</h3>
<b>UrlShorteningController.java</b> <br />
A Spring Boot Controller responsible for: <br/>
1. Accessing an endpoint to shorten URL <br />
2. Redirect shortened URL to the original URL <br />

<h3>form</h3>
<b>UrlForm.java</b> <br />
Used for url input and url input validation before submit <br />
<br />
<b>UrlResultFrom.java</b> <br />
Used for display of shortening result

<h2>repository</h3>
<b>URLRepository</b> <br />
A Java class responsible for abstracting Redis(database) read/write logic (see assumption below under To run:)

<h2>service</h3>
<b>URLConverterService.java</b> <br />
A Java class used to abstract URL Shortening and URL Retrieval process <br />
<br />
<b>PcmsUrlShorteningApplication.java</b> <br />
The entry point for the Spring application
<br /> <br />
<h2>To run:</h2>
(Assumption is that you have installed Redis n-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs and geospatial indexes with radius queries. Redis has built-in replication, Lua scripting, LRU eviction, transactions and different levels of on-disk persistence, and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster. visit https://redis.io/)<br/>

1. Start up Redis' Server (this needs to be started or else the application will not work)

```
redis-server
```

2. Build the project

```
mvn clean install
```


3. Run the project

```
mvn spring-boot:run
```

<br />
