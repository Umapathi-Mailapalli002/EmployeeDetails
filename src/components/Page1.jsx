import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import Qr from '../assets/qr.png';
import { useNavigation } from '@react-navigation/native';
const Page1 = () => {
  const navigation = useNavigation();
  const [ScannedData, setScannedData] = useState('');
  const [cameraShown, setCameraShown] = useState(false);
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes.length > 0) {
        if (codes[0].value) {
          setTimeout(() => setScannedData(codes[0]?.value), 500);
          console.log(ScannedData);
          setCameraShown(false)
        }
      }
      return;
    },
  });
  // useEffect(() => {
  //   (async () => {
  //     if (!hasPermission) {
  //       await requestPermission();
  //     }
  //   })();
  //   console.log(hasPermission);
  // }, [hasPermission]);
  if (device == null) return <ActivityIndicator size="large" color="blue" />;

  if (!hasPermission) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.permissionText}>Camera permission is required</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
    {cameraShown ? (
      <Camera
        codeScanner={codeScanner}
        style={styles.cameraStyle}
        device={device}
        isActive={cameraShown}
      />
    ) : (
      <Image style={styles.qrImage} source={Qr} />
    )}
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={() => {
            setScannedData(''); // Reset scanned data
            setCameraShown(true);
          }} style={styles.btn}>
          <Text style={styles.btnText}>{ScannedData.trim() === '' ? 'Scan' : 'Scan Again'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Page2')} 
        // disabled={ScannedData.trim() === '' ? true : false}
        style={styles.btn}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 24,
    color: 'red',
    marginBottom: 20,
  },
  cameraStyle: {
    height: 400,
    width: 380,
    marginTop: 120,
  },
  qrImage: {
    height: 380,
    width: 380,
    marginTop: 120,
  },
  btn: {
    padding: 10,
    borderRadius: 10,
    width:150,
    backgroundColor: '#4d94ff',
    display: 'flex',
    flex: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    gap: 50,
  },
});
