import React from 'react';
import { View, StyleSheet } from 'react-native';
import GoogleMapView from './components/GoogleMapView'; // Import the GoogleMapView component

const App = () => {
  return (
    <View style={styles.container}>
      <GoogleMapView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
