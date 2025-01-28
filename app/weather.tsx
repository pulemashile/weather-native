// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import axios from 'axios';
// import { useSearchParams } from 'expo-router';
// // import { useSearchParams } from 'expo-router';

// const WeatherDetails = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const { city } = useSearchParams(); 
//   console.log("city: ",city); // Get the city from the query parameter

//   useEffect(() => {
//     if (!city) return;

//     const fetchWeather = async () => {
//       const API_KEY = 'fee4a8521008cfaa15374d867377664e'; // Replace with your OpenWeatherMap API key
//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

//       try {
//         console.log('Fetching weather data...', url);
//         const response = await axios.get(url);
//         console.log('Fetched weather data:', response.data);
//         setWeatherData(response.data);
//       } catch (err) {
//         console.error('Error fetching weather data:', err);
//       }
//     };

//     fetchWeather();
//   }, [city]);

//   if (!weatherData) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.city}>{weatherData.name}, {weatherData.sys.country}</Text>
//       <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
//       <Text style={styles.description}>{weatherData.weather[0].description}</Text>
//       <Button title="Back to Home" onPress={() => router.push('/')} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   city: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   temp: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     color: '#ff6347',
//   },
//   description: {
//     fontSize: 16,
//     textTransform: 'capitalize',
//   },
// });

// export default WeatherDetails;
