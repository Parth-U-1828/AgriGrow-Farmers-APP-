import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Linking,
  Image,
  FlatList
} from 'react-native';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

const businessData = [
  {
    id: 1,
    title: "Agribusiness Idea & Planning",
    content: "Choosing a profitable agribusiness and validating its demand is crucial for success. Identify high-demand crops or livestock based on market trends, climate suitability, and available resources.",
    steps: [
      "1. Identify Profitable Crops/Livestock: Research climate suitability and market trends.",
      "2. Validate Demand: Analyze local and global market prices and assess supply chain gaps.",
      "3. Create an Agribusiness Plan: Define crop cycles, investment, and revenue strategy."
    ],
    resources: [
      {
        title: "FAO Market & Crops Analysis",
        url: "https://www.fao.org/",
        youtubeVideo: "https://www.youtube.com/watch?v=xyz123"
      },
      {
        title: "Agri Market Research - ICAR",
        url: "https://icar.org.in/",
        youtubeVideo: "https://www.youtube.com/watch?v=abc456"
      }
    ]
  },
  {
    id: 2,
    title: "Farm Registration & Legal Setup",
    content: "Registering your farm or agribusiness legally is essential for accessing subsidies, loans, and ensuring smooth operations. Choose a suitable legal structure such as a farmer cooperative.",
    steps: [
      "1. Choose a Business Structure (Farmer Cooperative, Sole Proprietorship, Agro-Enterprise, etc.)",
      "2. Register Your Farm via Government Agriculture Portal",
      "3. Apply for Farming Licenses & Subsidies (Organic Certification, Food Safety Approvals)"
    ],
    resources: [
      {
        title: "Govt Agriculture Registration",
        url: "https://agricoop.nic.in/",
        youtubeVideo: "https://www.youtube.com/watch?v=uvw321"
      }
    ]
  },
  {
    id: 3,
    title: "Market Access & Online Selling",
    content: "Expand your farm's reach by listing your produce on online agricultural marketplaces and platforms like eNAM, AgriBazaar, and WhatsApp Business.",
    steps: [
      "1. Register on Agri Marketplaces (eNAM, AgriBazaar, Krishify)",
      "2. Set Up Google My Business for Farm Visibility",
      "3. Optimize Listings with High-Quality Images and Detailed Descriptions"
    ],
    resources: [
      {
        title: "eNAM - Online Agriculture Market",
        url: "https://enam.gov.in/",
        youtubeVideo: "https://www.youtube.com/watch?v=klm654"
      },
      {
        title: "AgriBazaar - Sell Crops Online",
        url: "https://agribazaar.com/",
        youtubeVideo: "https://www.youtube.com/watch?v=rst789"
      }
    ]
  },
  {
    id: 4,
    title: "Farm Website & Social Media Presence",
    content: "Building a digital presence is key to reaching consumers, wholesalers, and investors. Create a website to showcase your farm's products, sustainable practices, and pricing.",
    steps: [
      "1. Create a Farm Website (Wix, WordPress, Shopify)",
      "2. Register a Domain & Hosting (GoDaddy, Bluehost)",
      "3. Use Social Media for Marketing (Facebook, Instagram, YouTube)"
    ],
    resources: [
      {
        title: "Wix - Build a Farm Website",
        url: "https://www.wix.com/",
        youtubeVideo: "https://www.youtube.com/watch?v=qwe567"
      },
      {
        title: "Agriculture Digital Marketing Guide",
        url: "https://wordpress.org/",
        youtubeVideo: "https://www.youtube.com/watch?v=yza987"
      }
    ]
  },
  {
    id: 5,
    title: "AI-Powered Precision Farming & Automation",
    content: "Leverage AI and automation to improve farm productivity and efficiency. AI-driven tools like satellite-based crop monitoring, automated irrigation, and pest detection systems help optimize yields.",
    steps: [
      "1. Use AI for Crop Monitoring (Satellite Data, IoT Sensors, Drones)",
      "2. Automate Irrigation & Pest Control with Smart Farming Systems",
      "3. Analyze Market Trends with AI for Better Pricing Strategies"
    ],
    resources: [
      {
        title: "Precision Farming AI Tools",
        url: "https://www.smartfarmingtech.com/",
        youtubeVideo: "https://www.youtube.com/watch?v=bvc321"
      }
    ]
  }
];

const SetupCards = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => {
        setSelectedCard(item);
        setModalVisible(true);
      }}
    >
      <View style={styles.cardIcon}>
        <Text style={styles.cardIconText}>{item.title.charAt(0)}</Text>
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardContent} numberOfLines={3}>
        {item.content}
      </Text>
      <TouchableOpacity 
        style={styles.knowMoreButton}
        onPress={() => {
          setSelectedCard(item);
          setModalVisible(true);
        }}
      >
        <Text style={styles.knowMoreText}>Know More →</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Business Setup & Online Presence</Text>
        <Text style={styles.headerSubtitle}>
          A step-by-step guide for entrepreneurs to set up a business, register online, and grow their digital presence.
        </Text>
      </View>
      
      <FlatList
        data={businessData}
        renderItem={renderCard}
        keyExtractor={item => item.id.toString()}
        numColumns={isSmallScreen ? 1 : 2}
        contentContainerStyle={styles.cardContainer}
        scrollEnabled={false}
      />
      
      {/* Modal for detailed view */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedCard && (
          <ScrollView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIcon}>
                <Text style={styles.modalIconText}>{selectedCard.title.charAt(0)}</Text>
              </View>
              <Text style={styles.modalTitle}>{selectedCard.title}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalContent}>{selectedCard.content}</Text>
            
            <Text style={styles.sectionTitle}>Key Steps</Text>
            <View style={styles.stepsContainer}>
              {selectedCard.steps.map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step.substring(3)}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.divider} />
            
            <Text style={styles.sectionTitle}>Recommended Resources</Text>
            <View style={styles.resourcesContainer}>
              {selectedCard.resources.map((resource, index) => (
                <View key={index} style={styles.resourceItem}>
                  <Text style={styles.resourceTitle}>{resource.title}</Text>
                  <View style={styles.resourceButtons}>
                    <TouchableOpacity 
                      style={styles.websiteButton}
                      onPress={() => openLink(resource.url)}
                    >
                      <Text style={styles.buttonText}>Website</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.youtubeButton}
                      onPress={() => openLink(resource.youtubeVideo)}
                    >
                      <Text style={styles.buttonText}>Tutorial</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
            
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faf7',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004d4d',
    marginBottom: 12,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  cardContainer: {
    paddingBottom: 20,
  },
  card: {
    flex: isSmallScreen ? 1 : 0.5,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#d6ff80',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  cardIconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d4d',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004d4d',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardContent: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
  },
  knowMoreButton: {
    alignSelf: 'center',
  },
  knowMoreText: {
    color: '#004d4d',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8faf7',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#d6ff80',
  },
  modalIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d6ff80',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modalIconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d4d',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#004d4d',
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666666',
  },
  modalContent: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004d4d',
    marginBottom: 16,
  },
  stepsContainer: {
    marginBottom: 24,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#d6ff80',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#004d4d',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 24,
  },
  resourcesContainer: {
    marginBottom: 24,
  },
  resourceItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004d4d',
    marginBottom: 12,
  },
  resourceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  websiteButton: {
    flex: 1,
    backgroundColor: '#004d4d',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  youtubeButton: {
    flex: 1,
    backgroundColor: '#ff0000',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    marginLeft: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  closeModalButton: {
    backgroundColor: '#004d4d',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  closeModalButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SetupCards;