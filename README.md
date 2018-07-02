# pcms-url-shortening

<h1>PCMS URL Shortening Website</h1>

<h2>A Java Web application with Spring Boot, and Redis.</h1>

<h3>common</h3>
<b>IDConverter.java</b> <br />
A Singleton class responsible for: <br />
1. Generating ID <br />
2. Using ID to create unique URL ID <br />
3. Using unique URL ID to retrieve original ID <br />
<br /> <br />
<b> URLValidator.java</b> <br />
A Singleton class responsible for validating URL's validity
 <br />
 <b> ShortenRequest.java</b>

<h3>controller</h3>
<b>UrlShorteningController.java</b> <br />
A Spring Boot Controller responsible for: <br/>
1. Accessing an endpoint to shorten URL <br />
2. Redirect shortened URL to the original URL <br />

<h2>repository</h3>
<b>URLRepository</b> <br />
A Java class responsible for abstracting Redis(database) read/write logic

<h2>service</h3>
<b>URLConverterService.java</b> <br />
A Java class used to abstract URL Shortening and URL Retrieval process
<br />
<b>PcmsUrlShorteningApplication.java</b> <br />
The entry point for the Spring application
<br /> <br />
<h2>To run:</h2>
1. Start up Redis' Server

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
