import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface DetailCardProps {
  title: string;
  iconName?: React.ComponentProps<typeof Feather>['name'];
  children: React.ReactNode;
}

export const DetailCard: React.FC<DetailCardProps> = ({ title, iconName, children }) => (
  <View style={detailCardStyles.container}>
    <View style={detailCardStyles.header}>
      {iconName && <Feather name={iconName} size={18} color={Colors.primary} style={detailCardStyles.icon} />}
      <Text style={detailCardStyles.title}>{title}</Text>
    </View>
    <View>{children}</View>
  </View>
);

const detailCardStyles = StyleSheet.create({
  container: { backgroundColor: Colors.card, borderRadius: 16, padding: 16, marginBottom: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  icon: { marginRight: 8 },
  title: { color: Colors.text, fontFamily: 'Poppins_700Bold', fontSize: 18 },
});