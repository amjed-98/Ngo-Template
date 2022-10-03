import useFetch from 'hooks/useFetch';
import { getNgoConfigUrl } from 'api/getApiServices';
import { type AxiosError } from 'axios';
import queryCacheKeys from 'api/query-cache-keys';

type TNgoConfigCamelCased = {
  [key in keyof Omit<TNgoConfig, 'ong_id' | 'id'> as SnakeToCamelCase<key>]: TNgoConfig[key];
};

type ReturnType = TNgoConfigCamelCased & {
  ngoId: string;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

const useNgoConfig = (): ReturnType => {
  const {
    data: {
      ong_id: ngoId = '',
      active = false,
      currency = 'EUR',
      currency_symbol: currencySymbol = '€',
      language = 'es',
      payment_method: paymentMethod = 'paypal',
      powered_by_lazzaro: poweredByLazzaro = false,
      url = '',
    } = {},
    isLoading,
    isError,
    error,
  } = useFetch<TNgoConfig>(getNgoConfigUrl(), queryCacheKeys.ngoConfig);

  return {
    ngoId,
    active,
    currency,
    currencySymbol,
    language,
    poweredByLazzaro,
    url,
    paymentMethod,
    isLoading,
    isError,
    error,
  };
};

export default useNgoConfig;
