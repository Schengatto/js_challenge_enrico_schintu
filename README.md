
# JS Challenge Vue App

  

## Requirments

  

To be able to build and test this Vue.js application you have two possible ways:

  

**Option 1**

Build the application locally and then serve it in a web server. Make sure to have these tools installed in your system:

- [Node.js (v12+ )](https://nodejs.org/it/download/)

- A Web server like Nginx / Apache2 or a simple [http-server](https://www.npmjs.com/package/http-server)

- A modern browser like [Google Chrome](https://www.google.com/intl/en/chrome/) / [Mozilla Firefox](https://www.mozilla.org/en/firefox/new/) / Microsoft Edge / Opera / Safari

  

**Option 2**

Build the application in a docker container and then serve it in a docker container with Nginx. Make sure to have [Docker](https://www.docker.com/products/docker-desktop) installed in your system.

  

## Installation guide

  

### Option 1

Follow these steps if you want to build, test and serve this application locally.

  

Download the source code from GitHub or clone this [repository](https://github.com/Schengatto/js_challenge_enrico_schintu)

Access to the folder `./es_musement_app` via [command line terminal](https://en.wikipedia.org/wiki/Command-line_interface) and run the command:

> `npm install`

It will install all the dependencies required by this project.

  

Wait until the process ends and then execute the command:

> `npm run build`

> This command will execute the unit test and then it will build the vue.js application

  

Now you should be able to see a `./dist` folder inside the project folder.

  

If you have a web server like Apache2 or Nginx you can copy this folder inside the folder served by the server (it depends by your server configuration). More info [here](https://medium.com/@thucnc/deploy-a-vuejs-web-app-with-nginx-on-ubuntu-18-04-f93860219030).

  

Otherwise, if you just want to do a quick test of this application you can use [http-server](https://www.npmjs.com/package/http-server) to serve the application. In this case, you have to access into the ./dist folder and run the following command:

> `http-server`

> It is also possible to specify which is the port to use to serve the application by passing the argument `-p` and the port number. Example: `http-server -p 5000` will serve the application on the port 5000.

  

Now open your browser and access to the page:

> http://localhost:8080

  

You should be able to see the application.

  

### Option 2

Follow these steps if you want to build and serve this application inside a docker container.

  

Download the source code from GitHub or clone this [repository](https://github.com/Schengatto/js_challenge_enrico_schintu)

  

Access to the folder `./es_musement_app` via [command line terminal](https://en.wikipedia.org/wiki/Command-line_interface) and run the command:

> `docker build -t js-challenge-app/enrico-schintu:latest .`

> This command will create the docker image that handles the building stage (running also the unit tests) and then the dist package will be moved into a clean image which has Nginx installed.

  

Once the process is completed run the following command:

> `docker run -it -p 8080:80 --rm --name js-challenge-app js-challenge-app/enrico-schintu`

> This command will run a docker container which serves the application on port 8080. You can use a different port just changing the 8080 value declared in the -p argument.

  

Now open your browser and access to the page:

> http://localhost:8080

  

You should be able to see the application.

  

## Tests

### Unit test

To execute the unit tests written using [Jest](https://jestjs.io/) you should access to the folder `./es_musement_app` via command line terminal and run the command:

> `npm run test:unit`

> This command executes all the unit test and it will show the coverage report at the end of the process.

  

### E2E Test

To execute the e2e tests written using [Nightwatch](https://nightwatchjs.org/) you should access to the folder `./es_musement_app` via command line terminal and run the command:

> `npm run test:unit`

> This command executes all the unit test and it will show the coverage report at the end of the process.

  

## Demo

A demo of this application is available at the URL

> https://schengatto.net:4000

  

## Contacts

Feel free to contact me for any needs at

> schintu.enrico@gmail.com
