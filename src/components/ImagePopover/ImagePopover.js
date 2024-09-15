import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useFetchImagesDetails } from '../../hooks';
import './ImagePopover.css';

const ImagePopover = ({ image, onClose }) => {
	const { imageDetails, isLoading, error } = useFetchImagesDetails(image.id);

	useEffect(() => {
		// Close popover on Escape key press
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		// Cleanup
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [image.id, onClose]);

	const LoadContent = () => {
		if (error) {
			return <h3>{error}</h3>;
		} else if (isLoading || !imageDetails) {
			return (
				<div className='image-popover__loader'>
					<Spinner
						animation='grow'
						variant='primary'
					/>
				</div>
			);
		}
		return (
			<>
				<img
					src={imageDetails.download_url}
					alt={imageDetails.author}
				/>
				<div className='image-popover__image-details'>
					<p>
						<strong>Author:</strong> {imageDetails.author}
					</p>
					<p>
						<strong>Dimensions:</strong> {imageDetails.width} x{' '}
						{imageDetails.height}
					</p>
					<a
						href={imageDetails.url}
						target='_blank'
						rel='noopener noreferrer'
					>
						View on Picsum
					</a>
				</div>
			</>
		);
	};

	return (
		<div
			className='image-popover__content'
			onClick={(e) => e.stopPropagation()}
		>
			<button
				className='image-popover__close-button'
				onClick={onClose}
			>
				&times;
			</button>
			<LoadContent />
		</div>
	);
};

export default ImagePopover;
