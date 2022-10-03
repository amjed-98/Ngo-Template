import { type AxiosError } from 'axios';
import { getEventsURL } from 'api/getApiServices';
import useFetch from 'hooks/useFetch';
import useNgoConfig from 'hooks/Api/useNgoConfig';
import queryCacheKeys from 'api/query-cache-keys';

type ReturnType = {
  events: TEvent[];
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

const useEvents = (): ReturnType => {
  const { ngoId } = useNgoConfig();
  const {
    data: events = [],
    isLoading,
    isError,
    error,
  } = useFetch<TEvent[]>(getEventsURL(ngoId), queryCacheKeys.events, ngoId);

  return {
    events,
    isLoading,
    isError,
    error,
  };
};

export default useEvents;
