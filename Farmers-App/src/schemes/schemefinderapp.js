// SchemeFinderApp.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { schemeData } from './schemedata';

const SchemeFinderApp = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [expandedResources, setExpandedResources] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const toggleResource = (sectionIndex, resourceType, resourceIndex) => {
    const key = `${sectionIndex}-${resourceType}-${resourceIndex}`;
    setExpandedResources(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const sectionIcons = {
    0: '💡',
    1: '🚀',
    2: '📈',
    3: '✅'
  };

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#004d4d" />
        <Text style={styles.loadingText}>Loading Amazing Content...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.mainTitle}>
            <Text style={styles.gradientText}>{schemeData.Feature_Name}</Text>
          </Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.headerDescription}>{schemeData.Description}</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
        >
          {schemeData.Sections.map((section, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.navTab,
                activeSection === index && styles.activeTab
              ]}
              onPress={() => setActiveSection(index)}
              activeOpacity={0.7}
            >
              <View style={styles.tabIcon}>
                <Text>{sectionIcons[index]}</Text>
              </View>
              <Text style={styles.tabLabel}>{section.Section_Name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.mainContent}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>{sectionIcons[activeSection]}</Text>
            <Text style={styles.sectionTitle}>{schemeData.Sections[activeSection].Section_Name}</Text>
          </View>

          <View style={styles.contentCard}>
            <Text style={styles.contentIcon}>📄</Text>
            <Text style={styles.contentText}>{schemeData.Sections[activeSection].Content}</Text>
          </View>

          <ApplicationSteps />

          <Text style={styles.sectionSubtitle}>
            <Text style={styles.gradientText}>Official Resources</Text>
          </Text>
          
          <View style={styles.resourcesGrid}>
            {schemeData.Sections[activeSection].Resources.map((resource, index) => (
              <View key={index} style={styles.resourceCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardIcon}>
                    <Text>🚀</Text>
                  </View>
                  <Text style={styles.cardTitle}>{resource.Title}</Text>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity 
                    style={styles.primaryButton}
                    onPress={() => Linking.openURL(resource.URL)}
                  >
                    <Text style={styles.buttonText}>🌐 Visit Website</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.secondaryButton}
                    onPress={() => toggleResource(activeSection, 'resources', index)}
                  >
                    <Text style={styles.secondaryButtonText}>▶️ Learn More</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.sectionSubtitle}>
            <Text style={styles.gradientText}>Video Tutorials</Text>
          </Text>
          
          <View style={styles.videoGrid}>
            {schemeData.Sections[activeSection].YouTube_Videos.map((video, index) => (
              <View key={index} style={styles.videoCard}>
                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle}>{video.title}</Text>
                  <TouchableOpacity 
                    style={styles.watchButton}
                    onPress={() => Linking.openURL(video.url)}
                  >
                    <Text style={styles.watchButtonText}>
                      ▶️ Watch Video
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const ApplicationSteps = () => {
  const steps = [
    {
      emoji: '✅',
      title: "Check Eligibility",
      description: "Check the eligibility criteria for the scheme.",
      color: "#004d4d"
    },
    {
      emoji: '📋',
      title: "Gather Documents",
      description: "Gather necessary documents (business registration, Aadhaar, financial records).",
      color: "#2a7d7d"
    },
    {
      emoji: '🌐',
      title: "Online Application",
      description: "Apply online at the official portal (e.g., MSME, PM SVANidhi, Mudra Loan).",
      color: "#003838"
    },
    {
      emoji: '🔍',
      title: "Track Application",
      description: "Keep a copy of the application reference number and track status regularly.",
      color: "#004d4d"
    }
  ];

  return (
    <View style={styles.stepsContainer}>
      <Text style={styles.stepsTitle}>Application Process</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.stepsScrollContainer}
      >
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <View style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={[styles.stepIconWrapper, { backgroundColor: `${step.color}15` }]}>
                <Text style={styles.stepEmoji}>{step.emoji}</Text>
              </View>
              <Text style={[styles.stepTitleText, { color: step.color }]}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
            {index < steps.length - 1 && (
              <View style={styles.stepArrow}>
                <Text>➡️</Text>
              </View>
            )}
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#004d4d',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  gradientText: {
    color: '#004d4d',
  },
  titleUnderline: {
    height: 2,
    backgroundColor: '#004d4d',
    width: '30%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  headerDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  navTab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#004d4d15',
    borderWidth: 1,
    borderColor: '#004d4d',
  },
  tabIcon: {
    marginRight: 8,
  },
  tabLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  mainContent: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d4d',
  },
  contentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  contentText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    lineHeight: 20,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#004d4d',
  },
  resourcesGrid: {
    marginBottom: 20,
  },
  resourceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardIcon: {
    backgroundColor: '#004d4d15',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: '#004d4d',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#004d4d',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: '#004d4d',
    fontSize: 14,
    marginLeft: 8,
  },
  videoGrid: {
    marginBottom: 20,
  },
  videoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  videoInfo: {
    padding: 15,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  watchButton: {
    backgroundColor: '#004d4d',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  watchButtonText: {
    color: 'white',
    fontSize: 14,
  },
  stepsContainer: {
    marginBottom: 25,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004d4d',
    marginBottom: 15,
  },
  stepsScrollContainer: {
    paddingRight: 20,
  },
  stepCard: {
    width: isSmallDevice ? 140 : 160,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepNumber: {
    backgroundColor: '#004d4d',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepEmoji: {
    fontSize: 20,
  },
  stepTitleText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  stepArrow: {
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
});

export default SchemeFinderApp;