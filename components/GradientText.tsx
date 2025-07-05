import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text } from 'react-native';
import { Colors } from '../constants/Colors';

interface GradientTextProps {
  children: React.ReactNode;
  style?: object;
}

export const GradientText: React.FC<GradientTextProps> = (props) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[props.style, { backgroundColor: 'transparent' }]}>
          {props.children}
        </Text>
      }
    >
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[props.style, { opacity: 0 }]}>{props.children}</Text>
      </LinearGradient>
    </MaskedView>
  );
};
