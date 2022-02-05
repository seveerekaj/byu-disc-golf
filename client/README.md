# Byu Disc Golf

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.3.

## Project Setup

### Node.js

Make sure you install the LTS version of NodeJs from their website https://nodejs.org/en/

### Angular CLI

Once you have node installed and the repository is cloned open it in your preferred editor and then run

```shell
npm install
```

Once that is finished you can follow the rest of the documentation to get it running locally.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Backend Proxy

A backend proxy has been set up that will watch for every http request to `/api` and forward the request to our backend server running at [localhost:3000](localhost:3000).  That way we can develop our backend apis at the same time as our frontend code and it will behave as if they were running on the same server and port.

#### Example
```
http.get('/api/users')
```
will forward to 
```
localhost:3000/api/users
```
