import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useFetchImagesDetails } from '../../hooks';
import './ImagePopover.css';

const ImagePopover = ({ image, onClose }) => {
	const { imageDetails, isloading, error } = useFetchImagesDetails(image.id);

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
		} else if (isloading || !imageDetails) {
			return (
				<div className='loader'>
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
				<div className='image-details'>
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
			className='popover-overlay'
			onClick={onClose}
		>
			<div
				className='popover-content'
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className='close-button'
					onClick={onClose}
				>
					&times;
				</button>
				<LoadContent />
			</div>
		</div>
	);
};

export default ImagePopover;
