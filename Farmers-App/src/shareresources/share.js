import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Dimensions,
  Linking,
  Animated,
  Easing
} from 'react-native';

// ProjectCard component with emojis
const ProjectCard = ({ project, onUpdate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [unitsToBuy, setUnitsToBuy] = useState(1);
  const [projectData, setProjectData] = useState(project);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const remainingUnits = projectData.cost - projectData.raised;
  const previewPercentage = Math.min(
    100,
    ((projectData.raised + unitsToBuy) / projectData.cost) * 100
  );

  const handleIncrement = () => {
    const maxValue = Math.min(remainingUnits, 1000);
    setUnitsToBuy(Math.min(unitsToBuy + 1, maxValue));
  };

  const handleDecrement = () => {
    setUnitsToBuy(Math.max(unitsToBuy - 1, 1));
  };

  const handleConfirmPurchase = () => {
    const updatedProject = {
      ...projectData,
      raised: projectData.raised + unitsToBuy,
      progressPercentage: previewPercentage,
      backers: projectData.backers + 1
    };
    
    setProjectData(updatedProject);
    if (onUpdate) onUpdate(updatedProject);
    setModalVisible(false);
    setUnitsToBuy(1);
  };

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: projectData.imageURL }}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle} numberOfLines={1}>{projectData.title}</Text>
          <View style={[styles.statusChip, { backgroundColor: '#2a7d7d' }]}>
            <Text style={styles.statusText}>{projectData.statusText}</Text>
          </View>
        </View>
        
        <View style={styles.expiryRow}>
          <Text style={styles.emoji}>⏱️</Text>
          <Text style={styles.expiryText}>Expires Soon</Text>
        </View>
        
        <Text style={styles.cardDescription} numberOfLines={2}>
          {projectData.description}
        </Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>{projectData.raised} Units Raised</Text>
            <Text style={styles.progressText}>{projectData.progressPercentage.toFixed(1)}%</Text>
          </View>
          
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${projectData.progressPercentage}%`,
                  backgroundColor: '#004d4d'
                }
              ]}
            />
          </View>
          
          <Text style={styles.progressGoal}>
            Goal: {projectData.cost} Units
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.buyButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buyButtonText}>BUY</Text>
        </TouchableOpacity>
      </View>

      {/* Buy Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Buy Units - {projectData.title}</Text>
            
            <Text style={styles.modalDescription}>
              Adjust the number of units you want to buy. This will support the project's progress toward its goal.
            </Text>
            
            <Text style={styles.sectionTitle}>Units to Buy</Text>
            
            <View style={styles.unitControls}>
              <TouchableOpacity 
                style={styles.unitButton}
                onPress={handleDecrement}
                disabled={unitsToBuy <= 1}
              >
                <Text style={styles.unitButtonText}>➖</Text>
              </TouchableOpacity>
              
              <TextInput
                style={styles.unitInput}
                value={unitsToBuy.toString()}
                onChangeText={(text) => {
                  const value = parseInt(text) || 0;
                  const maxValue = Math.min(remainingUnits, 1000);
                  setUnitsToBuy(Math.min(value, maxValue));
                }}
                keyboardType="numeric"
              />
              
              <TouchableOpacity 
                style={styles.unitButton}
                onPress={handleIncrement}
                disabled={unitsToBuy >= remainingUnits}
              >
                <Text style={styles.unitButtonText}>➕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrack}>
                <View 
                  style={[
                    styles.sliderFill,
                    { width: `${(unitsToBuy / Math.min(remainingUnits, 100)) * 100}%` }
                  ]}
                />
              </View>
              <View style={styles.sliderLabels}>
                <Text>1</Text>
                <Text>{Math.min(remainingUnits, 100)}</Text>
              </View>
            </View>
            
            <Text style={styles.sectionTitle}>Progress Preview</Text>
            
            <View style={styles.progressPreview}>
              <Text style={styles.progressLabel}>
                {(projectData.raised + unitsToBuy).toFixed(1)} Units Raised
              </Text>
              <Text style={styles.progressLabel}>
                {previewPercentage.toFixed(1)}%
              </Text>
            </View>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${projectData.progressPercentage}%`,
                    backgroundColor: '#004d4d'
                  }
                ]}
              />
            </View>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${previewPercentage}%`,
                    backgroundColor: '#4CAF50'
                  }
                ]}
              />
            </View>
            
            <View style={styles.progressLegend}>
              <Text style={styles.legendText}>Current</Text>
              <Text style={[styles.legendText, { color: '#4CAF50' }]}>After Purchase</Text>
            </View>
            
            <View style={styles.orderSummary}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Units</Text>
                <Text style={styles.summaryValue}>{unitsToBuy}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total Cost</Text>
                <Text style={[styles.summaryValue, { fontWeight: 'bold' }]}>
                  ₹{(unitsToBuy * 100).toLocaleString()}
                </Text>
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmPurchase}
              >
                <Text style={styles.confirmButtonText}>Confirm Purchase</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

// Main Component with emojis
const SuppliersAndWarehouses = () => {
  const [activeTab, setActiveTab] = useState('suppliers');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [projectsData, setProjectsData] = useState({});

  // Sample data
  const farmers = [
    { id: 1, name: "Organic Farms Co-op", type: "Organic Vegetables" },
    { id: 2, name: "Dairy Farmers Collective", type: "Milk & Dairy" },
    { id: 3, name: "Grain Growers Association", type: "Wheat & Rice" },
    { id: 4, name: "Fruit Orchards Network", type: "Seasonal Fruits" },
  ];

  const warehouses = [
    {
      id: 1,
      name: "Shree Storage",
      owner: "Rajesh Sharma",
      location: "Andheri, Mumbai",
      area: "465 sq.m",
      rent: "₹1,50,000/month",
      image: "https://imagecdn.99acres.com/media1/23353/7/467067400M-1737618462281.jpg"
    },
    // Add more warehouses as needed...
  ];

  const initialFarmerProjects = {
    1: [
      {
        title: "Organic Tomatoes",
        description: "Fresh, pesticide-free tomatoes grown with organic farming methods.",
        imageURL: "https://images.unsplash.com/photo-1594282408489-2a4088e6b01e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        statusText: "Open",
        raised: 763,
        cost: 1000,
        progressPercentage: 76.3
      },
      // Add more projects as needed...
    ],
    // Add projects for other farmers...
  };

  useEffect(() => {
    setProjectsData(initialFarmerProjects);
  }, []);

  const handleProjectUpdate = (farmerId, updatedProject) => {
    const updatedProjects = [...projectsData[farmerId]];
    const projectIndex = updatedProjects.findIndex(p => p.title === updatedProject.title);
    
    if (projectIndex !== -1) {
      updatedProjects[projectIndex] = updatedProject;
      setProjectsData({
        ...projectsData,
        [farmerId]: updatedProjects
      });
    }
  };

  const renderFarmerItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.listItem,
        selectedSupplier?.id === item.id && styles.selectedListItem
      ]}
      onPress={() => setSelectedSupplier(item)}
    >
      <View style={styles.listItemIcon}>
        <Text style={styles.emoji}>👨‍🌾</Text>
      </View>
      <View style={styles.listItemText}>
        <Text style={styles.listItemPrimary}>{item.name}</Text>
        <Text style={styles.listItemSecondary}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderWarehouseItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.listItem,
        selectedWarehouse?.id === item.id && styles.selectedListItem
      ]}
      onPress={() => setSelectedWarehouse(item)}
    >
      <View style={styles.listItemIcon}>
        <Text style={styles.emoji}>🏭</Text>
      </View>
      <View style={styles.listItemText}>
        <Text style={styles.listItemPrimary}>{item.name}</Text>
        <Text style={styles.listItemSecondary}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Farmers & Warehouses Marketplace</Text>
      
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'suppliers' && styles.activeTab
          ]}
          onPress={() => setActiveTab('suppliers')}
        >
          <Text style={styles.emoji}>👨‍🌾</Text>
          <Text style={[
            styles.tabText,
            activeTab === 'suppliers' && styles.activeTabText
          ]}>
            Farmers
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'warehouses' && styles.activeTab
          ]}
          onPress={() => setActiveTab('warehouses')}
        >
          <Text style={styles.emoji}>🏭</Text>
          <Text style={[
            styles.tabText,
            activeTab === 'warehouses' && styles.activeTabText
          ]}>
            Warehouses
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'suppliers' ? (
        <View style={styles.tabContent}>
          <View style={styles.sidebar}>
            <Text style={styles.sidebarHeader}>Select a Farmer</Text>
            <FlatList
              data={farmers}
              renderItem={renderFarmerItem}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={() => <View style={styles.divider} />}
            />
          </View>
          
          <ScrollView style={styles.mainContent}>
            {selectedSupplier ? (
              <>
                <View style={styles.supplierHeader}>
                  <Text style={styles.supplierName}>{selectedSupplier.name}</Text>
                  <Text style={styles.supplierType}>{selectedSupplier.type} Farmer</Text>
                </View>
                
                <Text style={styles.sectionHeader}>Available Products</Text>
                
                <View style={styles.projectsGrid}>
                  {projectsData[selectedSupplier.id]?.map((project, index) => (
                    <ProjectCard 
                      key={index}
                      project={project}
                      onUpdate={(updatedProject) => 
                        handleProjectUpdate(selectedSupplier.id, updatedProject)
                      }
                    />
                  ))}
                </View>
              </>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emojiLarge}>🛒</Text>
                <Text style={styles.emptyStateTitle}>Select a farmer from the list</Text>
                <Text style={styles.emptyStateText}>
                  View farmer products and make purchases
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.tabContent}>
          <View style={styles.sidebar}>
            <Text style={styles.sidebarHeader}>Available Warehouses</Text>
            <FlatList
              data={warehouses}
              renderItem={renderWarehouseItem}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={() => <View style={styles.divider} />}
            />
          </View>
          
          <ScrollView style={styles.mainContent}>
            {selectedWarehouse ? (
              <View style={styles.warehouseCard}>
                <Image
                  source={{ uri: selectedWarehouse.image }}
                  style={styles.warehouseImage}
                  resizeMode="cover"
                />
                
                <View style={styles.warehouseDetails}>
                  <Text style={styles.warehouseName}>{selectedWarehouse.name}</Text>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Location:</Text>
                    <Text style={styles.detailValue}>{selectedWarehouse.location}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Owner:</Text>
                    <Text style={styles.detailValue}>{selectedWarehouse.owner}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Area:</Text>
                    <Text style={styles.detailValue}>{selectedWarehouse.area}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Rent:</Text>
                    <Text style={styles.detailValue}>{selectedWarehouse.rent}</Text>
                  </View>
                  
                  <View style={styles.warehouseButtons}>
                    <TouchableOpacity style={styles.primaryButton}>
                      <Text style={styles.primaryButtonText}>Contact Owner</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.secondaryButton}>
                      <Text style={styles.secondaryButtonText}>Schedule Visit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emojiLarge}>🏭</Text>
                <Text style={styles.emptyStateTitle}>Select a warehouse from the list</Text>
                <Text style={styles.emptyStateText}>
                  View warehouse details and contact information
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faf7',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d4d',
    marginBottom: 16,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#004d4d',
  },
  tabText: {
    marginLeft: 8,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#004d4d',
  },
  tabContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 8,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sidebarHeader: {
    backgroundColor: '#004d4d',
    color: 'white',
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectedListItem: {
    backgroundColor: 'rgba(42, 125, 125, 0.1)',
  },
  listItemIcon: {
    width: 40,
    alignItems: 'center',
  },
  listItemText: {
    flex: 1,
  },
  listItemPrimary: {
    fontWeight: '500',
    color: '#333',
  },
  listItemSecondary: {
    fontSize: 12,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  mainContent: {
    flex: 1,
  },
  supplierHeader: {
    marginBottom: 16,
  },
  supplierName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d4d',
  },
  supplierType: {
    fontSize: 14,
    color: '#666',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004d4d',
    marginBottom: 16,
  },
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImageContainer: {
    height: 160,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  expiryText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressGoal: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  emoji: {
    fontSize: 16,
  },
  emojiLarge: {
    fontSize: 60,
    marginBottom: 16,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004d4d',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004d4d',
    marginBottom: 8,
  },
  unitControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  unitButton: {
    width: 40,
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitButtonText: {
    fontSize: 20,
  },
  unitInput: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    marginHorizontal: 8,
    textAlign: 'center',
    fontSize: 16,
  },
  sliderContainer: {
    marginVertical: 16,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginBottom: 4,
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#004d4d',
    borderRadius: 2,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  progressLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  orderSummary: {
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004d4d',
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#004d4d',
    marginRight: 8,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#004d4d',
    fontWeight: 'bold',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // Warehouse card styles
  warehouseCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  warehouseImage: {
    width: '100%',
    height: 200,
  },
  warehouseDetails: {
    padding: 16,
  },
  warehouseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d4d',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: 80,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  warehouseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#004d4d',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 8,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#004d4d',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginLeft: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#004d4d',
    fontWeight: 'bold',
  },
});

export default SuppliersAndWarehouses;



