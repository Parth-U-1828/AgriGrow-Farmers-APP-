import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView
} from 'react-native';

const LandingPage = () => {
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  // Feature cards data
  const features = [
    {
      id: '1',
      icon: '👥',
      title: 'Alumni Directory',
      description: 'Search and connect with alumni based on industry, location, and expertise.'
    },
    {
      id: '2',
      icon: '🤝',
      title: 'Mentorship Program',
      description: 'Find mentors or become one. Share knowledge and guide others to success.'
    },
    {
      id: '3',
      icon: '💼',
      title: 'Referral Jobs',
      description: 'Access job opportunities posted specifically by our alumni network.'
    },
    {
      id: '4',
      icon: '📅',
      title: 'Event Calendar',
      description: 'Stay updated with networking events, webinars, and alumni reunions.'
    },
    {
      id: '5',
      icon: '🎓',
      title: 'Learning Resources',
      description: 'Access exclusive courses and materials for professional development.'
    },
    {
      id: '6',
      icon: '💬',
      title: 'Discussion Forums',
      description: 'Engage in industry-specific discussions and seek advice from alumni.'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: '1',
      name: 'Rohan Jain',
      role: 'Micro-entrepreneur, Handcraft Business',
      quote: '"This platform\'s financial tools and funding access transformed my handcraft business. I secured a micro-loan in days and used AI-guided budgeting to cut production costs by 25%. Now, I\'m confident about scaling."',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: '2',
      name: 'Yash Vichare',
      role: 'Small Business Owner',
      quote: '"The AI market insights helped me identify new customer segments and optimize my pricing strategy. My revenue increased by 32% in just three months!"',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      id: '3',
      name: 'Rohan Jain',
      role: 'Organic Farmer',
      quote: '"The resource sharing features allowed me to collaborate with other farmers. We now share equipment and transportation costs, making our businesses more sustainable."',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    }
  ];

  // Auto-scroll features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeatureIndex(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Features Section */}
        <View ref={featuresRef} style={styles.section}>
          <Text style={styles.sectionTitle}>Everything You Need to Stay Connected</Text>
          
          <FlatList
            data={features}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.featureCard}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconText}>{item.icon}</Text>
                </View>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDescription}>{item.description}</Text>
              </View>
            )}
            style={styles.featureList}
            contentContainerStyle={styles.featureListContent}
          />
          
          <View style={styles.dotsContainer}>
            {features.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.dot,
                  index === activeFeatureIndex && styles.activeDot
                ]} 
              />
            ))}
          </View>
        </View>

        {/* Testimonials Section */}
        <View ref={testimonialsRef} style={[styles.section, styles.testimonialSection]}>
          <Text style={styles.sectionTitle}>What Our Members Say</Text>
          
          <FlatList
            data={testimonials}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.testimonialCard}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <Text style={styles.testimonialName}>{item.name}</Text>
                <Text style={styles.testimonialRole}>{item.role}</Text>
                <Text style={styles.testimonialQuote}>{item.quote}</Text>
              </View>
            )}
            numColumns={1}
            contentContainerStyle={styles.testimonialList}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerSection}>
              <Text style={styles.footerTitle}>HathSarthi</Text>
              <Text style={styles.footerText}>
                Empowering Small Businesses with AI-Driven Insights, Smart Financial Planning, and Sustainable Growth.
              </Text>
            </View>
            
            <View style={styles.footerSection}>
              <Text style={styles.footerTitle}>Quick Links</Text>
              {["About Us", "Directory", "Events", "Mentorship"].map((item) => (
                <TouchableOpacity key={item}>
                  <Text style={styles.footerLink}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.footerSection}>
              <Text style={styles.footerTitle}>Resources</Text>
              {["Help Center", "Privacy Policy", "Terms of Service", "Contact Us"].map((item) => (
                <TouchableOpacity key={item}>
                  <Text style={styles.footerLink}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.footerSection}>
              <Text style={styles.footerTitle}>Follow Us</Text>
              <View style={styles.socialIcons}>
                {['LinkedIn', 'Twitter', 'Facebook', 'Instagram'].map((social) => (
                  <TouchableOpacity key={social} style={styles.socialIcon}>
                    <Text style={styles.socialIconText}>{social.charAt(0)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          
          <View style={styles.footerDivider} />
          
          <Text style={styles.copyright}>
            © 2025 VendorHub. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  section: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  testimonialSection: {
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: isSmallScreen ? 22 : 26,
    fontWeight: '700',
    color: '#004d40',
    marginBottom: 30,
    textAlign: 'center',
  },
  featureList: {
    flexGrow: 0,
  },
  featureListContent: {
    paddingHorizontal: 10,
  },
  featureCard: {
    width: width - 40,
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 77, 64, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconText: {
    fontSize: 30,
  },
  featureTitle: {
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: '600',
    color: '#004d40',
    marginBottom: 10,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: isSmallScreen ? 14 : 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#c8e6c9',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#004d40',
  },
  testimonialList: {
    paddingHorizontal: 10,
  },
  testimonialCard: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 15,
  },
  testimonialName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004d40',
    marginBottom: 5,
  },
  testimonialRole: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  testimonialQuote: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    backgroundColor: '#004d40',
    padding: 20,
  },
  footerContent: {
    flexDirection: isSmallScreen ? 'column' : 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  footerSection: {
    width: isSmallScreen ? '100%' : '45%',
    marginBottom: 20,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 15,
    lineHeight: 20,
  },
  footerLink: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e6ee9c',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  socialIconText: {
    color: '#004d40',
    fontWeight: 'bold',
  },
  footerDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 15,
  },
  copyright: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
});

export default LandingPage;