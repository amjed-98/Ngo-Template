import queryCacheKeys from 'api/query-cache-keys';
import { getCoursesURL } from 'api/getApiServices';
import { type AxiosError } from 'axios';
import useNgoConfig from 'hooks/Api/useNgoConfig';
import useFetch from 'hooks/useFetch';

type ReturnType = {
  courses: TEvent[];
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

const useCourses = (): ReturnType => {
  const { ngoId } = useNgoConfig();

  const {
    data: courses = [],
    isLoading,
    isError,
    error,
  } = useFetch<TCourse[]>(getCoursesURL(ngoId), queryCacheKeys.courses, ngoId);

  return {
    courses,
    isLoading,
    isError,
    error,
  };
};

export default useCourses;
