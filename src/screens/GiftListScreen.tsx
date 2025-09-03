import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useGifts } from '../context/GiftContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  GiftList: undefined;
  AddGift: undefined;
};

type GiftListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'GiftList'>;
};

const GiftListScreen: React.FC<GiftListScreenProps> = ({ navigation }) => {
  const { gifts, removeGift } = useGifts();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddGift')}
      >
        <Text style={styles.addButtonText}>Add New Gift</Text>
      </TouchableOpacity>

      {gifts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No gifts added yet</Text>
        </View>
      ) : (
        <FlatList
          data={gifts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.giftItem}>
              <View style={styles.giftInfo}>
                <Text style={styles.giftName}>{item.name}</Text>
                <Text style={styles.giftDetails}>
                  For: {item.recipient} - ${item.price}
                </Text>
                {item.notes && (
                  <Text style={styles.giftNotes}>{item.notes}</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeGift(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  giftItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  giftInfo: {
    flex: 1,
  },
  giftName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  giftDetails: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  giftNotes: {
    fontSize: 14,
    color: '#95a5a6',
    marginTop: 4,
    fontStyle: 'italic',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: '#95a5a6',
  },
});