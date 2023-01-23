## Description

MotorBike Shop API (tiny DDD) 😎.
https://motorbike-shop-api-ddd.onrender.com/

<table>
  <tr>
    <td valign="center">
      <h4>Tools</h4>
      <ul list-style-type="none">
        <li>
          <img align="center" src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="drawing" width="30"/> Node.js (Typescript)
        </li>
        <br/>
        <li>
          <img align="center" src="https://img.icons8.com/ios7/600/000000/express-js.png" alt="drawing" width="30"/> Express
        </li>
        <br/>
        <li>
          <img align="center" src="https://www.svgviewer.dev/static-svgs/34566/mongodb.svg" alt="drawing" width="30"/> MongoDB
        </li>
        <br/>
        <li>
          <img align="center" src="https://cdn-icons-png.flaticon.com/512/919/919853.png" alt="drawing" width="30"/> Docker
        </li>
        <br/>
        <li>
          <img align="center" src="https://www.jetbrains.com/webstorm/guide/static/5fffc5841d0abba2e6684f13fe6d003f/jest.svg" alt="drawing" width="30"/> Jest
        </li>
        <br/>
      </ul>
    </td>
  </tr>
</table>

## Requirements

```
Node.js --> min v14.0.0 (v14.21.1-lts/fermium recommended)
docker-compose --> to create DDBB instance (test and dev)
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# Makefile option
$ make start

# Or
$ npm run up:mongo # to up Docker with Mongo (docker-compose necessary)
$ npm run dev:cms:backend
```

## Test

```bash
# Makefile option
$ make test # Run all tests

# Or
$ npm run up:mongo # follow we can use whatever of the below commands

    # all tests
    $ npm run test

    # unit tests
    $ npm run test:unit

    # features e2e (cucumber)
    $ npm run test:features

    # integration (infrastructure)
    $ npm run test:integration
```

## Deploy

```bash
$ npm run deploy
```

## TODO Improves

<ol>
  <li>Register events in app using domain events. We follow DDD but we need to create DomainEvent classes, domain event bus and register events in the domain.</li>
  <li>Implement CQRS (eventBus and queryBus) to avoid instantiate ValueObjects outside the context. Commands and Queries will be a handler and middleware between external app (Express.js API) and bounded context.</li>
  <li>Generate cursors in search to increase performance when data stored would grow</li>
  ...
</ol>
