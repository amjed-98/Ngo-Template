import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, type ReactElement, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { type TypeOf } from 'yup'
import type { IEvent } from 'types/interfaces'
import { TModal } from 'types/types'
import { buyTicketSchema } from 'validation/schemas'
import { CustomInputDiv } from 'components/common/CustomInput'
import { useFormSubmit, useNgoConfig } from 'hooks'
import { getBuyEventTicketUrl } from 'api/postApiServices'
import {
  Button, Center, ErrorMsg, Input, ResponseMsg
} from 'components/common'

interface Props {
  modal?: TModal;
  event: IEvent;
}

type TFormSubmitData = TypeOf<typeof buyTicketSchema>

function BuyEventForm({ modal, event: { id, EventTickets, price } }: Props): ReactElement {
  const { ngoId, currency } = useNgoConfig()

  const {
    register, handleSubmit, formState: { errors }
  } = useForm<TFormSubmitData>({ resolver: yupResolver(buyTicketSchema), })

  const {
    submit, ...states
  } = useFormSubmit<TFormSubmitData, true>({ url: getBuyEventTicketUrl(id), redirectPath: 'events', })

  const onSubmit = (data: TFormSubmitData) => {
    const formData = {
      ...data,
      event_id: id,
      ong_id: ngoId,
    }

    submit(formData)
  }

  const ticketsInputs: JSX.Element[] = useMemo(
    () => EventTickets.map((ticket, i: number) => (
      <Fragment key={ticket.id}>
        <CustomLabel>
          {ticket.type} ({ticket.price}
          {currency})
        </CustomLabel>
        <Input type="hidden" {...register(`tickets.${i}.id`)} value={ticket.id} />
        <Input
          type="number"
          placeholder="Please enter the number of tickets"
          {...register(`tickets.${i}.amount`)}
        />
      </Fragment>
    )),
    [EventTickets, register, currency]
  )
  return (
    <BuyFrom modal={modal} onSubmit={handleSubmit(onSubmit)}>
      <ResponseMsg
        {...states}
        successMsg="Please navigate to the payment page to complete your purchase"
        errorMsg="Something went wrong, please try again later"
        successId={`${id}_success`}
        errorId={`${id}_error`}
      />
      {EventTickets && (
        <div>
          <FormTitle>Number of entries {price}</FormTitle>
          <p>
            Only one ticket per person. You can buy more tickets by repeating the purchase process.
          </p>

          {ticketsInputs}
        </div>
      )}

      <FormTitle>Personal Details</FormTitle>
      <FormRow modal={modal}>
        <CustomInputDiv>
          <Input placeholder="First Name" {...register('firstName')} />
          <ErrorMsg>{errors.firstName?.message}</ErrorMsg>
        </CustomInputDiv>

        <CustomInputDiv>
          <Input placeholder="SurName" {...register('lastName')} />
          <ErrorMsg>{errors.lastName?.message}</ErrorMsg>
        </CustomInputDiv>
      </FormRow>

      <FormRow modal={modal}>
        <CustomInputDiv>
          <Input type="email" placeholder="Email" {...register('user_email')} />
          <ErrorMsg>{errors.user_email?.message}</ErrorMsg>
        </CustomInputDiv>

        <CustomInputDiv>
          <Input type="tel" placeholder="Phone" {...register('mobilePhone')} />
          <ErrorMsg>{errors.mobilePhone?.message}</ErrorMsg>
        </CustomInputDiv>
      </FormRow>

      <CheckBoxInput type="checkbox" {...register('terms_and_conditions')} />

      <span>
        I accept the <a href="#">privacy terms</a>
      </span>

      <ErrorMsg>{errors.terms_and_conditions?.message}</ErrorMsg>
      <Center>
        <Button px="2.8rem">Pay</Button>
      </Center>
    </BuyFrom>
  )
}

export default BuyEventForm

const BuyFrom = styled.form<{ modal: TModal }>`
  width: ${({ modal }) => (modal ? '60%' : '100%')};
  margin: auto;
`
const FormTitle = styled.h2`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  margin-top: 3.2rem;
`

const FormRow = styled.div<{ modal: TModal }>`
  display: flex;
  flex-direction: ${({ modal }) => (modal ? 'column' : 'row')};
  gap: 0.8rem;
  margin-top: 1.2rem;
`

const CheckBoxInput = styled.input`
  margin-top: 2.4rem;
  width: 30px;
`

const CustomLabel = styled.label`
  font-size: 1.1rem;
  font-weight: 700;
`
BuyEventForm.defaultProps = {
  modal: false,
}
