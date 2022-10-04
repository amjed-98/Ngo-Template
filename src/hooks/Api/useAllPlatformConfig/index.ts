import useFetch from 'hooks/useFetch';
import { getPlatformConfigUrl } from 'api/getApiServices';
import { type AxiosError } from 'axios';
import queryCacheKeys from 'api/query-cache-keys';
import useNgoConfig from '../useNgoConfig';

type TAllPlatformConfigCamelCased = {
  [key in keyof TAllPlatformConfig as SnakeToCamelCase<key>]: TAllPlatformConfig[key] | undefined;
};

type ReturnType = TAllPlatformConfigCamelCased & {
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

const useAllPlatformConfig = (): ReturnType => {
  const { ngoId } = useNgoConfig();

  const {
    data: { brand, team, contact, description, features, impactData, platformConfig, rrss } = {},
    isLoading,
    isError,
    error,
  } = useFetch<TAllPlatformConfig>(getPlatformConfigUrl(ngoId), queryCacheKeys.allPlatformConfig, !!ngoId);

  return {
    brand,
    team,
    contact,
    description,
    features,
    impactData,
    platformConfig,
    rrss,
    isLoading,
    isError,
    error,
  };
};

export default useAllPlatformConfig;
