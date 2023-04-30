import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButton } from 'react-navigation-header-buttons';

const MaterialHeaderButton = (props) => (
    <HeaderButton
        {...props}
        IconComponent={Ionicons}
        iconSize={23}
        color={Platform.OS === 'android' ? 'white' : '#007AFF'}
    />
);

export default MaterialHeaderButton;
