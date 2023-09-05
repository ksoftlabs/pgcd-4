import React, { useState, useEffect } from 'react';
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service'; // Import Geolocation

const GoogleMapView = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Request permission to access location (for Android)
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission granted, get current location
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({ latitude, longitude });
            },
            (error) => {
              console.error(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          console.warn('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    // Call the permission request function
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 7.512186508343344, // Replace with your desired initial latitude
          longitude: 80.33438155743264, // Replace with your desired initial longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="My Location"
            description="This is my current location"
          />
        )}
        <Marker
            coordinate={{
              latitude: 7.512186508343344,
              longitude: 80.33438155743264,
            }}
            title="President's Girls College"
            description="Location of the President's Girls College"
          />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default GoogleMapView;
