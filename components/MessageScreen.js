import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MessageScreen = ({ onOKPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Disclaimer
      </Text>
      <Text style={styles.disclaimer}>
        The distance calculated in this app may differ from the actual
        distance due to inaccuracies in GPS and online maps. It should be used
        for reference purposes only. The author of the application does not
        guarantee its accuracy and is not responsible for any issues arising
        from the information generated using the app.
      </Text>
      <TouchableOpacity onPress={onOKPress} style={styles.button}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
  disclaimer: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MessageScreen;
