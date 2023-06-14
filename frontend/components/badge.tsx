import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Badge = ({text = '', backgroundColor = '#f77', textColor = '#fff'}) => {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={[styles.text, {color: textColor}]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 4,
    alignSelf: 'center',
    marginRight: 5,
  },
  text: {
    fontSize: 10,
  },
});

export default Badge;
