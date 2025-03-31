import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
  SafeAreaView
} from 'react-native';

const carouselSlides = [
  {
    heading: "Business Growth",
    description: "Expert strategies for rapid success",
    imageSrc: "https://consaltip.boomdevstheme.com/wp-content/uploads/2023/07/slider_img_2.png",
  },
  {
    heading: "Strategic Consulting",
    description: "Drive long-term business success",
    imageSrc: "https://consaltip.boomdevstheme.com/wp-content/uploads/2023/07/slider_img.png",
  },
  {
    heading: "Transform Challenges",
    description: "Turn obstacles into opportunities",
    imageSrc: "https://consaltip.boomdevstheme.com/wp-content/uploads/2023/07/slider_img_4.png",
  }
];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CONTENT_HEIGHT = screenHeight * 0.55; // Reduced height for mobile

const HeroSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = carouselSlides.length;
  const scrollViewRef = useRef(null);
  const scrollX = new Animated.Value(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextStep = (activeStep + 1) % maxSteps;
      setActiveStep(nextStep);
      scrollViewRef.current?.scrollTo({ x: nextStep * screenWidth, animated: true });
    }, 5000);
    return () => clearInterval(timer);
  }, [activeStep, maxSteps]);

  const handleNext = () => {
    const nextStep = (activeStep + 1) % maxSteps;
    setActiveStep(nextStep);
    scrollViewRef.current?.scrollTo({ x: nextStep * screenWidth, animated: true });
  };

  const handleBack = () => {
    const prevStep = (activeStep - 1 + maxSteps) % maxSteps;
    setActiveStep(prevStep);
    scrollViewRef.current?.scrollTo({ x: prevStep * screenWidth, animated: true });
  };

  const position = Animated.divide(scrollX, screenWidth);

  return (
    <SafeAreaView style={styles.container}>
      {/* Compact Navigation */}
      <View style={styles.navBar}>
        <Image
          source={{ uri: 'https://i.ibb.co/wZsffbqW/erasebg-transformed-1.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.dashboardButton}>
          <Text style={styles.dashboardButtonText}>Dashboard</Text>
        </TouchableOpacity>
      </View>

      {/* Optimized Carousel */}
      <View style={styles.carouselWrapper}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {carouselSlides.map((slide, index) => (
            <View key={index} style={[styles.slide, { width: screenWidth }]}>
              <View style={styles.slideContent}>
                <View style={styles.textContent}>
                  <Text style={styles.heading}>{slide.heading}</Text>
                  <Text style={styles.description}>{slide.description}</Text>
                  
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.primaryButton}>
                      <Text style={styles.primaryButtonText}>Get Started</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton}>
                      <Text style={styles.secondaryButtonText}>Services</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.imageBox}>
                  <Image
                    source={{ uri: slide.imageSrc }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Navigation Controls */}
        <TouchableOpacity onPress={handleBack} style={[styles.navButton, { left: 10 }]}>
          <Text style={styles.navIcon}>‹</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleNext} style={[styles.navButton, { right: 10 }]}>
          <Text style={styles.navIcon}>›</Text>
        </TouchableOpacity>
        
        {/* Indicators */}
        <View style={styles.indicatorContainer}>
          {carouselSlides.map((_, i) => {
            const opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp'
            });
            
            return (
              <Animated.View
                key={i}
                style={[styles.indicator, { opacity }]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#004d4d',
    height: CONTENT_HEIGHT,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
    height: 60,
  },
  logo: {
    width: 120,
    height: 30,
  },
  dashboardButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  dashboardButtonText: {
    color: '#004d4d',
    fontWeight: 'bold',
    fontSize: 12,
  },
  carouselWrapper: {
    flex: 1,
    position: 'relative',
  },
  slide: {
    height: CONTENT_HEIGHT - 60, // Account for nav bar
  },
  slideContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  textContent: {
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 28,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: '#d6ff80',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    minWidth: 100,
  },
  primaryButtonText: {
    color: '#004d4d',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 100,
  },
  secondaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  imageBox: {
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 160,
    height: 160,
  },
  navButton: {
    position: 'absolute',
    top: '35%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    color: 'white',
    fontSize: 24,
    lineHeight: 24,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
});

export default HeroSection;