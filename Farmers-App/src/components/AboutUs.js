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

const AboutUsSection = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://i.ibb.co/HTP8SX0j/7000961.jpg' }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>
              The story behind our consulting firm
            </Text>
            <View style={styles.underline}></View>
          </View>
          
          <Text style={styles.description}>
            HathSarthi with a focus on elegant and structured design. Strong elements contribute to balance and ease, while seamless integration ensures smooth functionality.
          </Text>
          
          {/* Stats Row */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10+</Text>
              <Text style={styles.statLabel}>Companies helped</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>30+</Text>
              <Text style={styles.statLabel}>Team members</Text>
            </View>
          </View>
          
          {/* Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get In Touch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 30,
  },
  contentContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1.2,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 25,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    width: '100%',
  },
  headingContainer: {
    marginBottom: 25,
  },
  heading: {
    color: '#000',
    fontWeight: '700',
    fontSize: isSmallScreen ? 24 : 28,
    lineHeight: isSmallScreen ? 30 : 36,
    marginBottom: 15,
  },
  underline: {
    width: 80,
    height: 4,
    backgroundColor: '#004d4d',
  },
  description: {
    color: '#666',
    fontSize: isSmallScreen ? 14 : 16,
    lineHeight: isSmallScreen ? 20 : 24,
    marginBottom: 25,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    width: '70%',
  },
  statItem: {
    marginRight: 20,
  },
  statNumber: {
    color: '#000',
    fontWeight: '700',
    fontSize: isSmallScreen ? 28 : 32,
    lineHeight: isSmallScreen ? 32 : 36,
  },
  statLabel: {
    color: '#666',
    fontSize: isSmallScreen ? 12 : 14,
  },
  button: {
    backgroundColor: '#d6ff80',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#004d4d',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default AboutUsSection;