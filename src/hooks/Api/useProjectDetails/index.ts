import useProjects from 'hooks/Api/useProjects';
import { type AxiosError } from 'axios';

type ReturnType = SnakeToCamelCase<TProject> & {
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};
const useProjectDetails = (projectId: string): ReturnType => {
  const { projects, isLoading, isError, error } = useProjects();

  const {
    description = '',
    id = '',
    imageURL = '',
    price = 0,
    title = '',
    amount = 1,
    donated = 0,
    active = false,
    delivery_time: deliveryTime = '',
    discount = 0,
    createdAt = '',
    updatedAt = '',
    Ong = {} as TOng,
    ong_id: ongId = '',
    isPremium = false,
  } = projects.find((project) => project.id === projectId) || {};

  return {
    description,
    id,
    imageURL,
    price,
    title,
    isLoading,
    isError,
    error,
    amount,
    donated,
    isPremium,
    active,
    createdAt,
    deliveryTime,
    discount,
    Ong,
    ongId,
    updatedAt,
  };
};

export default useProjectDetails;
