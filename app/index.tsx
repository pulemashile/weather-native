import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecastData, setHourlyForecastData] = useState([]);
  const [dailyForecastData, setDailyForecastData] = useState([]);
  const [error, setError] = useState('');

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
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeatherData(null);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const dayName = dayNames[date.getDay()];
    const isToday = date.toDateString() === today.toDateString();

    return isToday ? `Today (${dayName})` : dayName;
  };

  return (
    <View style={styles.container}>
      <Text className="text-2xl font-bold text-[#00b4d8] mb-3"  style={styles.poppinsRegular}>Weather App</Text>
      <TextInput
        className="border border-gray-300 rounded-md px-16 py-2 mb-4" style={styles.poppinsRegular}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Pressable className="bg-[#00b4d8] text-white rounded-md px-4 py-2" onPress={fetchWeather} style={styles.buttonText}>Get Weather</Pressable>

      {error && <Text style={styles.error}>{error}</Text>}

      {weatherData && (
        <View style={styles.weatherContainer} className='ml-5'>
          <Text style={styles.poppinsRegular}>{weatherData.name}, {weatherData.sys.country}</Text>
          <Text style={styles.mainTemp}>{weatherData.main.temp}°C</Text>
          <Text style={styles.poppinsRegular}>{weatherData.weather[0].description}</Text>
          <Text style={styles.poppinsRegular}>Humidity: {weatherData.main.humidity}%</Text>
          <Text style={styles.poppinsRegular}>Wind Speed: {weatherData.wind.speed} m/s</Text>

          <Text style={styles.forecastHeader}>Hourly Forecast:</Text>
          <ScrollView horizontal={true} style={styles.horizontalScroll}>
            <View style={styles.forecastContainer} className='ml-20'>
              {hourlyForecastData.map((forecast, index) => (
                <View className='border border-gray-300 rounded-md p-2 mb-4 shadow-md ' key={index} style={styles.forecastItem}>
                  <Text style={styles.poppinsRegular}>{formatDate(forecast.dt)} {new Date(forecast.dt * 1000).toLocaleTimeString()}</Text>
                  <Text style={styles.poppinsRegular}>Temp: {forecast.main.temp}°C</Text>
                  <Text style={styles.poppinsRegular}>{forecast.weather[0].description}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <Text style={styles.forecastHeader}>Daily Forecast:</Text>
          <ScrollView horizontal={true} style={styles.horizontalScroll}>
            <View style={styles.forecastContainer} className='ml-20'>
              {dailyForecastData.map((forecast, index) => (
                <View className='border border-gray-300 rounded-md p-2 mb-4 shadow-md' key={index} style={styles.forecastItem}>
                  <Text style={styles.poppinsRegular}>{formatDate(forecast.dt)} {new Date(forecast.dt * 1000).toLocaleDateString()}</Text>
                  <Text style={styles.poppinsRegular}>Temp: {forecast.main.temp}°C</Text>
                  <Text style={styles.poppinsRegular}>{forecast.weather[0].description}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
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
  buttonText: {
    padding: 15,
    color: 'white',
    backgroundColor: '#00b4d8',
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  weatherContainer: {
    alignItems: 'center',
    marginBottom: 20,
    
  },
  mainTemp: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  forecastHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  horizontalScroll: {
    marginVertical: 10,
  },
  forecastContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  forecastItem: {
    margin: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
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