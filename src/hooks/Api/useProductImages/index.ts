import { getProductImages } from 'api/getApiServices';
import useFetch from 'hooks/useFetch';
import { type AxiosError } from 'axios';

type ReturnType = {
  images: ProductImage[];
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};
const useProjectImages = (productId: string): ReturnType => {
  const {
    data: images = [],
    isLoading,
    isError,
    error,
  } = useFetch<ProductImage[]>(getProductImages(productId), [`product-images${productId}`], productId);

  return {
    images,
    isLoading,
    isError,
    error,
  };
};

export default useProjectImages;
