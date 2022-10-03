import type { FC } from 'react';
import { Tabs } from 'antd';
import HtmlParser from 'html-react-parser';
import styled from 'styled-components';
import BuyEventForm from 'components/Forms/BuyEventForm';
import { ContactEventForm } from 'components/Forms/ContactEventForm';
import { useAllPlatformConfig, useGeocoding } from 'hooks';
import { RenderIf, Map } from 'components';
import ImageCarousel from './ImageCarousel';

type TProps = {
  event: TEventCamelCased;
};
const SingleEventDetails: FC<TProps> = ({ event }) => {
  const { contact: { address = '' } = {} } = useAllPlatformConfig();
  const { lat, lng } = useGeocoding(address);

  return (
    <Event>
      <ImageCarousel eventId={event.id} />
      <EventTitle>{event?.title}</EventTitle>
      {HtmlParser(event?.description || '')}

      <CustomTabs defaultActiveKey='1'>
        <Tabs.TabPane tab='Buy' key='1'>
          <BuyEventForm event={event} />
        </Tabs.TabPane>

        <RenderIf if={event?.location !== 'online'}>
          <Tabs.TabPane tab='Location' key='2'>
            <Map lat={lat} lng={lng} height={28} />
          </Tabs.TabPane>
        </RenderIf>

        <Tabs.TabPane tab='Contact' key='3'>
          <ContactEventForm id={event.id} />
        </Tabs.TabPane>
      </CustomTabs>
    </Event>
  );
};

export default SingleEventDetails;

const Event = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 60%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const EventTitle = styled.h2`
  color: black;
  margin-bottom: 0;
  font-size: 1.6rem;
  font-weight: bold;
  margin-top: 1.8rem;
`;

const CustomTabs = styled(Tabs)`
  .ant-tabs-nav-wrap {
    display: flex !important;
    justify-content: center !important;
    width: 100% !important;
  }

  .ant-tabs-nav-list {
    width: 100%;
    justify-content: space-around;
  }

  .ant-tabs-tab-btn {
    font-size: 1rem;
    font-weight: 600;
  }
`;
