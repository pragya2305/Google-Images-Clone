import React from 'react';
import './ImageGrid.css';
import ImageItem from '../ImageItem';

const ImageGrid = ({ images, onImageClick, loadMore }) => {
	return (
		<div className='image-grid'>
			{images.map((image, index) => {
				if (index === images.length - 1)
					return (
						<ImageItem
							ref={loadMore}
							key={index}
							image={image}
							onClick={() => onImageClick(image)}
						/>
					);
				return (
					<ImageItem
						key={index}
						image={image}
						onClick={() => onImageClick(image)}
					/>
				);
			})}
		</div>
	);
};

export default ImageGrid;
