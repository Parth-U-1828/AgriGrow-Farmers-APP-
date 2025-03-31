import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const SchemesPage = () => {
  const categories = [
    {
      id: 1,
      icon: "🌱",
      schemes: 422,
      title: "Agriculture, Rural & Environment"
    },
    {
      id: 2,
      icon: "🏦",
      schemes: 216,
      title: "Financial Services and Insurance"
    },
    {
      id: 3,
      icon: "🤝",
      schemes: 491,
      title: "Business & Entrepreneurship"
    },
    {
      id: 4,
      icon: "🎓",
      schemes: 792,
      title: "Education & Learning"
    },
    {
      id: 5,
      icon: "➕",
      schemes: 220,
      title: "Health & Wellness"
    },
    {
      id: 6,
      icon: "🏠",
      schemes: 92,
      title: "Housing & Shelter"
    },
    {
      id: 7,
      icon: "⚖️",
      schemes: 9,
      title: "Public Safety, Law & Justice"
    },
    {
      id: 8,
      icon: "🔬",
      schemes: 64,
      title: "Science, IT & Communications"
    },
    {
      id: 9,
      icon: "👥",
      schemes: 261,
      title: "Skills & Employment"
    },
    {
      id: 10,
      icon: "✊",
      schemes: 1255,
      title: "Social welfare & Empowerment"
    },
    {
      id: 11,
      icon: "🎾",
      schemes: 116,
      title: "Sports & Culture"
    },
    {
      id: 12,
      icon: "🚌",
      schemes: 52,
      title: "Transport & Infrastructure"
    },
    {
      id: 13,
      icon: "🌐",
      schemes: 37,
      title: "Travel & Tourism"
    },
    {
      id: 14,
      icon: "🔧",
      schemes: 37,
      title: "Utility & Sanitation"
    },
    {
      id: 15,
      icon: "👪",
      schemes: 366,
      title: "Women and Child"
    },
  ];



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        {categories.map((category) => (
          <TouchableOpacity 
            key={category.id} 
            style={styles.card}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{category.icon}</Text>
            </View>
            <Text style={styles.schemeCount}>
              {category.schemes} Schemes
            </Text>
            <Text style={styles.title} numberOfLines={2}>
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');
const CARD_MARGIN = 3;  // Reduced margin
const CARD_WIDTH = (width - (CARD_MARGIN * 8)) / 3.5;  // 4 cards with margins
const CARD_HEIGHT = CARD_WIDTH * 0.7;  // Compact height (30% reduction)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 4,
  },
  grid: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingBottom: 12,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 5,  // Reduced padding
    margin: CARD_MARGIN,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1.5,
    elevation: 1,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 2,
  },
  icon: {
    fontSize: 18,  // Slightly smaller icon
  },
  schemeCount: {
    fontSize: 9,  // Smaller text
    color: '#666',
    marginBottom: 2,
    textAlign: 'center',
  },
  title: {
    fontSize: 9,  // Smaller text
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
    lineHeight: 11,  // Tighter line height
  },
});

export default SchemesPage;