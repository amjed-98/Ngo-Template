import { type ReactElement } from 'react'
import styled from 'styled-components'
import { type TypeOf } from 'yup'
import { getStartProductPaymentUrl } from 'api/postApiServices'
import { useFormSubmit, useManageForm, useNgoConfig } from 'hooks'
import { buyProductSchema } from 'validation/schemas'
import {
  Button, Center, Input, Label, SectionTitle, TextArea, ErrorMsg, ResponseMsg
} from 'components/common'

interface IProps {
  modal?: boolean;
  id: string;
  price: number;
  title: string;
}

type TFormSubmitData = TypeOf<typeof buyProductSchema>

export function BuyProductForm(props: IProps): ReactElement {
  const {
    modal, id, price, title
  } = props

  const { ngoId = '' } = useNgoConfig()

  const {
    register, handleSubmit, errors, reset
  } = useManageForm<TFormSubmitData>(buyProductSchema)

  const {
    submit, ...states
  } = useFormSubmit<TFormSubmitData, true>({ url: getStartProductPaymentUrl(), redirectPath: 'shop' })

  const onSubmit = (data: TFormSubmitData) => {
    const donationInfo = {
      ...data,
      ong_id: ngoId,
      product_id: id,
      amount: price,
    }

    submit(donationInfo)
    reset()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ResponseMsg
        {...states}
        successMsg="Payment done successfully"
        errorMsg="Payment failed"
        successId={`donation_success${id}`}
        errorId={`donation_failed${id}`}
      />
      {modal && <CustomSectionTitle padding={0} textAlign="center" fontSize="x-large">{title}</CustomSectionTitle>}

      <InputTitle>Your Shopping</InputTitle>

      <Input
        placeholder="Enter the quantity of products"
        type="number"
        min="1"
        defaultValue={1}
        {...register('productAmount')}
      />
      <ErrorMsg>{errors.productAmount?.message}</ErrorMsg>
      <InputTitle>Personal Details</InputTitle>
      <InputRow>
        <Input placeholder="Name" {...register('firstName')} />
        <Input placeholder="Surname" {...register('lastName')} />
      </InputRow>

      <InputRow>
        <ErrorMsg>{errors.lastName?.message}</ErrorMsg>
        <ErrorMsg>{errors.firstName?.message}</ErrorMsg>
      </InputRow>

      <InputRow>
        <Input placeholder="Email" {...register('user_email')} />
        <Input placeholder="Phone" {...register('mobile_phone')} />
      </InputRow>

      <InputRow>
        <ErrorMsg>{errors.user_email?.message}</ErrorMsg>
        <ErrorMsg>{errors.mobile_phone?.message}</ErrorMsg>
      </InputRow>

      <InputTitle>Delivery Details</InputTitle>
      <InputRow>
        <Input placeholder="Address" {...register('home_address')} />
        <Input placeholder="DNI" {...register('nif')} />
      </InputRow>
      <InputRow>
        <ErrorMsg>{errors.home_address?.message}</ErrorMsg>
        <ErrorMsg>{errors.nif?.message}</ErrorMsg>
      </InputRow>

      <InputRow>
        <Input placeholder="Date of Birth" type="date" {...register('birthDate')} />
        <Input placeholder="Postal Code" {...register('cp')} type="number" />
      </InputRow>

      <InputRow>
        <ErrorMsg>{errors.birthDate?.message}</ErrorMsg>
        <ErrorMsg>{errors.cp?.message}</ErrorMsg>
      </InputRow>

      <InputRow>
        <Input placeholder="City" {...register('city')} />
        <Input placeholder="Country" {...register('country')} />
      </InputRow>

      <InputRow>
        <ErrorMsg>{errors.home_address?.message}</ErrorMsg>
        <ErrorMsg>{errors.nif?.message}</ErrorMsg>
      </InputRow>

      <TextArea placeholder="Additional message" rows={4} />

      <Label>
        <Input w="20px" mt={1.8} type="checkbox" {...register('privacy_policy')} />I accept the
        privacy policy
        <ErrorMsg>{errors.privacy_policy?.message}</ErrorMsg>
      </Label>
      <br />
      <Center my={1.5}>
        <Button py="0.8rem" px="2.4rem" type="submit">
          Pay
        </Button>
      </Center>
    </form>
  )
}

const InputTitle = styled.h3`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  margin-top: 1.2rem;
  font-size: 1.1rem;
`

const InputRow = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 0.8rem;
  justify-content: space-between;
`

const CustomSectionTitle = styled(SectionTitle)`
 @media screen and (max-width: 540px) {
   font-size: 1.4rem;
 }
`

BuyProductForm.defaultProps = {
  modal: false,
}
