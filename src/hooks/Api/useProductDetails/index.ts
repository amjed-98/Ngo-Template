import useProducts from 'hooks/Api/useProducts';
import { type AxiosError } from 'axios';

type ReturnType = SnakeToCamelCase<Product> & {
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};
const useProductDetails = (productId: string): ReturnType => {
  const { products, isLoading, isError, error } = useProducts();

  const {
    description = '',
    id = '',
    price = 0,
    title = '',
    amount = 1,
    active = false,
    delivery_time: deliveryTime = '',
    discount = 0,
    createdAt = '',
    updatedAt = '',
    default_img: defaultImg = '',
    Ong = {} as TOng,
    ong_id: ongId = '',
  } = products.find((product) => product.id === productId) || {};

  return {
    description,
    id,
    price,
    title,
    isLoading,
    isError,
    error,
    amount,
    active,
    createdAt,
    deliveryTime,
    discount,
    Ong,
    ongId,
    updatedAt,
    defaultImg,
  };
};

export default useProductDetails;
