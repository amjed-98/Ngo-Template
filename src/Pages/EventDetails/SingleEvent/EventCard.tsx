import { type ReactElement } from 'react';
import styled from 'styled-components';
import { ClockCircleFilled, HeatMapOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { Card, Flex, Text } from 'components/common';
import BuyEventForm from 'components/Forms/BuyEventForm';
import BuyModal from 'components/Modal';
import BuyCourseForm from 'components/Forms/BuyCourseForm';
import { ShareModal } from 'components/ShareModal/ShareModal';
import ImageCarousel from './ImageCarousel';

export function EventCard(props: TEventCamelCased): ReactElement {
  const { id, title, startTime, endTime, location, stock, course } = props;

  const { pathname } = useLocation();
  const startDate = moment(startTime).format('Do MMM YYYY');
  const endDate = moment(endTime).format('Do MMM YYYY');

  const Form = course ? <BuyCourseForm courseId={id} /> : <BuyEventForm modal event={props} />;

  return (
    <Card mode='column' px={1.8} py={2.4} smMode='column'>
      <EventCardTitle title={title}>{title}</EventCardTitle>

      <Text color='#8c8c8c'>
        <ClockCircleFilled /> {startDate} - {endDate}
      </Text>

      <Text lineHeight={1.7}>
        <HeatMapOutlined />
        {location}
      </Text>

      <Text weight='bold' color='#8c8c8c' fontSize={1.1}>
        Tickets available: <span>{stock}</span>
      </Text>

      <Flex gap={2} mt={1}>
        <ShareModal section={pathname.includes('events') ? 'events' : 'courses'} sectionId={id} />

        <BuyModal title={`Buy ${course ? 'course' : 'ticket'}`} btnText='Buy'>
          <ImageCarousel eventId={id} />
          {Form}
        </BuyModal>
      </Flex>
    </Card>
  );
}

const EventCardTitle = styled.h3`
  color: ${({ theme }) => theme.primary};
  font-size: 1.8rem;
  font-weight: 600;
  width: 100%;
  margin-bottom: 0rem;
`;
