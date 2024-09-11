import { useCallback, useRef } from 'react';

const useInfinityScroll = (isLoading, hasMore, increasePageNo) => {
	const observer = useRef();
	const lastElement = useCallback(
		(node) => {
			console.log(node, isLoading);
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					increasePageNo();
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore, increasePageNo]
	);
	return lastElement;
};

export default useInfinityScroll;
