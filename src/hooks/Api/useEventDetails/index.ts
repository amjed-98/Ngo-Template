import { type AxiosError } from 'axios'
import useEvents from '../useEvents'

type TEventCamelCased = {
  [key in keyof TEvent as SnakeToCamelCase<key>]: TEvent[key];
};

type ReturnType = TEventCamelCased & {
  startTime: string;
  endTime: string;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};
const useEventDetails = (eventId: string): ReturnType => {
  const {
    events, isLoading, isError, error
  } = useEvents()

  const {
    EventTickets = [],
    course = false,
    description = '',
    end_time: endTime = '',
    start_time: startTime = '',
    id = '',
    location = '',
    imageURL = '',
    price = 0,
    stock = 0,
    title = '',
  } = events.find((event) => event.id === eventId) || {}

  return {
    EventTickets,
    course,
    description,
    endTime,
    id,
    location,
    imageURL,
    price,
    startTime,
    stock,
    title,
    isLoading,
    isError,
    error,
  }
}

export default useEventDetails
