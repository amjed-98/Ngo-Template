import { getProjectImagesURL } from 'api/getApiServices';
import useFetch from 'hooks/useFetch';
import { type AxiosError } from 'axios';

type ReturnType = {
  images: TProjectImage[];
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};
const useProjectImages = (projectId: string): ReturnType => {
  const {
    data: images = [],
    isLoading,
    isError,
    error,
  } = useFetch<TProjectImage[]>(getProjectImagesURL(projectId), [`project-images${projectId}`], projectId);

  return {
    images,
    isLoading,
    isError,
    error,
  };
};

export default useProjectImages;
