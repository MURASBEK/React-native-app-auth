import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import Animated, { 
  FadeIn, 
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { User } from '../types/user';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function ProfileScreen() {
  const { user, loading, error, logout } = useAuth();
  const scale = useSharedValue(1);

  const handleLogout = async () => {
    await logout();
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6c63ff" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Bir hata oluştu. Lütfen tekrar deneyin.</Text>
      </View>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInUp.duration(1000)}
          style={styles.header}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name.firstname[0].toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.name}>{user.name.firstname} {user.name.lastname}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.duration(800).delay(200)}
          style={styles.card}
        >
          <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Kullanıcı Adı</Text>
              <Text style={styles.infoValue}>{user.username}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>E-posta</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Telefon</Text>
              <Text style={styles.infoValue}>{user.phone}</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.duration(800).delay(400)}
          style={styles.card}
        >
          <Text style={styles.sectionTitle}>Adres Bilgileri</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Şehir</Text>
              <Text style={styles.infoValue}>{user.address.city}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Sokak</Text>
              <Text style={styles.infoValue}>{user.address.street}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Posta Kodu</Text>
              <Text style={styles.infoValue}>{user.address.zipcode}</Text>
            </View>
          </View>
        </Animated.View>

        <AnimatedTouchableOpacity
          style={[styles.logoutButton, buttonStyle]}
          onPress={handleLogout}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </AnimatedTouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1f36',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1f36',
  },
  loadingText: {
    color: '#6c63ff',
    fontSize: 16,
    fontFamily: 'PoppinsMedium',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1f36',
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 16,
    fontFamily: 'PoppinsMedium',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#6c63ff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#6c63ff',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  avatarText: {
    fontSize: 52,
    color: 'white',
    fontFamily: 'PoppinsBold',
  },
  name: {
    fontSize: 32,
    fontFamily: 'PoppinsSemiBold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(108, 99, 255, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  email: {
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'PoppinsSemiBold',
    color: 'white',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  infoLabel: {
    fontSize: 15,
    fontFamily: 'PoppinsMedium',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  infoValue: {
    fontSize: 15,
    fontFamily: 'PoppinsRegular',
    color: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    elevation: 8,
    shadowColor: '#ff4d4d',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'PoppinsSemiBold',
    letterSpacing: 0.5,
  },
});
