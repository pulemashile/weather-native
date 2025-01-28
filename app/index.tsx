import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    const API_KEY = 'fee4a8521008cfaa15374d867377664e'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError('');
      setIsModalVisible(true); 
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeatherData(null);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setWeatherData(null); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={fetchWeather} />

      {error && <Text style={styles.error}>{error}</Text>}

      {/* Modal to show weather details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {weatherData && (
              <>
                <Text style={styles.city}>{weatherData.name}, {weatherData.sys.country}</Text>
                <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
                <Text style={styles.description}>{weatherData.weather[0].description}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ff6347',
  },
  description: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
