import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient';

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();

  const handleLogin = async () => {
    await login(username, password);
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>A</Text>
            </View>
            <Text style={styles.appName}>Auth App</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Tekrar Hoşgeldiniz!</Text>
            <Text style={styles.subtitle}>Devam etmek için giriş yapın</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Kullanıcı Adı</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Kullanıcı adınızı girin"
                  placeholderTextColor="#a0aec0"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Şifre</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Şifrenizi girin"
                  placeholderTextColor="#a0aec0"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, (!username || !password) && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={!username || !password || loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.loginButtonText}>Giriş Yap</Text>
              )}
            </TouchableOpacity>

            <View style={styles.testAccountContainer}>
              <Text style={styles.testAccountTitle}>Test Hesabı</Text>
              <View style={styles.testAccountDetails}>
                <Text style={styles.testAccountText}>Kullanıcı Adı: johnd</Text>
                <Text style={styles.testAccountText}>Şifre: m38rmF$</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  logoText: {
    color: 'white',
    fontSize: 48,
    fontFamily: 'PoppinsBold',
  },
  appName: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'PoppinsBold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'PoppinsSemiBold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'PoppinsMedium',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: 'white',
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonDisabled: {
    backgroundColor: 'rgba(76, 175, 80, 0.5)',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'PoppinsSemiBold',
  },
  testAccountContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  testAccountTitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'PoppinsSemiBold',
    textAlign: 'center',
    marginBottom: 12,
  },
  testAccountDetails: {
    alignItems: 'center',
  },
  testAccountText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'PoppinsRegular',
    marginBottom: 4,
  },
});
