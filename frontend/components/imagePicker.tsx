import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

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

  return (
    <View>
      {images.map((image, index) => (
        <TouchableOpacity key={index} onPress={() => handleImagePress(image)}>
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, margin: 10, borderColor: 'black', borderWidth: selectedImage === image ? 2 : 0 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ImagePicker;