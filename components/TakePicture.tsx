import React, { useRef, useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import icon from './assets/favicon.png';

export default function TakePicture(props) {
  const { onPictureAvailable } = props;

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <View style={styles.container}>
      <Text style={{ textAlign: 'center' }}>
        We need your permission to show the camera
      </Text>
      <Button onPress={requestPermission} title="grant permission" />
    </View>
  }

  const onCameraReady = () => {
    console.log("camera ready");
  }

  const onTakePicture = async () => {
    if (cameraRef.current != null) {
      const data = await cameraRef.current.takePictureAsync();
      console.log(data);
      onPictureAvailable(data);
    }
  }

  const toggleCameraType = () => {
    setType((current) => current === CameraType.back ? CameraType.front : CameraType.back);
  }

  return (
    <Camera
      ref={cameraRef}
      style={styles.camera}
      type={type}
      onCameraReady={onCameraReady}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onTakePicture}
        >
          <Text style={styles.text}>Take Picture</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={toggleCameraType}
        >
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});