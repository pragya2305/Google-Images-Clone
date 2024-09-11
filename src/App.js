import React, { useState, useCallback } from 'react';
import './App.css';
import Spinner from 'react-bootstrap/Spinner';
import { ImageGrid, ImagePopover } from './components';
import { useFetchImages } from './hooks';

function App() {
	const [selectedImage, setSelectedImage] = useState(null);
	const [page, setPage] = useState(0);
	const { images, isloading, error } = useFetchImages(page);

	const loadMoreImages = useCallback(() => {
		setPage((prevPage) => prevPage + 1);
	}, []);

	const openPopover = useCallback((image) => {
		setSelectedImage(image);
	}, []);

	const closePopover = useCallback(() => {
		setSelectedImage(null);
	}, []);

	return (
		<div className='App'>
			<header className='app-header'>
				<h1>Google Images Clone</h1>
			</header>
			<ImageGrid
				images={images}
				onImageClick={openPopover}
			/>
			{isloading && (
				<div>
					<Spinner
						animation='grow'
						variant='primary'
					/>
				</div>
			)}
			{error && <h3>{error}</h3>}
			<button
				className='load-more-button'
				onClick={loadMoreImages}
			>
				Load More
			</button>
			{selectedImage && (
				<ImagePopover
					image={selectedImage}
					onClose={closePopover}
				/>
			)}
		</div>
	);
}

export default App;
