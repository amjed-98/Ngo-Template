import { type Params, useParams } from 'react-router-dom';
import { getFinalizeDonationUrl } from '../../api/postApiServices';
import FinalizePayment from '../../components/FinalizePaymentResult';
import { useFinalizePayment, useNgoConfig } from '../../hooks';

type TParams = Omit<FinalizePaymentParams, 'home_address'>;

function FinalizeDonation() {
  const { ngoId } = useNgoConfig();

  const url = getFinalizeDonationUrl(ngoId);

  const {
    firstName = '',
    lastName = '',
    user_email = '',
    amount = '0',
    nif = '',
    certificate = '',
    anonymous = '',
    text = '',
  } = useParams<Params<keyof Omit<TParams, 'ong_id'>>>();

  const params: TParams = {
    firstName,
    lastName,
    user_email,
    amount: +amount,
    anonymous: anonymous === 'true',
    certificate: certificate === 'true',
    nif,
    text,
    ong_id: ngoId,
  };

  const { isLoading, isError, transactionId } = useFinalizePayment<TParams>({ params, url });

  return (
    <FinalizePayment
      transactionId={transactionId}
      isLoading={isLoading}
      isError={isError}
      redirectPath='donate'
      sectionId={ngoId}
    />
  );
}

export default FinalizeDonation;
