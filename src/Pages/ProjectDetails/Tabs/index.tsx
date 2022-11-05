import { Tabs as AntdTabs } from 'antd';
import ProjectDonateForm from 'components/Forms/ProjectDonateForm';
import Description from './Description';
import LatestDonations from './LatestDonations';

const { TabPane } = AntdTabs;

type Props = {
  projectDetails: SnakeToCamelCase<TProject>;
};

function Tabs({ projectDetails }: Props) {
  const { id = '', description = '' } = projectDetails;

  return (
    <AntdTabs defaultActiveKey='1'>
      <TabPane tab='Details' key='1'>
        <Description description={description} />
      </TabPane>

      <TabPane tab='Donate' key='2'>
        <ProjectDonateForm projectId={id} />
      </TabPane>

      <TabPane tab='Historical' key='3'>
        <LatestDonations title='Historical' projectId={id} />
      </TabPane>
    </AntdTabs>
  );
}

export default Tabs;
