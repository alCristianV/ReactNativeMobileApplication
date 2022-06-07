import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { StyleSheet, Text, View } from 'react-native';

const myErrorHandler = (error: Error) => {
  // Do something with the error
  // E.g. reporting errorr using sentry ( see part 3)
  console.log(error);
};
function ErrorFallback() {
  return (
    <View style={[styles.container]}>
      <View>
        <Text> Something went wrong </Text>
      </View>
    </View>
  );
}
export const ErrorHandler = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {children}
  </ErrorBoundary>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 12,
  },
});
