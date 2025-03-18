import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchCities} from '../services/citiesApi';
import {useNavigation, useRoute} from '@react-navigation/native';
const Page2 = () => {
  const [name, setName] = useState('');
  const [selectedCity, setSelectedCity] = useState();
  const [cities, setCities] = useState(null);
  const navigation = useNavigation();
  const router = useRoute();
  const {state} = router.params || {};
  useEffect(() => {
    const fetchData = async () => {
      const cities = await fetchCities();
      setCities(cities?.results);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const newData = {
        qr_id: state,
        name: name,
        city: selectedCity,
      };
  
      const storedData = await AsyncStorage.getItem('Emp_details');
      let Emp_details = storedData ? JSON.parse(storedData) : [];
  
      Emp_details.push(newData);
  
      await AsyncStorage.setItem('Emp_details', JSON.stringify(Emp_details));
  
      navigation.navigate('Dashboard')      
    } catch (error) {
      console.error('Error saving Employee details:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select City:</Text>
      <View style={{borderWidth: 1, borderRadius: 10}}>
        <Picker
          dropdownIconColor={'#000 '}
          selectedValue={selectedCity}
          style={styles.picker}
          onValueChange={itemValue => setSelectedCity(itemValue)}>
          <Picker.Item label="Select City" value="Select City" />
          {cities?.map(city => (
            <Picker.Item label={city.name} key={city.geoname_id} value={city.name} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Enter Your Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        placeholderTextColor={'#000'}
        value={name}
        onChangeText={setName}
      />
      <View style={styles.btnsContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Previous" onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
};

export default Page2;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 200,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  picker: {
    color: '#000',
  },

  buttonContainer: {
    width: 130,
  },
});
