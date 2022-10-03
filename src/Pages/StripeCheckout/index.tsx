import { type SyntheticEvent, useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { type Location, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Center } from 'components/common';
import type { PaymentIntent } from '@stripe/stripe-js';
import finalizePaymentRoutes from 'app/router/finalizePaymentRoutes';
import { RenderIf } from 'components';

type TProps = {
  clientSecret: string;
};

type TLocationWithState = Location & {
  state: {
    formData: { [key: string]: string | number | boolean };
    redirectPath: keyof typeof finalizePaymentRoutes;
  };
};

export default function CheckoutForm({ clientSecret }: TProps) {
  const stripe = useStripe();
  const {
    state: { formData, redirectPath },
  } = useLocation() as TLocationWithState;
  const elements = useElements();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const finalizePaymentRoute = finalizePaymentRoutes[redirectPath]
    .split('/:')
    .map((param) => formData[param] ?? param)
    .join('/')
    .replaceAll(' ', '');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}${finalizePaymentRoute}`,
      },
    });

    if (['card_error', 'validation_error'].includes(error.type)) {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const retrievePaymentIntentStatus = async (): Promise<PaymentIntent.Status> => {
    if (!stripe || !clientSecret) return 'canceled';

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
    return paymentIntent?.status || 'canceled';
  };

  const setResponseMessage = async (status: PaymentIntent.Status) => {
    switch (status) {
      case 'succeeded':
        setMessage('Payment succeeded!');
        navigate('/payment-success');
        break;
      case 'processing':
        setMessage('Your payment is processing.');
        break;
      case 'requires_payment_method':
        setMessage('Your payment was not successful, please try again.');
        break;
      default:
        setMessage('Something went wrong.');
        break;
    }
  };

  useEffect(() => {
    retrievePaymentIntentStatus().then(setResponseMessage);
  }, [clientSecret]);

  return (
    <CheckoutFormStripe>
      <Form onSubmit={handleSubmit}>
        <PaymentElement id='payment-element' />

        <Center>
          <Button type='submit' disabled={isLoading || !stripe || !elements}>
            <span id='button-text'>
              {isLoading ? <div className='spinner' id='spinner' /> : 'Pay now'}
            </span>
          </Button>
        </Center>

        <RenderIf if={!!message}>
          <PaymentMessage>{message}</PaymentMessage>
        </RenderIf>
      </Form>
    </CheckoutFormStripe>
  );
}

const CheckoutFormStripe = styled.div`
  display: flex;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
  width: 100vw;

  #payment-element {
    margin-bottom: 24px;
  }

  /* Buttons and links */
  #submit {
    background: var(--primary-color);
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer !important;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }

  #submit:hover {
    filter: contrast(115%);
  }

  #submit:disabled {
    opacity: 0.5;
    cursor: default;
  }

  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }

  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .spinner:before,
  .spinner:after {
    position: absolute;
    content: '';
  }

  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }

  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
      min-width: initial;
    }
  }
`;

const Form = styled.form`
  width: 30vw;
  min-width: 500px;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1),
    0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
`;

const PaymentMessage = styled.div`
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
`;
