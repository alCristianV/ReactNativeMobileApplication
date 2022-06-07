import { setNativeExceptionHandler } from 'react-native-exception-handler';

const exceptionhandler = (exceptionString: string) => {
  console.log(exceptionString);
};
setNativeExceptionHandler(exceptionhandler, false, true);
