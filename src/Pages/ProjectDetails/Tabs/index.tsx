import { Tabs as AntdTabs } from 'antd';
import { getStartProjectDonationUrl } from 'api/postApiServices';
import { DonateForm } from 'components';
import { useNgoConfig, useFormSubmit } from 'hooks';
import { donationSchema } from 'validation/schemas';
import { type TypeOf } from 'yup';
import Description from './Description';
import LatestDonations from './LatestDonations';

const { TabPane } = AntdTabs;

type TFormSubmitData = TypeOf<typeof donationSchema>;

interface IProps {
  projectDetails: {
    id: string;
    description: string;
  };
}

function Tabs({ projectDetails }: IProps) {
  const { id = '', description = '' } = projectDetails;
  const { ngoId } = useNgoConfig();

  const { submit, ...states } = useFormSubmit<TFormSubmitData, true>({
    url: getStartProjectDonationUrl(ngoId),
    redirectPath: 'donate',
  });

  const handleSubmit = (values: TFormSubmitData) => {
    const donationInfo = { ...values, project_id: id, ong_id: ngoId };
    submit(donationInfo);
  };
  return (
    <AntdTabs defaultActiveKey='1'>
      <TabPane tab='Details' key='1'>
        <Description description={description} />
      </TabPane>

      <TabPane tab='Donate' key='2'>
        <DonateForm submitHandler={handleSubmit} projectId={id} states={states} />
      </TabPane>

      <TabPane tab='Historical' key='3'>
        <LatestDonations title='Historical' projectId={id} />
      </TabPane>
    </AntdTabs>
  );
}

export default Tabs;
