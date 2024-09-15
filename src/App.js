import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './App.css';
import Spinner from 'react-bootstrap/Spinner';
import { ImageGrid, ImagePopover } from './components';
import { useFetchImages, useInfinityScroll } from './hooks';

const App = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [page, setPage] = useState(0);
	const { images, isLoading, error, hasMore } = useFetchImages(page);

	const loadMoreImages = useCallback(() => {
		setPage((prevPage) => prevPage + 1);
	}, []);

	const loadMore = useInfinityScroll(isLoading, hasMore, loadMoreImages);

	const openPopover = useCallback((image) => {
		setSelectedImage(image);
	}, []);

	const closePopover = useCallback(() => {
		setSelectedImage(null);
	}, []);

	return (
		<div className='app'>
			<header className='app-header'>
				<h1>Google Images Clone</h1>
			</header>
			<div className={`app-content${selectedImage ? '--shrink' : ''}`}>
				<ImageGrid
					selectedImage={selectedImage}
					images={images}
					onImageClick={openPopover}
					loadMore={loadMore}
				/>
				{isLoading && (
					<div>
						<Spinner
							animation='grow'
							variant='primary'
						/>
					</div>
				)}
				{error && <h3>{error}</h3>}
				{createPortal(
					<>
						{selectedImage && (
							<ImagePopover
								image={selectedImage}
								onClose={closePopover}
							/>
						)}
					</>,
					document.body
				)}
			</div>
		</div>
	);
};

export default App;
