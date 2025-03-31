import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const Hero = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hero Content */}
      <View style={styles.heroContent}>
        <Text style={styles.heroTitle}>Discover Government Schemes Tailored For You</Text>
        <Text style={styles.heroSubtitle}>Access thousands of central and state government schemes in one place</Text>
        
        <TouchableOpacity style={styles.findSchemesBtn}>
          <Text style={styles.btnText}>Find Schemes For You →</Text>
        </TouchableOpacity>
      </View>

      {/* Statistics Cards */}
      <View style={styles.statsContainer}>
        <StatCard number="3240+" label="Total Schemes" />
        <StatCard number="520+" label="Central Schemes" />
        <StatCard number="2720+" label="States/UTs Schemes" />
      </View>

      {/* Category Navigation */}
      <View style={styles.navigationSection}>
        <Text style={styles.sectionHeading}>Find schemes based on</Text>
        
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>Categories</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const StatCard = ({ number, label }) => {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9fdf9',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  heroContent: {
    marginBottom: 32,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: isSmallScreen ? 22 : 26,
    fontWeight: '700',
    color: '#1a3a1f',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 30,
  },
  heroSubtitle: {
    fontSize: isSmallScreen ? 14 : 15,
    color: '#4a4a4a',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  findSchemesBtn: {
    backgroundColor: '#1b7f34',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: isSmallScreen ? 'column' : 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: '#e6f8e6',
    padding: 20,
    flex: isSmallScreen ? 0 : 1,
    minHeight: 110,
    borderRadius: 10,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isSmallScreen ? 12 : 0,
  },
  statNumber: {
    fontSize: 28,
    color: '#1a3a1f',
    fontWeight: '700',
  },
  statLabel: {
    color: '#4a4a4a',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 6,
  },
  navigationSection: {
    marginTop: 24,
    width: '100%',
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a3a1f',
    marginBottom: 20,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: isSmallScreen ? 'column' : 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#1b7f34',
  },
  tabText: {
    color: '#4a4a4a',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#1b7f34',
  },
});

export default Hero;