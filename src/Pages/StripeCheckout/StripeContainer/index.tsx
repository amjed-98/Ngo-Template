import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Params, useParams } from 'react-router-dom'
import CheckoutForm from '..'

const stripePromise = loadStripe('pk_test_b8602Fd2SVOySbs7AngcMs68')

function StripeContainer() {
  const { secret: clientSecret = '' } = useParams<Params<'secret'>>()

  const options = {
    clientSecret,
  }

  if (!clientSecret) {
    return null
  }

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm clientSecret={clientSecret} />
      </Elements>
    </div>
  )
}

export default StripeContainer
