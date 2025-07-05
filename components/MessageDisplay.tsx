import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

export const MessageDisplay: React.FC<{ title: string; message: string }> = ({ title, message }) => (
  <View style={messageStyles.container}>
    <Text style={messageStyles.title}>{title}</Text>
    <Text style={messageStyles.message}>{message}</Text>
  </View>
);

const messageStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, fontFamily: 'Poppins_700Bold', color: Colors.text, marginBottom: 8 },
  message: { fontSize: 16, fontFamily: 'Poppins_400Regular', color: Colors.muted, textAlign: 'center' },
});