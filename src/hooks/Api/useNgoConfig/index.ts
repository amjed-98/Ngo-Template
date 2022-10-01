import useFetch from 'hooks/useFetch'
import { getNgoConfigUrl } from 'api/getApiServices'
import { AxiosError } from 'axios'
import queryCacheKeys from '../query-cache-keys'

type ReturnType = {
  ngoConfig: TNgoConfig | undefined;
  ngoId: string | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

const useNgoConfig = (): ReturnType => {
  const {
    data: ngoConfig,
    isLoading,
    isError,
    error,
  } = useFetch<TNgoConfig>(getNgoConfigUrl(), queryCacheKeys.ngoConfig)

  return {
    ngoConfig,
    ngoId: ngoConfig?.ong_id,
    isLoading,
    isError,
    error,
  }
}

export default useNgoConfig
