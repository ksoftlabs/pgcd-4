import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, PermissionsAndroid, TouchableOpacity, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const GoogleMapView = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 7.512186508343344,
    longitude: 80.33438155743264,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [distance, setDistance] = useState(null);
  const [mapType, setMapType] = useState('standard'); // Initialize with standard map type
  const mapViewRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    async function requestLocationPermission() {
      try {
        if (Geolocation && Geolocation.getCurrentPosition) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
                setRegion({
                  ...region,
                  latitude,
                  longitude,
                });
              },
              (error) => {
                console.error(error);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
          } else {
            console.warn('Location permission denied');
          }
        } else {
          console.warn('Geolocation or getCurrentPosition is not available.');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    requestLocationPermission();
  }, []);

  const handleZoomIn = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    });
  };

  const handleZoomOut = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (lat1 && lon1 && lat2 && lon2) {
      const R = 6371.0087714;
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    } else {
      return null;
    }
  };

  const updateDistanceAndCircle = (newLocation) => {
    const calculatedDistance = calculateDistance(
      newLocation.latitude,
      newLocation.longitude,
      7.512186508343344, // President's Girls College latitude
      80.33438155743264 // President's Girls College longitude
    );

    if (calculatedDistance !== null) {
      setDistance(calculatedDistance);
    } else {
      setDistance(null);
    }
  };

  const handleMarkerDragEnd = (e) => {
    const newLocation = e.nativeEvent.coordinate;
    setCurrentLocation(newLocation);
    updateDistanceAndCircle(newLocation);
  };

  const toggleMapType = () => {
    // Toggle between standard and hybrid map types
    if (mapType === 'standard') {
      setMapType('hybrid');
    } else {
      setMapType('standard');
    }
  };

  // Call the updateDistanceAndCircle function when the component mounts
  useEffect(() => {
    if (currentLocation) {
      updateDistanceAndCircle(currentLocation);
    }
  }, [currentLocation]);


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        onRegionChange={(newRegion) => setRegion(newRegion)}
        ref={mapViewRef}
        showsUserLocation={true}
        mapType={mapType} // Set the map type here
      >
        {currentLocation && (
          <>
            <Marker
              coordinate={currentLocation}
              title="My Location"
              description="This is my current location"
              draggable
              onDragEnd={handleMarkerDragEnd}
              ref={markerRef}
            />
            <Marker
              coordinate={{
                latitude: 7.512186508343344, // President's Girls College latitude
                longitude: 80.33438155743264, // President's Girls College longitude
              }}
              title="President's Girls College"
              description="Location of the President's Girls College"
            />
            {distance !== null && (
              <Circle
                center={{
                  latitude: 7.512186508343344, // President's Girls College latitude
                  longitude: 80.33438155743264, // President's Girls College longitude
                }}
                radius={distance * 1000} // Convert to meters
                strokeColor="rgba(0, 0, 255, 0.5)"
                fillColor="rgba(0, 0, 255, 0.2)"
              />
            )}
          </>
        )}
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleZoomIn}>
          <Text>Zoom In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleZoomOut}>
          <Text>Zoom Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleMapType}>
          <Text>Toggle Map Type</Text>
        </TouchableOpacity>
      </View>

      {distance !== null && (
        <View style={styles.distanceContainer}>
          <Text>Distance to President's Girls College:</Text>
          <Text>{distance.toFixed(5)} km</Text>
        </View>
      )}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  distanceContainer: {
    position: 'absolute',
    bottom: 70,
    left: 16,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 5,
  },
});

export default GoogleMapView;
