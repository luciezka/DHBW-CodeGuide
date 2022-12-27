## How to properly run :
You have to build the Server and run it from a Client as a propper server.
Another way is to run the server in Development mode using `ng serve`, currently the setting enable it in dev mode but by changing code the Service worker will need some time and reloading the page might take up to a minute with continuous reloading.

Make sure there are no Service Worker installed on your localhost prior to testing 


ng # Exmatrikulator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory, this is needed if you want to use Service Worker.


## Enable Service Worker in Development server

To use Service Workers in test mode you will have to change the `production` Variable to true in src/environments/environment.ts
further changing the Code will cause the Service Worker to keep updating and it can get stuck in a loop.

Remove the Service Worker in the Developer Tools under Application and Unsubscribe under the Service Worker Tab. 
Changes in Code with an installed Service Worker can cause Problems with the cache, so after building please clean the Data in LocalStorage and unregister the Service worker,

Without Service Worker certain Cache Funktions are not able to start and the Frontpage wont be able to display 

## Test as mobile app

Test on device:
Download: https://dl.google.com/android/repository/platform-tools-latest-windows.zip

1. Extract folder
2. Open CMD inside of folder
3. Connect phone via USB
4. Run `adb reverse tcp:4200 tcp:4200` in CMD
5. Make sure that the server is running
6. Navigate to `http://localhost:4200/` on the mobile device

Test in browser:
1. Open developer tools
2. Enable mobile mode (Toggle device toolbar)
