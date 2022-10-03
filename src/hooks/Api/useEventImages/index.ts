import { getEventImagesUrl } from 'api/getApiServices';
import { type AxiosError } from 'axios';
import useFetch from 'hooks/useFetch';

type ReturnType = {
  images: TEventImage[];
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};
const useEventImages = (eventId: string): ReturnType => {
  const {
    data: images = [],
    isLoading,
    isError,
    error,
  } = useFetch<TEventImage[]>(getEventImagesUrl(eventId), [`event-images${eventId}`], eventId);

  return {
    images,
    isLoading,
    isError,
    error,
  };
};

export default useEventImages;
