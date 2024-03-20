
# Getting Started with dollarRate-task

Presentation of the dollar exchange rate data .

## `server side`

***create a docker container***

 ```docker run -dt --name node_server -p 8080:8080  -v ${PWD}:/app node```

### install node

```npm i install```

### open terminal to run node

```node fileName```

## create db

***create a docker container***

```docker run --name mongodb -d -p 27017:27017 -v ${PWD}:/app mongodb/mongodb-community-server:6.0-ubi8```

***find the IpAdres***

```docker inspect "containerId"```  

## client side

***create a docker container***

```docker run -dt --name react_client -p 3000:3000  -v ${PWD}:/app node```

### `start working`

dwonload node_modules with ```npm install```

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser .

The page will reload when you make changes.
