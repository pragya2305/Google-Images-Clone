import { useEffect, useState } from "react";
import axios from 'axios'

const BASE_URL = 'https://picsum.photos/v2/list/';
const useFetchImages = (page) => {
  const [images, setImages] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
        setIsLoading(true);
      try {
        const {data} = await axios(BASE_URL,{params:{page,limit:30}});
        setImages((prevImages) => [...prevImages, ...data]);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Error while fetching images. Please try again.")
      }
      setIsLoading(false);
    })();
  }, [page]);

  return {images,isloading,error}
};

export default useFetchImages;
