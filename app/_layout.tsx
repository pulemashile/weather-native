import { View, Text } from 'react-native'
import React from 'react'
import { Stack,SplashScreen } from 'expo-router'
import "../global.css";
import {useFonts} from 'expo-font'
import { useEffect } from "react";


export default function RootLayout() {
 
  const [loaded,error]=useFonts({
    poppinsRegular: require("@/assets/fonts/Poppins/Poppins-Regular.ttf"),
    poppinsMedium: require("@/assets/fonts/Poppins/Poppins-Medium.ttf"),
    poppinsSemiBold: require("@/assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    poppinsBold: require("@/assets/fonts/Poppins/Poppins-Bold.ttf"),
    poppinsExtraBold: require("@/assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    poppinsBlack: require("@/assets/fonts/Poppins/Poppins-Black.ttf"),
    poppinsExtraLight: require("@/assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    poppinsitalic: require("@/assets/fonts/Poppins/Poppins-Italic.ttf"),
    poppinsBoldItalic: require("@/assets/fonts/Poppins/Poppins-BoldItalic.ttf"),
    
  })
  useEffect(()=>{
    if(!loaded || error){
      SplashScreen.hideAsync()
    }
    },[loaded,error])
  
    if(!loaded && !error){
      return null
    }

  return <Stack />;
}