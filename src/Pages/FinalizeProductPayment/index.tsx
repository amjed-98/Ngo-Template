import { type Params, useParams } from 'react-router-dom'
import { getFinalizeProductPaymentUrl } from '../../api/postApiServices'
import FinalizePayment from '../../components/FinalizePaymentResult'
import { useFinalizePayment, useNgoConfig } from '../../hooks'
import { TFinalizePaymentParams } from '../../types/types'

type TParams = Omit<TFinalizePaymentParams, 'anonymous' | 'certificate' | 'text'> & {
  product_id: string;
  mobilePhone: string;
  productAmount:number;
  cp:number;
  city:string;
  country:string;
  address:string;
};

function FinalizeProductPayment() {
  const { ngoId } = useNgoConfig()
  const url = getFinalizeProductPaymentUrl()

  const {
    firstName = '',
    lastName = '',
    user_email = '',
    nif = '',
    home_address = '',
    product_id = '',
    mobilePhone = '',
    amount = '0',
    productAmount = '0',
    cp = '0',
    city = '',
    country = '',
    address = '',
  } = useParams<Params<keyof Omit<TParams, 'ong_id'>>>()

  const params: TParams = {
    firstName,
    lastName,
    user_email,
    product_id,
    nif,
    home_address,
    ong_id: ngoId,
    mobilePhone,
    address,
    city,
    amount: +amount,
    country,
    cp: +cp,
    productAmount: +productAmount,
  }

  const { isLoading, isError, transactionId } = useFinalizePayment<TParams>({ params, url })

  return (
    <FinalizePayment
      transactionId={transactionId}
      isLoading={isLoading}
      isError={isError}
      redirectPath="shop"
      sectionId={product_id}
    />
  )
}

export default FinalizeProductPayment
