/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Button, Image, Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const PhotoUploader = () => {
  const [photo, setPhoto] = useState(null);

  const handleChoosePhoto = () => {
    ImagePicker.showImagePicker({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        const source = {uri: response.uri};
        setPhoto(source);
        uploadPhoto(response);
      }
    });
  };

  const uploadPhoto = image => {
    const data = new FormData();
    data.append('photo', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });

    axios
      .post('http://YOUR_SERVER_ENDPOINT/upload', data)
      .then(response => {
        console.log(response.data);
        Alert.alert('Success', 'Photo uploaded successfully');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Failed to upload photo');
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      {photo && (
        <Image
          source={photo}
          style={{width: 200, height: 200, marginTop: 20}}
        />
      )}
    </View>
  );
};

export default PhotoUploader;
