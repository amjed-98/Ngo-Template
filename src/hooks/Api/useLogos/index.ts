import queryCacheKeys from 'api/query-cache-keys';
import { getOngLogos } from 'api/getApiServices';
import useNgoConfig from 'hooks/Api/useNgoConfig';
import useFetch from 'hooks/useFetch';
import type { AxiosError } from 'axios';

type ReturnType = {
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
  logos: TLogo[];
};

const useLogos = (): ReturnType => {
  const { ngoId, isLoading: isNgoLoading, isError: isNgoError, error: ngoConfigError } = useNgoConfig();

  const {
    data: logos = [],
    isLoading,
    isError,
    error,
  } = useFetch<TLogo[]>(getOngLogos(ngoId), queryCacheKeys.logos, ngoId);

  return {
    logos,
    isLoading: isNgoLoading || isLoading,
    isError: isNgoError || isError,
    error: ngoConfigError || error,
  };
};

export default useLogos;
