import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchImagesDetails = (imageId) => {
	const [imageDetails, setImageDetails] = useState(null);
	const [isloading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { data } = await axios.get(
					`https://picsum.photos/id/${imageId}/info`
				);
				console.log(data, 'data');
				setImageDetails(data);
			} catch (error) {
				console.error('Error fetching image details:', error);
				setError('Error fetching image details. Please try again');
			} finally {
				setIsLoading(false);
			}
		})();
	}, [imageId]);

	return { imageDetails, isloading, error };
};

export default useFetchImagesDetails;
