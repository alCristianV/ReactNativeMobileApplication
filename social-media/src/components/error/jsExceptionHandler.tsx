import { setJSExceptionHandler } from 'react-native-exception-handler';

setJSExceptionHandler((error, isFatal) => {
  // This is your custom global error handler
  // You do stuff like show an error dialog
  // or hit google analytics to track crashes
  // or hit a custom api to inform the dev team.
  console.log(error, isFatal);
});
