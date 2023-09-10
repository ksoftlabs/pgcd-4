import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import GoogleMapView from './components/GoogleMapView'; // Import the GoogleMapView component
import MessageScreen from './components/MessageScreen'; // Import the MessageScreen component

const App = () => {
  const [showMessage, setShowMessage] = useState(true); // State to control the visibility of the message screen

  const handleOKPress = () => {
    setShowMessage(false); // Hide the message screen when OK is pressed
  };

  return (
    <View style={styles.container}>
      {showMessage ? (
        // Display the message screen when showMessage is true
        <MessageScreen onOKPress={handleOKPress} />
      ) : (
        // Display the GoogleMapView when showMessage is false
        <GoogleMapView />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
