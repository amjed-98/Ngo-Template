import { type ReactElement } from 'react'
import styled from 'styled-components'
import { ClockCircleFilled, HeatMapOutlined } from '@ant-design/icons'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import { useFetch } from 'hooks'
import { Card, Flex, Text } from 'components/common'
import BuyEventForm from 'components/Forms/BuyEventForm'
import { getEventImages } from 'api/getApiServices'
import { IEvent, IImage } from 'types/interfaces'
import BuyModal from 'components/Modal'
import BuyCourseForm from 'components/Forms/BuyCourseForm'
import { ShareModal } from 'components/ShareModal/ShareModal'
import { EventCarousel } from './EventCarousel'

export function EventCard(props: IEvent): ReactElement {
  const {
    id, title, start_time, end_time, location, stock, course
  } = props

  const { pathname } = useLocation()
  const startDate = moment(start_time).format('Do MMM YYYY')
  const endDate = moment(end_time).format('Do MMM YYYY')
  const {
    data: images = [], isLoading
  } = useFetch<IImage[]>(getEventImages(id), [`event_images_form_${id}`], id)

  const Form = course
    ? <BuyCourseForm courseId={id} />
    : <BuyEventForm modal event={props} />

  return (
    <Card mode="column" px={1.8} py={2.4} smMode="column">
      <EventCardTitle title={title}>{title}</EventCardTitle>

      <Text color="#8c8c8c">
        <ClockCircleFilled /> {startDate} - {endDate}
      </Text>

      <Text lineHeight={1.7}>
        <HeatMapOutlined />
        {location}
      </Text>

      <Text weight="bold" color="#8c8c8c" fontSize={1.1}>
        Tickets available: <span>{stock}</span>
      </Text>

      <Flex gap={2} mt={1}>
        <ShareModal section={pathname.includes('events') ? 'events' : 'courses'} sectionId={id} />

        <BuyModal title={`Buy ${course ? 'course' : 'ticket'}`} btnText="Buy">
          <EventCarousel images={images} isLoading={isLoading} />
          {Form}
        </BuyModal>
      </Flex>
    </Card>
  )
}

const EventCardTitle = styled.h3`
  color: ${({ theme }) => theme.primary};
  font-size: 1.8rem;
  font-weight: 600;
  width: 100%;
  margin-bottom: 0rem;
`