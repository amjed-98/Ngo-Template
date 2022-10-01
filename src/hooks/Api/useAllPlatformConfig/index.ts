import useFetch from 'hooks/useFetch'
import { getPlatformConfigUrl } from 'api/getApiServices'
import { AxiosError } from 'axios'
import queryCacheKeys from '../query-cache-keys'
import useNgoConfig from '../useNgoConfig'

type ReturnType = {
  brand: TBrand | undefined;
  team: Readonly<TTeam[]> | undefined;
  contact: TContact | undefined;
  description: TDescription | undefined;
  features: TFeatures | undefined;
  impactData: Readonly<TImpactData[]> | undefined;
  platformConfig: TNgoConfig | undefined;
  rrss: TRrss | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

const useAllPlatformConfig = (): ReturnType => {
  const { ngoId = '' } = useNgoConfig()

  const {
    data: {
      brand,
      team,
      contact,
      description,
      features,
      impactData,
      platformConfig,
      rrss,
    } = {},

    isLoading,
    isError,
    error,
  } = useFetch<TAllPlatformConfig>(getPlatformConfigUrl(ngoId), queryCacheKeys.allPlatformConfig, !!ngoId)

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
  }
}

export default useAllPlatformConfig
