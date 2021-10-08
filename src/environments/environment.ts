// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url_api: "http://127.0.0.1:8000/api/",
  firebaseConfig : {
    apiKey: "AIzaSyD_N0pwDl6XUwEnyIMoB3HYFfIjiJiaS9o",
    databaseURL :'https://axial-serenity-322216-default-rtdb.firebaseio.com/',
    authDomain: "axial-serenity-322216.firebaseapp.com",
    projectId: "axial-serenity-322216",
    storageBucket: "axial-serenity-322216.appspot.com",
    messagingSenderId: "993407506844",
    appId: "1:993407506844:web:134e10fbd090da6e595059",
    measurementId: "G-5914DHHX30"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
