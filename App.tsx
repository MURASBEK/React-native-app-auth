import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/hooks/useAuth';
import { AppNavigator } from './src/navigation/AppNavigator';
import { 
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import 'react-native-reanimated';
import { View, ActivityIndicator } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsMedium: Poppins_500Medium,
    PoppinsSemiBold: Poppins_600SemiBold,
    PoppinsBold: Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
