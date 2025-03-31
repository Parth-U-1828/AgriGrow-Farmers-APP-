import React, { useState } from 'react';
import { 
  View, 
  StatusBar, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView
} from 'react-native';

// Import your components
import Hero from './src/schemes/Hero';
import FarmersMarketplaceApp from './src/shareresources/share';
import Carousel from './src/schemes/carosel';
import SchemeFinderApp from './src/schemes/schemefinderapp';
import SchemesPage from './src/schemes/schemes';
import AboutUsSection from './src/components/AboutUs';
import ConsultationPage from './src/components/consultant';
import HeroSection from './src/components/HeroSection';
import LandingPage from './src/components/homepage';
import SetupCards from './src/buissness/setup';
import BusinessInsights from './src/buissness/insight';
import FinancialPlanDashboard from './src/financial/financial';
import PricingPage from './src/payment/payment';
import Chatbot from './src/chatbot/chatbot';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <HeroSection />
            <AboutUsSection />
            <ConsultationPage />
            <LandingPage />
          </>
        );
      case 'schemes':
        return (
          <>
            <Carousel />
            <Hero />
            <SchemesPage />
            <SchemeFinderApp />
          </>
        );
      case 'marketplace':
        return <FarmersMarketplaceApp />;
      case 'business':
        return (
          <>
            <SetupCards />
            <BusinessInsights />
          </>
        );
      case 'finance':
        return <FinancialPlanDashboard />;
      case 'pricing':
        return <PricingPage />;
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'schemes', label: 'Schemes' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'business', label: 'Business' },
    { id: 'finance', label: 'Finance' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'pricing', label: 'Pricing' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      
      {/* Navigation Bar */}
      <View style={styles.navbar}>
        {navItems.map((item) => (
          <TouchableOpacity 
            key={item.id}
            style={[
              styles.navItem, 
              activeSection === item.id && styles.activeNavItem
            ]}
            onPress={() => setActiveSection(item.id)}
          >
            <Text style={styles.navText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Main Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {renderSection()}
      </ScrollView>
      
      {/* Chatbot - Keep your existing styling */}
      <Chatbot />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    flexDirection: 'row',
    width: 400,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  navItem: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginVertical: 2,
  },
  activeNavItem: {
    backgroundColor: '#3498db',
  },
  navText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 11,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
});

export default App;