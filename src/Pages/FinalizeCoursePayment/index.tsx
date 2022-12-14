import { type Params, useParams } from 'react-router-dom';
import { getFinalizeCoursePaymentUrl } from '../../api/postApiServices';
import FinalizePayment from '../../components/FinalizePaymentResult';
import { useFinalizePayment, useNgoConfig } from '../../hooks';

type TParams = Omit<FinalizePaymentParams, 'anonymous' | 'amount' | 'certificate'> & {
  course_id: string;
  mobilePhone: string;
};

function FinalizeCoursePayment() {
  const { ngoId } = useNgoConfig();

  const url = getFinalizeCoursePaymentUrl(ngoId);

  const {
    firstName = '',
    lastName = '',
    user_email = '',
    nif = '',
    home_address = '',
    text = '',
    course_id = '',
    mobilePhone = '',
  } = useParams<Params<keyof Omit<TParams, 'ong_id'>>>();

  const params: TParams = {
    firstName,
    lastName,
    user_email,
    course_id,
    nif,
    home_address,
    text,
    ong_id: ngoId,
    mobilePhone,
  };

  const { isLoading, isError, transactionId } = useFinalizePayment<TParams>({ params, url });

  return (
    <FinalizePayment
      transactionId={transactionId}
      isLoading={isLoading}
      isError={isError}
      redirectPath='#courses'
      sectionId={course_id}
    />
  );
}

export default FinalizeCoursePayment;
