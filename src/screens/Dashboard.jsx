import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Dashboard = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Details App</Text>   

      <Text style={styles.description}>
        This app allows you to add and view employee details such as name, city, 
        and QR code data. You can easily scan a QR code to input information 
        and view saved details at any time.
      </Text>  
      <View style={styles.btnContainer}>
        <Button title="Add Details" onPress={() => navigation.navigate('AddDetails')} />
        <Button title="See Details" onPress={() => navigation.navigate('SeeDetails')} />
      </View>
      
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      },

    title: {
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 28,
      },
      description: {
        textAlign: "center",
        fontWeight: "600",
        color: "#000",
        marginBottom: 30,
        fontSize: 16,
      },
      button: {
        width: "40%",
        marginTop: 10,
      },
      btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20

    }
})