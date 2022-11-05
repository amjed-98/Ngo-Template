import useProjects from 'hooks/Api/useProjects';
import useEvents from 'hooks/Api/useEvents';
import { type AxiosError } from 'axios';

type ReturnType = {
  isLoading: boolean;
  isError: boolean;
  error: [{ events: AxiosError<unknown, any> | null; projects: AxiosError<unknown, any> | null }];
  isPremiumSection: boolean;
  premiumSection: { premiumProject?: TProject; premiumEvent?: TEvent };
};

const usePremiumSection = (): ReturnType => {
  const { events, isError: isEventsError, isLoading: isEventsLoading, error: eventsError } = useEvents();
  const { projects, isError: isProjectsError, isLoading: isProjectsLoading, error: projectsError } = useProjects();

  const premiumEvent = events.find(({ isPremium }) => isPremium);
  const premiumProject = projects.find(({ isPremium }) => isPremium);
  const isPremiumSection = !!(premiumEvent || premiumProject);

  return {
    isError: isProjectsError || isEventsError,
    isLoading: isProjectsLoading || isEventsLoading,
    error: [{ events: eventsError, projects: projectsError }],
    isPremiumSection,
    premiumSection: { premiumEvent, premiumProject },
  };
};

export default usePremiumSection;
