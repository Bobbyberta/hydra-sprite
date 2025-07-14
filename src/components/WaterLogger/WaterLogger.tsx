import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface WaterLoggerProps {
  onWaterLogged: (amount: number) => void;
}

interface QuickAction {
  label: string;
  amount: number;
  icon: string;
  color: string;
}

const WaterLogger: React.FC<WaterLoggerProps> = ({onWaterLogged}) => {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  const quickActions: QuickAction[] = [
    {
      label: 'Small Glass',
      amount: 0.5,
      icon: 'local-drink',
      color: '#81C784',
    },
    {
      label: 'Glass',
      amount: 1,
      icon: 'local-drink',
      color: '#42A5F5',
    },
    {
      label: 'Large Glass',
      amount: 1.5,
      icon: 'local-drink',
      color: '#5C6BC0',
    },
    {
      label: 'Bottle',
      amount: 2,
      icon: 'sports-bar',
      color: '#26A69A',
    },
  ];

  const handleQuickAction = (amount: number) => {
    onWaterLogged(amount);
  };

  const handleCustomAmount = () => {
    const amount = parseFloat(customAmount);
    if (isNaN(amount) || amount <= 0 || amount > 20) {
      Alert.alert(
        'Invalid Amount',
        'Please enter a valid amount between 0.1 and 20 glasses.',
      );
      return;
    }

    onWaterLogged(amount);
    setCustomAmount('');
    setShowCustomModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Water Intake</Text>
      <Text style={styles.subtitle}>How much water did you drink?</Text>

      <View style={styles.quickActionsGrid}>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.quickActionButton, {backgroundColor: action.color}]}
            onPress={() => handleQuickAction(action.amount)}
            activeOpacity={0.7}>
            <Icon name={action.icon} size={24} color="white" />
            <Text style={styles.quickActionText}>{action.label}</Text>
            <Text style={styles.quickActionAmount}>
              {action.amount === 1 ? '1 glass' : `${action.amount} glasses`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.customButton}
        onPress={() => setShowCustomModal(true)}
        activeOpacity={0.7}>
        <Icon name="edit" size={20} color="#2196F3" />
        <Text style={styles.customButtonText}>Custom Amount</Text>
      </TouchableOpacity>

      {/* Custom Amount Modal */}
      <Modal
        visible={showCustomModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCustomModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Custom Amount</Text>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={customAmount}
                onChangeText={setCustomAmount}
                placeholder="0.5"
                placeholderTextColor="#999"
                keyboardType="decimal-pad"
                autoFocus
              />
              <Text style={styles.inputLabel}>glasses</Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowCustomModal(false);
                  setCustomAmount('');
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleCustomAmount}>
                <Text style={styles.confirmButtonText}>Log Water</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  quickActionButton: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  quickActionAmount: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#2196F3',
    backgroundColor: 'white',
  },
  customButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    margin: 20,
    minWidth: 280,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#2196F3',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 18,
    textAlign: 'center',
    minWidth: 80,
    marginRight: 10,
    backgroundColor: '#F8F9FA',
  },
  inputLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  modalButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  confirmButton: {
    backgroundColor: '#2196F3',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WaterLogger; 