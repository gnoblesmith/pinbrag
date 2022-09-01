import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import TakePicture from './components/TakePicture';
import ShowPicture from './components/ShowPicture';
import { S3 } from 'aws-sdk';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [imageSource, setImageSource] = useState();

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

  const onPictureAvailable = (data) => {
    console.log(data);
    setImageSource(data);
  }

  const onTakeAnother = () => {
    setImageSource(null);
  }

  const onSubmit = async () => {
    if (imageSource != null) {
      const s3Bucket = new S3({
        accessKeyId: 'AKIAXVX3XNUFCGHIAU6G',
        secretAccessKey: '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'
      });

      let picture = await fetch(imageSource.uri);
      picture = await picture.blob();
      const imageData = new File([picture], `my_image.jpg`);

      let uploadParams = {Bucket: 'pinbrag-images-test', Key: 'my_image.jpg', Body: imageData};
      s3Bucket.upload(uploadParams, (err, data) => {
        if (err) {
          console.log("Error", err);
        }
        if (data) {
          console.log("success", data.Location);
        }
      });
    }
  }

  return (
    <View style={styles.container}>
      { !imageSource ?
        <TakePicture onPictureAvailable={onPictureAvailable}/> :
        <ShowPicture
          onTakeAnother={onTakeAnother}
          imageSource={imageSource}
          onSubmit={onSubmit}
        />
      }
    </View>
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