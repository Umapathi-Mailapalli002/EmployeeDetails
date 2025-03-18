import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, {useEffect, useState, } from 'react';
import {Picker} from '@react-native-picker/picker';
import { fetchCities } from '../services/citiesApi';
const Page2 = () => {
  const [name, setName] = useState('');
  const [selectedCity, setSelectedCity] = useState();
  const [cities, setCities] = useState(null);
  console.log(name);
  useEffect(() => {
    const fetchData = async() => {
      const cities = await fetchCities();
      setCities(cities?.results)
      console.log(cities?.results);
    }
   fetchData();
  })
  return (
    <View style={styles.container}>
        <Text style={styles.label}>Select City:</Text>
      <View style={{borderWidth: 1, borderRadius: 10}}>
        <Picker
        dropdownIconColor={'#000 '}
          selectedValue={selectedCity}
          style={styles.picker} // Change text color here
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCity(itemValue)
          }>
            <Picker.Item label="Select City" value="Select City" />
            {
              cities?.map((city) => (
                <Picker.Item label={city.name} key={city.name} value={city.geocode} />
              ))
            }
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
        <Button title="Previous" onPress={() => alert('Previous Clicked')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={() => alert('Submit Clicked')} />
      </View>
    </View>
    </View>
  );
};

export default Page2;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 200
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
    marginTop: 40
  },
  picker: {
    color: '#000',
  },

  buttonContainer: {
    width: 130,
  },
});
