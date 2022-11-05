import { type AxiosError } from 'axios';
import { getProjectsURL } from 'api/getApiServices';
import useFetch from 'hooks/useFetch';
import useNgoConfig from 'hooks/Api/useNgoConfig';
import queryCacheKeys from 'api/query-cache-keys';

type ReturnType = {
  projects: TProject[];
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

const useProjects = (): ReturnType => {
  const { ngoId } = useNgoConfig();
  const {
    data: projects = [],
    isLoading,
    isError,
    error,
  } = useFetch<TProject[]>(getProjectsURL(ngoId), queryCacheKeys.projects, ngoId);

  return {
    projects,
    isLoading,
    isError,
    error,
  };
};

export default useProjects;
