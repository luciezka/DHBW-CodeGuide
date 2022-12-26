ng # Exmatrikulator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory, this is needed if you want to use Service Worker.


## Enable Service Worker in testmode

To use Service Workers in test mode you will have to change the `production` Variable to true in src/environments/environment.ts
further changing the Code will cause the Service Worker to keep updating and it can get stuck in a loop.

Remove the Service Worker in the Developer Tools under Application and Unsubscribe under the Service Worker Tab. 
Changes in Code with an installed Service Worker can cause Problems with the cache, so after building please clean the Data in LocalStorage
