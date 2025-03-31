import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView
} from 'react-native';

const ConsultationPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Left Section with Teal Background */}
      <View style={styles.leftContainer}>
        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.heading}>
            Free consultation{' '}
            <Text style={styles.headingHighlight}>
              for today
              <View style={styles.underline} />
            </Text>
          </Text>
          
          <Text style={styles.description}>
            Hathsarthi is dedicated to excellence, combining innovation and strategy to drive success.
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Get In Touch</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Our Services</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Decorative elements bottom right */}
        <View style={styles.decorativeDots}>
          {[...Array(8)].map((_, i) => (
            <View key={i} style={styles.dot} />
          ))}
        </View>
      </View>
      
      {/* Right Section with Image */}
      <View style={styles.rightContainer}>
        <Image
          source={{ uri: 'https://consaltip.boomdevstheme.com/wp-content/uploads/2023/08/Image.png' }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 400;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    height: height * 0.6, // Reduced height to 60% of screen
  },
  leftContainer: {
    width: '50%',
    backgroundColor: '#004d40',
    padding: isSmallScreen ? 15 : 20,
    justifyContent: 'center',
    position: 'relative',
  },
  content: {
    zIndex: 1,
  },
  heading: {
    color: 'white',
    fontSize: isSmallScreen ? 22 : 28,
    fontWeight: 'bold',
    lineHeight: isSmallScreen ? 28 : 34,
    marginBottom: 15,
  },
  headingHighlight: {
    position: 'relative',
  },
  underline: {
    position: 'absolute',
    bottom: -5,
    right: 0,
    width: '50%',
    height: 3,
    backgroundColor: '#e6ee9c',
  },
  description: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: isSmallScreen ? 14 : 16,
    lineHeight: isSmallScreen ? 20 : 24,
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: '#e6ee9c',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: isSmallScreen ? 16 : 24,
  },
  primaryButtonText: {
    color: '#004d40',
    fontWeight: 'bold',
    fontSize: 14,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: isSmallScreen ? 16 : 24,
  },
  secondaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  rightContainer: {
    width: '50%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  decorativeDots: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 40,
    height: 40,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    margin: 4,
  },
});

export default ConsultationPage;