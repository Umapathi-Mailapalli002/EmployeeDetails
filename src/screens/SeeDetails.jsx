import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListCards from '../components/ListCards';

const SeeDetails = () => {
  const [empDetails, setEmpDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('Emp_details');
        if (storedData) {
          setEmpDetails(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error fetching Employee details:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Employee Details</Text>

      {empDetails.length === 0 ? (
        <Text style={styles.noData}>No details available</Text>
      ) : (
        <FlatList
          data={empDetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ListCards data={item} />}
        />
      )}
    </View>
  );
};

export default SeeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  noData: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 20,
  },
});
