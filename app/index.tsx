import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecastData, setHourlyForecastData] = useState([]);
  const [dailyForecastData, setDailyForecastData] = useState([]);
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    const API_KEY = 'fee4a8521008cfaa15374d867377664e'; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const weatherResponse = await axios.get(weatherUrl);
      const { coord } = weatherResponse.data;
      setWeatherData(weatherResponse.data);
      setError('');

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}&units=metric`;
      const forecastResponse = await axios.get(forecastUrl);
      const forecastData = forecastResponse.data.list;

      // Extract hourly forecast for the next 24 hours (5 entries)
      const hourlyForecast = forecastData.filter((item, index) => index < 5);

      // Extract daily forecast (1 entry per day for the next 5 days)
      const dailyForecast = forecastData.filter((item, index) => index % 8 === 0).slice(0, 5);

      setHourlyForecastData(hourlyForecast);
      setDailyForecastData(dailyForecast);

      setIsModalVisible(true); 
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeatherData(null);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setWeatherData(null); 
    setHourlyForecastData([]);
    setDailyForecastData([]);
  };

  return (
    <View className='flex flex-col justify-center items-center'>
      <Text className='text-2xl font-bold mb-4' style={styles.poppinsRegular}>Weather App</Text>
      <TextInput
        style={styles.poppinsRegular}
        className='border border-gray-300 rounded-md p-2 mb-4 w-full'
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Pressable className="bg-blue-500 text-white rounded-md px-4 py-2" onPress={fetchWeather} style={styles.poppinsRegular}>Get Weather</Pressable>

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
                <Text style={styles.poppinsRegular}>{weatherData.name}, {weatherData.sys.country}</Text>
                <Text className='text-2xl font-bold' style={styles.poppinsRegular}>{weatherData.main.temp}°C</Text>
                <Text style={styles.poppinsRegular}>{weatherData.weather[0].description}</Text>
                <Text style={styles.poppinsRegular}>Humidity: {weatherData.main.humidity}%</Text>
                <Text style={styles.poppinsRegular}>Wind Speed: {weatherData.wind.speed} m/s</Text>
                
                <Text style={styles.poppinsRegular}>Hourly Forecast:</Text>
                <ScrollView horizontal={true}>
                  <View style={styles.forecastContainer}>
                    {hourlyForecastData.map((forecast, index) => (
                      <View className='border border-gray-300 rounded-md p-2 mb-4 ' key={index} style={styles.forecastItem}>
                        <Text style={styles.poppinsRegular}>{new Date(forecast.dt * 1000).toLocaleString()}</Text>
                        <Text style={styles.poppinsRegular}>Temp: {forecast.main.temp}°C</Text>
                        <Text style={styles.poppinsRegular}>{forecast.weather[0].description}</Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>

                <Text style={styles.poppinsRegular}>Daily Forecast:</Text>
                <ScrollView horizontal={true}>
                  <View style={styles.forecastContainer}>
                    {dailyForecastData.map((forecast, index) => (
                      <View className='border border-gray-300 rounded-md p-2 mb-4 ' key={index} style={styles.forecastItem}>
                        <Text style={styles.poppinsRegular}>{new Date(forecast.dt * 1000).toLocaleDateString()}</Text>
                        <Text style={styles.poppinsRegular}>Temp: {forecast.main.temp}°C</Text>
                        <Text style={styles.poppinsRegular}>{forecast.weather[0].description}</Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>

                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text className="w-full bg-blue-500 text-white rounded-md px-4 py-2" style={styles.poppinsRegular}>Close</Text>
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
    width: 400,
    padding: 60,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  forecastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
    padding: 10,
    width: 300,
  },
  forecastItem: {
    margin: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
  poppinsRegular: {
    fontFamily: 'poppinsRegular',
  },
  poppinsBold: {
    fontFamily: 'poppinsBold',
  },
  poppinsMedium: {
    fontFamily: 'poppinsMedium',
  },
  poppinsSemiBold: {
    fontFamily: 'poppinsSemiBold',
  },
  poppinsExtraBold: {
    fontFamily: 'poppinsExtraBold',
  },
});

export default App;