import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Linking,
  Image,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

// Icons as PNG images (you would need to provide these assets)
// For demo purposes, I'm using emoji as placeholders
const IconMap = {
  TrendingUp: '📈',
  ShoppingCart: '🛒',
  Store: '🏪',
  People: '👥',
  Payments: '💰',
  ShoppingBasket: '🧺',
  Leaf: '🌱',
  WaterDrop: '💧',
  Storefront: '🏬',
  Pets: '🐄',
  Settings: '⚙️'
};

const BusinessInsights = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleOpen = (card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Business Growth Strategies</Text>
      <Text style={styles.subheading}>
        Strategic insights and growth opportunities to scale your bakery business and increase revenue.
      </Text>

      <FlatList
        data={businessInsightsData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={width > 500 ? 2 : 1}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => handleOpen(item)}
            activeOpacity={0.8}
          >
            <View style={styles.cardIconContainer}>
              <Text style={styles.cardIcon}>{IconMap[item.icon]}</Text>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardContent} numberOfLines={3}>
              {item.content.substring(0, 120)}...
            </Text>
            <TouchableOpacity 
              style={styles.cardButton}
              onPress={() => handleOpen(item)}
            >
              <Text style={styles.cardButtonText}>Explore Strategy</Text>
              <Text style={styles.cardButtonIcon}>→</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* Modal for detailed view */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <ScrollView style={styles.modalContainer}>
          {selectedCard && (
            <>
              <View style={styles.modalHeader}>
                <View style={styles.modalIconContainer}>
                  <Text style={styles.modalIcon}>{IconMap[selectedCard.icon]}</Text>
                </View>
                <Text style={styles.modalTitle}>{selectedCard.title}</Text>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.modalContent}>{selectedCard.content}</Text>

              <Text style={styles.sectionTitle}>Implementation Steps</Text>
              <View style={styles.stepsContainer}>
                {selectedCard.steps.map((step, index) => (
                  <View key={index} style={styles.stepItem}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.stepText}>{step}</Text>
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
                        style={[styles.resourceButton, styles.websiteButton]}
                        onPress={() => openLink(resource.url)}
                      >
                        <Text style={styles.resourceButtonText}>Website</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.resourceButton, styles.youtubeButton]}
                        onPress={() => openLink(resource.youtubeVideo)}
                      >
                        <Text style={styles.resourceButtonText}>Tutorial</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={handleClose}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faf7',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#004d4d',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Poppins-Bold',
  },
  subheading: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
    fontFamily: 'Poppins-Regular',
  },
  gridContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    flex: 1,
    minWidth: width > 500 ? width * 0.4 : width * 0.75,
    maxWidth: width > 500 ? width * 0.45 : width * 0.75,
  },
  cardIconContainer: {
    backgroundColor: '#e0ff99',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: 40,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004d4d',
    textAlign: 'center',
    marginBottom: 8,
    minHeight: 60,
    fontFamily: 'Poppins-SemiBold',
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
  },
  cardButton: {
    backgroundColor: '#004d4d',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  cardButtonIcon: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
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
    borderBottomColor: '#e0ff99',
    position: 'relative',
  },
  modalIconContainer: {
    backgroundColor: '#e0ff99',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modalIcon: {
    fontSize: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#004d4d',
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#004d4d',
  },
  modalContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004d4d',
    marginBottom: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  stepsContainer: {
    marginBottom: 24,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    backgroundColor: '#d6ff80',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#003838',
    fontWeight: 'bold',
    fontSize: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0ff99',
    marginVertical: 24,
  },
  resourcesContainer: {
    marginBottom: 24,
  },
  resourceItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0ff99',
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004d4d',
    marginBottom: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  resourceButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  resourceButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 8,
  },
  websiteButton: {
    backgroundColor: '#004d4d',
    borderWidth: 1,
    borderColor: '#004d4d',
  },
  youtubeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff0000',
  },
  resourceButtonText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  modalCloseButton: {
    backgroundColor: '#004d4d',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
});

// Business Insights Data
const businessInsightsData = [
  {
    id: 1,
    title: "Crop Diversification",
    icon: "TrendingUp",
    content: "Enhance farm resilience and profitability by diversifying crops. Growing a mix of cash crops, staple crops, and specialty crops helps mitigate risks related to climate, pests, and market fluctuations. Additionally, intercropping and crop rotation improve soil fertility and yield sustainability.",
    steps: [
      "Identify High-Demand Crops (cash crops, specialty crops)",
      "Implement Crop Rotation Techniques",
      "Explore Intercropping for Soil Health",
      "Monitor Market Trends for Profitable Opportunities"
    ],
    resources: [
      {
        title: "USDA Crop Diversification Guide",
        url: "https://www.nal.usda.gov/agriculture/crop-diversification",
        youtubeVideo: "https://www.youtube.com/watch?v=example1"
      }
    ]
  },
  {
    id: 2,
    title: "Organic Farming Practices",
    icon: "Leaf",
    content: "Transitioning to organic farming enhances sustainability, reduces chemical dependency, and increases market value. Using natural fertilizers, composting, and biological pest control can improve soil health and crop quality while appealing to health-conscious consumers.",
    steps: [
      "Adopt Organic Fertilization Methods (compost, manure, bio-fertilizers)",
      "Implement Integrated Pest Management (natural pest control)",
      "Obtain Organic Certification for Better Market Access",
      "Develop Direct-to-Consumer Sales Channels (farmers' markets, CSA programs)"
    ],
    resources: [
      {
        title: "Organic Farming for Beginners",
        url: "https://www.youtube.com/watch?v=example2",
        youtubeVideo: "https://www.youtube.com/watch?v=example2"
      }
    ]
  },
  {
    id: 3,
    title: "Smart Irrigation Techniques",
    icon: "WaterDrop",
    content: "Efficient water management is crucial for sustainable agriculture. Drip irrigation, rainwater harvesting, and soil moisture sensors optimize water usage, reducing costs and improving crop yields in regions with limited water supply.",
    steps: [
      "Install Drip Irrigation Systems",
      "Use Soil Moisture Sensors for Precision Watering",
      "Implement Rainwater Harvesting Techniques",
      "Choose Drought-Resistant Crop Varieties"
    ],
    resources: [
      {
        title: "Efficient Irrigation Methods",
        url: "https://www.youtube.com/watch?v=example3",
        youtubeVideo: "https://www.youtube.com/watch?v=example3"
      }
    ]
  },
  {
    id: 4,
    title: "Market Access & Direct Selling",
    icon: "Storefront",
    content: "Increase farm profitability by accessing better markets and selling directly to consumers. Participate in farmers' markets, partner with local grocery stores, and leverage digital platforms to sell produce online.",
    steps: [
      "Join Local Farmers' Markets",
      "Develop Partnerships with Local Retailers",
      "Set Up an Online Store for Direct Sales",
      "Leverage Social Media for Promotion and Customer Engagement"
    ],
    resources: [
      {
        title: "How to Sell Farm Products Online",
        url: "https://www.youtube.com/watch?v=example4",
        youtubeVideo: "https://www.youtube.com/watch?v=example4"
      }
    ]
  },
  {
    id: 5,
    title: "Sustainable Livestock Management",
    icon: "Pets",
    content: "Improve animal welfare and profitability with sustainable livestock farming. Rotate grazing areas, provide balanced feed, and integrate waste recycling systems to enhance productivity and environmental sustainability.",
    steps: [
      "Implement Rotational Grazing Techniques",
      "Use Nutrient-Rich Feed for Livestock Health",
      "Integrate Waste Management & Composting",
      "Explore Free-Range and Organic Certification Options"
    ],
    resources: [
      {
        title: "Sustainable Livestock Farming Tips",
        url: "https://www.youtube.com/watch?v=example5",
        youtubeVideo: "https://www.youtube.com/watch?v=example5"
      }
    ]
  },
  {
    id: 6,
    title: "Agri-Tech Innovations",
    icon: "Settings",
    content: "Leverage technology to improve farm productivity and efficiency. Drones for crop monitoring, automated irrigation systems, and AI-driven yield predictions can significantly enhance agricultural operations.",
    steps: [
      "Use Drones for Crop Health Monitoring",
      "Implement AI-Based Yield Prediction Tools",
      "Adopt Automated Irrigation and Smart Sensors",
      "Explore Blockchain for Supply Chain Transparency"
    ],
    resources: [
      {
        title: "How Technology is Transforming Farming",
        url: "https://www.youtube.com/watch?v=example6",
        youtubeVideo: "https://www.youtube.com/watch?v=example6"
      }
    ]
  }
];

export default BusinessInsights;