import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchImagesDetails = (imageId) => {
	const [imageDetails, setImageDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			setError(null);
			try {
				const { data } = await axios.get(
					`https://picsum.photos/id/${imageId}/info`
				);
				setImageDetails(data);
			} catch (error) {
				console.error('Error fetching image details:', error);
				setError('Error fetching image details. Please try again');
			} finally {
				setIsLoading(false);
			}
		})();
	}, [imageId]);

	return {
		imageDetails,
		isLoading,
		error,
	};
};

export default useFetchImagesDetails;
