import { type Params, useParams } from 'react-router-dom';
import { getFinalizeBecomeAPartnerUrl } from 'api/postApiServices';
import FinalizePayment from 'components/FinalizePaymentResult';
import { useFinalizePayment, useNgoConfig } from 'hooks';
import { TFinalizePaymentParams } from 'types/types';

type TParams = Omit<TFinalizePaymentParams, 'anonymous'> & {
  comunications: boolean;
};

function FinalizeSubscriptionDonation() {
  const { ngoId } = useNgoConfig();
  const url = getFinalizeBecomeAPartnerUrl();

  const {
    firstName = '',
    lastName = '',
    user_email = '',
    nif = '',
    home_address = '',
    text = '',
    comunications,
    certificate,
    amount = '0',
  } = useParams<Params<keyof Omit<TParams, 'ong_id'>>>();

  const params: TParams = {
    firstName,
    lastName,
    user_email,
    nif,
    home_address,
    text,
    ong_id: ngoId,
    comunications: comunications === 'true',
    certificate: certificate === 'true',
    amount: +amount,
  };

  const { isLoading, isError, transactionId } = useFinalizePayment<TParams>({ params, url });

  return (
    <FinalizePayment
      transactionId={transactionId}
      isLoading={isLoading}
      isError={isError}
      redirectPath='partners'
      sectionId={ngoId}
    />
  );
}

export default FinalizeSubscriptionDonation;
