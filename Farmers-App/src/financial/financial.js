import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
  SafeAreaView
} from 'react-native';

const FinancialPlanDashboard = () => {
  const [activeTab, setActiveTab] = useState('forecasting');
  
  // Sample data
  const data = {
    financial_plan: {
      financial_plan: {
        revenue_forecasting: {
          methodology: "Time series analysis based on past harvest yields, incorporating seasonal weather patterns, market demand, competitor pricing, and external factors such as government policies and global commodity trends.",
          predictions: [
            {
              period: "Next 3 Months",
              projected_revenue: "50,000 - ₹80,000",
              notes: "Peak harvest season. Consider bulk sales to wholesalers and local markets. Explore farm-to-table direct selling opportunities."
            },
            {
              period: "Next 6 Months",
              projected_revenue: "40,000 - ₹70,000",
              notes: "Off-season impact. Use cold storage for perishable crops and focus on value-added products like processed goods."
            },
            {
              period: "Next 12 Months",
              projected_revenue: "80,000 - ₹1,20,000",
              notes: "Expansion to new distribution channels. Invest in organic certification and export potential."
            }
          ]
        },
        cost_breakdown: {
          fixed_costs: [
            {
              item: "Land Lease/Maintenance",
              estimated_cost: "₹10,000 - ₹30,000 per month, depending on location and land size."
            },
            {
              item: "Equipment & Machinery",
              estimated_cost: "₹5,000 - ₹20,000 per month (loan repayments or maintenance)."
            },
            {
              item: "Labor & Wages",
              estimated_cost: "₹15,000 - ₹50,000 per month, depending on workforce size."
            },
            {
              item: "Insurance",
              estimated_cost: "₹2,000 - ₹8,000 per month (weather, crop, and asset insurance)."
            }
          ],
          variable_costs: [
            {
              item: "Seeds & Saplings",
              estimated_cost: "₹500 - ₹5,000 per acre, depending on crop variety."
            },
            {
              item: "Fertilizers & Pesticides",
              estimated_cost: "₹2,000 - ₹10,000 per season, organic alternatives may vary."
            },
            {
              item: "Irrigation & Water Supply",
              estimated_cost: "₹3,000 - ₹15,000 per month, depending on farm size and method."
            },
            {
              item: "Transportation & Logistics",
              estimated_cost: "₹5,000 - ₹20,000 per month, considering distance to markets."
            }
          ]
        },
        investment_opportunities: [
          {
            investment: "Agri-Tech & Smart Irrigation",
            roi: "High",
            strategy: "Invest ₹50,000 - ₹2,00,000 in automated irrigation, soil health sensors, and data-driven farming solutions to improve yield efficiency."
          },
          {
            investment: "Organic Farming Certification",
            roi: "High",
            strategy: "₹75,000 - ₹1,50,000 for certification and transition costs. Target premium pricing and export opportunities."
          },
          {
            investment: "Farm-to-Consumer Direct Sales",
            roi: "Medium-High",
            strategy: "₹30,000 - ₹75,000 for setting up an online store and home delivery logistics to maximize profits by cutting out middlemen."
          }
        ],
        backup_strategies: [
          {
            strategy: "Diversify crop selection or integrate livestock farming.",
            trigger: "Unfavorable weather conditions or market price drop."
          },
          {
            strategy: "Set up a cooperative or partner with other farmers for bulk selling.",
            trigger: "High competition or oversupply in the local market."
          },
          {
            strategy: "Apply for government agricultural subsidies or low-interest loans.",
            trigger: "Unexpected financial shortfall."
          }
        ],
        market_price_comparison: {
          methodology: "Analyzed competitor pricing across local markets, online farm produce platforms, and commodity exchanges. Compared pricing strategies and value-added processing.",
          recommendations: "Introduce bulk pricing and direct-to-consumer models to increase profitability. Consider value-added processing for premium pricing."
        }
      }
    },
    market_prices: {
      Amazon: "https://www.amazon.in/s?k=organic+farm+produce",
      IndiaMART: "https://dir.indiamart.com/search.mp?ss=agriculture+products",
      Flipkart: "https://www.flipkart.com/search?q=fresh+farm+produce"
    },
    youtube_videos: [
      {
        title: "How To Start Organic Farming In India",
        url: "https://www.youtube.com/watch?v=xyz123",
        channel: "AgriGuru",
        published_date: "2024-07-15T10:00:33Z"
      },
      {
        title: "Smart Farming: The Future of Agriculture",
        url: "https://www.youtube.com/watch?v=abc456",
        channel: "Farming Innovations",
        published_date: "2023-05-10T14:23:03Z"
      }
    ]
  };

  const plan = data.financial_plan.financial_plan;
  
  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Fashion Business Financial Plan</Text>
          <Text style={styles.headerSubtitle}>Interactive dashboard for your fashion business planning</Text>
        </View>
        
        {/* Navigation Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'forecasting' && styles.activeTab]}
            onPress={() => setActiveTab('forecasting')}
          >
            <Text style={[styles.tabText, activeTab === 'forecasting' && styles.activeTabText]}>
              Revenue
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'costs' && styles.activeTab]}
            onPress={() => setActiveTab('costs')}
          >
            <Text style={[styles.tabText, activeTab === 'costs' && styles.activeTabText]}>
              Costs
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'investments' && styles.activeTab]}
            onPress={() => setActiveTab('investments')}
          >
            <Text style={[styles.tabText, activeTab === 'investments' && styles.activeTabText]}>
              Investments
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'backup' && styles.activeTab]}
            onPress={() => setActiveTab('backup')}
          >
            <Text style={[styles.tabText, activeTab === 'backup' && styles.activeTabText]}>
              Backup Plans
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'market' && styles.activeTab]}
            onPress={() => setActiveTab('market')}
          >
            <Text style={[styles.tabText, activeTab === 'market' && styles.activeTabText]}>
              Market
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'resources' && styles.activeTab]}
            onPress={() => setActiveTab('resources')}
          >
            <Text style={[styles.tabText, activeTab === 'resources' && styles.activeTabText]}>
              Resources
            </Text>
          </TouchableOpacity>
        </ScrollView>
        
        {/* Content Section */}
        <View style={styles.content}>
          {activeTab === 'forecasting' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Revenue Forecasting</Text>
              
              <View style={styles.methodologyBox}>
                <Text style={styles.subtitle}>Methodology</Text>
                <Text style={styles.text}>{plan.revenue_forecasting.methodology}</Text>
              </View>
              
              <Text style={styles.subtitle}>Predictions</Text>
              
              {plan.revenue_forecasting.predictions.map((pred, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.cardTitle}>{pred.period}</Text>
                  <Text style={styles.revenueAmount}>₹{pred.projected_revenue}</Text>
                  <Text style={styles.cardText}>{pred.notes}</Text>
                </View>
              ))}
            </View>
          )}
          
          {activeTab === 'costs' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Cost Breakdown</Text>
              
              <Text style={styles.subtitle}>Fixed Costs</Text>
              <View style={styles.table}>
                {plan.cost_breakdown.fixed_costs.map((cost, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableHeader}>{cost.item}</Text>
                    <Text style={styles.tableData}>{cost.estimated_cost}</Text>
                  </View>
                ))}
              </View>
              
              <Text style={styles.subtitle}>Variable Costs</Text>
              <View style={styles.table}>
                {plan.cost_breakdown.variable_costs.map((cost, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableHeader}>{cost.item}</Text>
                    <Text style={styles.tableData}>{cost.estimated_cost}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          {activeTab === 'investments' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Investment Opportunities</Text>
              
              {plan.investment_opportunities.map((inv, index) => (
                <View key={index} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{inv.investment}</Text>
                    <View style={styles.roiBadge}>
                      <Text style={styles.roiText}>ROI: {inv.roi}</Text>
                    </View>
                  </View>
                  <Text style={styles.cardText}>{inv.strategy}</Text>
                </View>
              ))}
            </View>
          )}
          
          {activeTab === 'backup' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Backup Strategies</Text>
              
              {plan.backup_strategies.map((strat, index) => (
                <View key={index} style={styles.card}>
                  <View style={styles.triggerBadge}>
                    <Text style={styles.triggerText}>Trigger: {strat.trigger}</Text>
                  </View>
                  <Text style={styles.cardText}>{strat.strategy}</Text>
                </View>
              ))}
            </View>
          )}
          
          {activeTab === 'market' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Market Price Comparison</Text>
              
              <View style={styles.methodologyBox}>
                <Text style={styles.subtitle}>Methodology</Text>
                <Text style={styles.text}>{plan.market_price_comparison.methodology}</Text>
              </View>
              
              <View style={styles.methodologyBox}>
                <Text style={styles.subtitle}>Recommendations</Text>
                <Text style={styles.text}>{plan.market_price_comparison.recommendations}</Text>
              </View>
              
              <Text style={styles.subtitle}>Market Research Links</Text>
              {Object.entries(data.market_prices).map(([site, url], index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.linkButton}
                  onPress={() => openLink(url)}
                >
                  <Text style={styles.linkText}>{site}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          {activeTab === 'resources' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Learning Resources</Text>
              <Text style={styles.subtitle}>Recommended Videos</Text>
              
              {data.youtube_videos.map((video, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.videoCard}
                  onPress={() => openLink(video.url)}
                >
                  <Text style={styles.videoTitle}>{video.title}</Text>
                  <View style={styles.videoMeta}>
                    <Text style={styles.videoChannel}>Channel: {video.channel}</Text>
                    <Text style={styles.videoDate}>
                      Published: {new Date(video.published_date).toLocaleDateString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          <View style={styles.disclaimerBox}>
            <Text style={styles.disclaimerText}>
              This financial plan is for informational purposes only and should not be construed as professional financial advice.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#2e7d32',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center',
  },
  tabsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
    elevation: 2,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#2e7d32',
  },
  tabText: {
    color: '#757575',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  tabContent: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#424242',
    marginBottom: 12,
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 22,
    marginBottom: 8,
  },
  methodologyBox: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    borderTopWidth: 4,
    borderTopColor: '#66bb6a',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    flex: 1,
  },
  revenueAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2e7d32',
    marginVertical: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#757575',
    lineHeight: 22,
  },
  roiBadge: {
    backgroundColor: '#a5d6a7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  roiText: {
    color: '#1b5e20',
    fontSize: 14,
    fontWeight: '600',
  },
  triggerBadge: {
    backgroundColor: '#2e7d32',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  triggerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  table: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    padding: 12,
  },
  tableHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  tableData: {
    flex: 1,
    fontSize: 16,
    color: '#757575',
  },
  linkButton: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  linkText: {
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: '500',
  },
  videoCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  videoTitle: {
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoChannel: {
    color: '#757575',
    fontSize: 14,
  },
  videoDate: {
    color: '#757575',
    fontSize: 14,
  },
  disclaimerBox: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    marginTop: 16,
  },
  disclaimerText: {
    color: '#757575',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default FinancialPlanDashboard;