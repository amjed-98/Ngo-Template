import { type ReactElement } from 'react';
import { type Params, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useEventDetails from 'hooks/Api/useEventDetails';
import { Footer, Navbar, RenderIf, Skeleton } from 'components';
import { ErrorMsg } from 'components/common';
import { EventCard } from './SingleEvent/EventCard';
import SingleEventDetails from './SingleEvent/SingleEventDetails';

function SingleEvent(): ReactElement {
  const { pathname } = useLocation();
  const isEvent = pathname.startsWith('/events');
  const isCourse = pathname.startsWith('/courses');
  const { id = '' } = useParams<Params<'id'>>();
  const { isLoading, isError, error, ...event } = useEventDetails(id);

  if (isError) return <ErrorMsg>{error?.message}</ErrorMsg>;
  if (isLoading) return <Skeleton number={1} height={40} width={60} />;

  return (
    <>
      <Navbar />
      <Container>
        <SingleEventDetails event={event} />
        <OtherEvents>
          <RenderIf if={isLoading}>
            <Skeleton number={1} height={22} width={26} />
          </RenderIf>

          <RenderIf if={isEvent && event?.course === false}>
            <EventCard {...event} />
          </RenderIf>

          <RenderIf if={isCourse && event?.course}>
            <EventCard {...event} />
          </RenderIf>
        </OtherEvents>
      </Container>
      <Footer />
    </>
  );
}

export default SingleEvent;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 4.2rem;
  gap: 2.4rem;
  margin-top: 3.2rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const OtherEvents = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding-inline: 1.2rem;
`;
