import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  images: string[];
  onSelect: (selectedImage: string) => void;
};

const ImagePicker: React.FC<Props> = ({ images, onSelect }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImagePress = (image: string) => {
    setSelectedImage(image);
    onSelect(image);
  };

  const pairs = [];
  for (let i = 0; i < images.length; i += 2) {
    const pair = [images[i], images[i + 1]];
    pairs.push(pair);
  }

  return (
    <>
      {pairs.map((pair, index) => (
        <View key={index} style={styles.imageContainer}>
          <TouchableOpacity onPress={() => handleImagePress(pair[0])}>
            <Image
              source={{ uri: pair[0] }}
              style={[styles.image, selectedImage === pair[0] && styles.selectedImage]}
            />
          </TouchableOpacity>
          {pair[1] && (
            <TouchableOpacity onPress={() => handleImagePress(pair[1])}>
              <Image
                source={{ uri: pair[1] }}
                style={[styles.image, selectedImage === pair[1] && styles.selectedImage]}
              />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    borderColor: 'black',
    borderWidth: 0,
  },
  selectedImage: {
    borderWidth: 2,
  },
});