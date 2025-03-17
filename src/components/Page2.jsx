import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
const Page2 = () => {
  const [name, setName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState();
  console.log(name);
  return (
    <View style={styles.container}>
        <Text style={styles.label}>Select City:</Text>
      <View style={{borderWidth: 1, borderRadius: 10}}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Select City" value="Select City" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
      <Text style={styles.label}>Enter Your Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
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
  buttonContainer: {
    width: 130,
  },
});
