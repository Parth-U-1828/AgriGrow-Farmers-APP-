import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Text
} from 'react-native';

const images = [
  "https://www.myscheme.gov.in/_next/image?url=https%3A%2F%2Fcdn.myscheme.in%2Fimages%2Fslideshow%2F1-full.webp&w=1920&q=75",
  "https://www.myscheme.gov.in/_next/image?url=https%3A%2F%2Fcdn.myscheme.in%2Fimages%2Fslideshow%2F2-full.webp&w=1920&q=75",
  "https://www.myscheme.gov.in/_next/image?url=https%3A%2F%2Fcdn.myscheme.in%2Fimages%2Fslideshow%2F3-full.webp&w=1920&q=75"
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    goToSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    goToSlide(newIndex);
  };

  const goToSlide = (index) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      flatListRef.current?.scrollToIndex({ index, animated: false });
      setCurrentIndex(index);
      fadeAnim.setValue(1);
    });
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image 
        source={{ uri: item }} 
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } }}],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        style={{ opacity: fadeAnim }}
      />

      {/* Navigation Buttons */}
      <TouchableOpacity style={[styles.navButton, styles.leftButton]} onPress={prevSlide}>
        <Text style={styles.arrow}>{'<'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.navButton, styles.rightButton]} onPress={nextSlide}>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot
            ]}
            onPress={() => goToSlide(index)}
          />
        ))}
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const carouselHeight = width * 0.5; // Adjust height ratio as needed

const styles = StyleSheet.create({
  container: {
    height: carouselHeight,
    width: '100%',
    position: 'relative',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  slide: {
    width: width,
    height: carouselHeight,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  arrow: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  leftButton: {
    left: 10,
  },
  rightButton: {
    right: 10,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 12,
  },
});

export default Carousel;