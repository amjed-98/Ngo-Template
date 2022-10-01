import useFetch from 'hooks/useFetch'
import { getNgoConfigUrl } from 'api/getApiServices'
import { AxiosError } from 'axios'
import queryCacheKeys from '../query-cache-keys'

type ReturnType = {
  ngoId: string;
  active: boolean;
  currency: TNgoConfig['currency'];
  currencySymbol: TNgoConfig['currency_symbol'];
  language: TNgoConfig['language'];
  poweredByLazzaro: boolean;
  url: string;
  paymentMethod: TNgoConfig['payment_method'];
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
    ngoId: ngoConfig?.ong_id || '',
    active: ngoConfig?.active ?? false,
    currency: ngoConfig?.currency ?? 'EUR',
    currencySymbol: ngoConfig?.currency_symbol ?? '€',
    language: ngoConfig?.language ?? 'es',
    poweredByLazzaro: ngoConfig?.powered_by_lazzaro ?? false,
    url: ngoConfig?.url ?? '',
    paymentMethod: ngoConfig?.payment_method ?? 'paypal',
    isLoading,
    isError,
    error,
  }
}

export default useNgoConfig
