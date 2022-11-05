import { type AxiosError } from 'axios';
import useEvents from '../useEvents';

type TEventCamelCased = {
  [key in keyof TEvent as SnakeToCamelCase<key>]: TEvent[key];
};

type ReturnType = TEventCamelCased & {
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};
const useEventDetails = (eventId: string): ReturnType => {
  const { events, isLoading, isError, error } = useEvents();

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
    amount = 0,
    donated = 0,
    recurrent = false,
    salesEndDate = '12-12-2012',
    salesStartDate = '12-12-2012',
    stripe_id: stripeId = '',
    type = 'Online',
    video_url: videoUrl = '',
    isPremium = false,
  } = events.find((event) => event.id === eventId) || {};

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
    amount,
    donated,
    recurrent,
    salesEndDate,
    salesStartDate,
    stripeId,
    type,
    videoUrl,
    isPremium,
  };
};

export default useEventDetails;
