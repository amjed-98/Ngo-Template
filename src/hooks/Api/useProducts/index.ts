import { type AxiosError } from 'axios';
import { getProductsURL } from 'api/getApiServices';
import useFetch from 'hooks/useFetch';
import useNgoConfig from 'hooks/Api/useNgoConfig';
import queryCacheKeys from 'api/query-cache-keys';

type ReturnType = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

const useProducts = (): ReturnType => {
  const { ngoId } = useNgoConfig();
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useFetch<Product[]>(getProductsURL(ngoId), queryCacheKeys.products, ngoId);

  return {
    products,
    isLoading,
    isError,
    error,
  };
};

export default useProducts;
