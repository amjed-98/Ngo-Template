import { useNgoConfig } from 'hooks'
import { useNavigate } from 'react-router-dom'
import finalizePaymentRoutes from 'app/router/finalizePaymentRoutes'
import useMutate from '../useMutate'

type TClientSecret = { clientSecret: string };
type TPayPalLink = { data: string };
type TData = TClientSecret | TPayPalLink;

type TParameter<IsPayment> = IsPayment extends true
  ? { url: string; redirectPath: keyof typeof finalizePaymentRoutes }
  : string;

const useFormSubmit = <TMutate = never, IsPayment extends boolean = false>(
  parameters: TParameter<IsPayment>
) => {
  const navigate = useNavigate()
  const { paymentMethod } = useNgoConfig()

  const url = typeof parameters === 'string' ? parameters : parameters.url
  const redirectPath = typeof parameters === 'object' && parameters.redirectPath

  const {
    isLoading, isSuccess, isError, mutateAsync
  } = useMutate<TData, TMutate>(url)

  const submit = async (formData: TMutate) => {
    if (!redirectPath) {
      await mutateAsync(formData)
      return
    }

    if (paymentMethod === 'stripe') {
      const {
        data: { clientSecret },
      } = (await mutateAsync(formData)) as { data: TClientSecret }
      return navigate(`/checkout/${clientSecret}`, {
        state: { formData, redirectPath },
        replace: true,
      })
    }

    const {
      data: { data: payPalLink },
    } = (await mutateAsync(formData)) as { data: TPayPalLink }
    window.open(payPalLink, '_blank')
  }

  return {
    isLoading,
    isSuccess,
    isError,
    submit,
  } as {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    submit: (formData: TMutate) => Promise<void>;
  }
}

export default useFormSubmit
