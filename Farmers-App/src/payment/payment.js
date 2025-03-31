import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const theme = {
  colors: {
    primary: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    secondary: {
      light: '#81c784',
    },
    background: '#f8f9fa',
    text: {
      primary: '#263238',
      secondary: '#546e7a',
    },
  },
  typography: {
    fontFamily: 'System',
    fontFamilyBold: 'System-Bold',
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  heroSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontWeight: 'bold',
    fontSize: 28,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: 15,
  },
  heroSubtitle: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  ctaButton: {
    backgroundColor: theme.colors.primary.main,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 40,
    marginTop: 20,
  },
  ctaButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  pricingSection: {
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  popularPlanBadge: {
    position: 'absolute',
    top: 10,
    right: 0,
    backgroundColor: theme.colors.primary.light,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  planTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.colors.text.primary,
    marginBottom: 10,
  },
  planPrice: {
    fontWeight: 'bold',
    fontSize: 24,
    color: theme.colors.text.primary,
  },
  planPeriod: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  planButton: {
    backgroundColor: theme.colors.primary.main,
    paddingVertical: 15,
    borderRadius: 40,
    marginTop: 10,
  },
  planButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const PricingPage = () => {
  const plans = [
    {
      title: "Hourly Plan",
      price: "₹200",
      period: "per hour",
      emoji: "⏰", // Clock emoji
      features: [
        "One-to-one business setup guidance (1 hour)",
        "Quick consulting sessions",
        "Instant access to resources",
        "Priority email support during session",
        "Basic business templates"
      ],
      color: theme.colors.primary.light
    },
    {
      title: "Weekly Plan",
      price: "₹500",
      period: "6 hours per week",
      emoji: "📅", // Calendar emoji
      features: [
        "One-to-one business guidance (6 hours per week)",
        "Week-long resource access",
        "Priority email & chat support",
        "Complete business templates pack",
        "Weekly progress check-in",
        "Market analysis report"
      ],
      color: theme.colors.primary.main,
      popular: true
    },
    {
      title: "Monthly Plan",
      price: "₹1,000",
      period: "per month",
      emoji: "🗓️", // Tear-off calendar emoji
      features: [
        "Comprehensive business setup program",
        "Unlimited consulting sessions",
        "24/7 resource access",
        "Monthly performance reviews",
        "Competitor analysis",
        "Marketing strategy guidance"
      ],
      color: theme.colors.primary.dark
    }
  ];

  const renderPlanCard = (plan) => (
    <View 
      key={plan.title} 
      style={[
        styles.planCard, 
        plan.popular && { 
          borderWidth: 2, 
          borderColor: plan.color 
        }
      ]}
    >
      {plan.popular && (
        <View style={styles.popularPlanBadge}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            MOST POPULAR
          </Text>
        </View>
      )}
      
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <Text style={{ fontSize: 30, marginRight: 10 }}>{plan.emoji}</Text>
        <Text style={styles.planTitle}>{plan.title}</Text>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 15 }}>
        <Text style={styles.planPrice}>{plan.price}</Text>
        <Text style={[styles.planPeriod, { marginLeft: 5 }]}>{plan.period}</Text>
      </View>
      
      {plan.features.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <Text style={{ color: plan.color }}>✓</Text>
          <Text style={styles.featureText}>{feature}</Text>
        </View>
      ))}
      
      <TouchableOpacity 
        style={[
          styles.planButton, 
          { backgroundColor: plan.popular ? plan.color : 'transparent', 
            borderWidth: plan.popular ? 0 : 1, 
            borderColor: plan.color 
          }
        ]}
      >
        <Text 
          style={[
            styles.planButtonText, 
            { color: plan.popular ? 'white' : plan.color }
          ]}
        >
          Select Plan
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient 
        colors={[theme.colors.primary.light + '10', theme.colors.secondary.light + '30']} 
        style={styles.heroSection}
      >
        <Text style={styles.heroTitle}>
          Flexible Plans for Your Business Needs
        </Text>
        <Text style={styles.heroSubtitle}>
          Choose the perfect plan that fits your schedule and requirements.
          From hourly consultations to comprehensive monthly packages.
        </Text>
        
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>View Plans</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.pricingSection}>
        <Text style={[styles.heroTitle, { fontSize: 24, marginBottom: 20 }]}>
          Choose Your Plan
        </Text>
        <Text style={[styles.heroSubtitle, { marginBottom: 20 }]}>
          Select the perfect option for your business needs and start growing today
        </Text>
        
        {plans.map(renderPlanCard)}
      </View>
    </ScrollView>
  );
};

export default PricingPage;