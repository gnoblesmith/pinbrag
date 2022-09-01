import React, { useRef, useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import icon from './assets/favicon.png';

export default function ShowPicture(props) {
  const { onTakeAnother, imageSource, onSubmit } = props;

  return (
    <View style={styles.container}>
      <Image style= {styles.image} source={imageSource} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onTakeAnother}
        >
          <Text style={styles.text}>Take Another</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={onSubmit}
        >
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex:1,
    width: undefined,
    height: undefined,
    resizeMode: 'stretch'
  },
  buttonContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 400
  },
  button: {
    backgroundColor: 'rgba(0,0,0,.5)',
    height: 50,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});