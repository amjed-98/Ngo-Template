import { type Params, useParams, useSearchParams } from 'react-router-dom';
import { getFinalizeProjectDonationUrl } from '../../api/postApiServices';
import { FinalizePaymentResult } from '../../components';
import { useFinalizePayment, useNgoConfig } from '../../hooks';
import { TFinalizePaymentParams } from '../../types/types';

type TParams = TFinalizePaymentParams & {
  project_id: string;
};

function FinalizeProjectDonation() {
  const { ngoId } = useNgoConfig();
  const token = useSearchParams()[0].get('token') || '';
  const url = getFinalizeProjectDonationUrl(ngoId, token);

  const {
    firstName = '',
    lastName = '',
    user_email = '',
    amount = '0',
    nif = '',
    home_address = '',
    certificate = '',
    anonymous = '',
    text = '',
    project_id = '',
  } = useParams<Params<keyof Omit<TParams, 'ong_id'>>>();

  const params: TParams = {
    firstName,
    lastName,
    user_email,
    amount: +amount,
    project_id,
    anonymous: anonymous === 'true',
    certificate: certificate === 'true',
    nif,
    home_address,
    text,
    ong_id: ngoId,
  };

  const { isLoading, isError, transactionId } = useFinalizePayment<TParams>({ params, url });

  return (
    <FinalizePaymentResult
      transactionId={transactionId}
      isLoading={isLoading}
      isError={isError}
      redirectPath='#causes'
      sectionId={project_id}
    />
  );
}

export default FinalizeProjectDonation;
