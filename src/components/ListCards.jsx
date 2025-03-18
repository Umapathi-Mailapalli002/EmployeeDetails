import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchCityWeather } from '../services/openWeatherApi';

const ListCards = ({ data }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
          const weather = await fetchCityWeather(data.city)
        
        setWeatherData({
          temperature: weather.main.temp,
          latitude: weather.coord.lat,
          longitude: weather.coord.lon,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false); 
      }
    };
    setTimeout(() => {
      fetchWeather();
    },2000)
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.qrId}>QR ID: {data.qr_id}</Text>
        <Text style={styles.cityName}>Name: {data.name}</Text>
        <Text style={styles.cityDetails}>City: {data.city}</Text>

        {/* Weather Section */}
        <Text style={styles.weatherHeading}>Weather</Text>
        <View style={styles.weatherContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#007BFF" />
          ) : (
            <>
              <Text style={styles.weather}>
                Temperature: {weatherData?.temperature ?? "N/A"}°C
              </Text>
              <Text style={styles.latitude}>
                Latitude: {weatherData?.latitude ?? "N/A"}
              </Text>
              <Text style={styles.longitude}>
                Longitude: {weatherData?.longitude ?? "N/A"}
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ListCards;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  qrId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cityName: {
    fontSize: 16,
    marginTop: 5,
  },
  cityDetails: {
    fontSize: 16,
    marginBottom: 10,
  },
  weatherHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  weatherContainer: {
    marginTop: 5,
    paddingLeft: 10,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  weather: {
    fontSize: 16,
  },
  latitude: {
    fontSize: 16,
  },
  longitude: {
    fontSize: 16,
  },
});
