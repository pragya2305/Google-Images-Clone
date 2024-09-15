import React, { forwardRef } from 'react';
import './ImageItem.css';

const ImageItem = forwardRef(({ image, onClick }, ref) => {
	return (
		<div
			className='image-item'
			onClick={onClick}
			ref={ref}
		>
			<img
				src={`https://picsum.photos/id/${image.id}/300/200`}
				alt={image.author}
				loading='lazy'
			/>
			<div className='image-overlay'>
				<p>{image.author}</p>
			</div>
		</div>
	);
});

export default ImageItem;
