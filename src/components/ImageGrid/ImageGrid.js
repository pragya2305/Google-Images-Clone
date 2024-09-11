import React from 'react';
import './ImageGrid.css';
import ImageItem from '../ImageItem';

const ImageGrid = ({ images, onImageClick }) => {
  return (
    <div className="image-grid">
      {images.map((image) => (
        <ImageItem key={image.id} image={image} onClick={() => onImageClick(image)} />
      ))}
    </div>
  );
};

export default ImageGrid;
