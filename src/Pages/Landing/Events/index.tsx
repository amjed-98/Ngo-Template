import { useMemo, type ReactElement } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Flex, SectionTitle } from 'components/common'
import { useFetch, useNgoConfig } from 'hooks'
import { getEventsURL } from 'api/getApiServices'
import Skeleton from 'components/Skeleton'
import { IEvent } from 'types/interfaces'
import { RenderIf } from 'components'
import NearEvent from './NearEvent'
import OtherEvent from './OtherEvents'

function Events(): ReactElement {
  const { ngoId } = useNgoConfig()

  const {
    data: events = [], isLoading, isError,
  } = useFetch<IEvent[]>(getEventsURL(ngoId), ['events'], ngoId)

  // Get the nearest event
  const nearestEvent = useMemo(
    () => events?.sort((a, b): number => {
      if (a.course || b.course) return 0

      const aDate = moment(a.start_time)
      const bDate = moment(b.start_time)
      return aDate.diff(bDate)
    })[0],
    [events]
  )

  const memoizedEvents = useMemo(
    () => events?.map(
      (event) => event.id !== nearestEvent.id && !event.course && <OtherEvent key={event.id} {...event} />
    ),
    [events]
  )

  return (
    <>
      <SectionTitle>Events</SectionTitle>
      <EventsSection id="events">
        {isLoading && <Skeleton width={40} height={42} number={1} />}
        {!isLoading && <NearEvent {...nearestEvent} />}

        <OtherEvents gap={1}>

          <RenderIf if={isLoading}>
            <Skeleton width={25} height={12} number={3} />
          </RenderIf>

          {memoizedEvents}

          {isError && <h1>Error</h1>}
        </OtherEvents>
      </EventsSection>
    </>
  )
}

const EventsSection = styled(Flex)`
  padding-inline: 4.1rem;
  gap: 4rem;
  margin-top: 2.4rem;
  align-items: flex-start;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const OtherEvents = styled(Flex)`
  overflow-y: auto;
  height: 750px;
  align-items: flex-start;
  flex: 0.5;
  @media screen and (max-width: 576px) {
    height: 250px;
  }
`

export default Events
