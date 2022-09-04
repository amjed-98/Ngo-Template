import type { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button, Center, Input, TextArea, ErrorMsg, ResponseMsg
} from '../common'
import { useAppSelector, useFormSubmit } from '../../hooks'
import { getSendContactEventUrl } from '../../api/postApiServices'
import { contactEventSchema } from '../../validation/schemas'

interface IProps {
  id: string
}

type TContactEventForm = {
  name: string
  email: string
  text: string
}
export function ContactEventForm({ id }: IProps): ReactElement {
  const ongId = useAppSelector((state) => state.ong.ongId) || ''

  const {
    register, handleSubmit, formState: { errors }
  } = useForm<TContactEventForm>({ resolver: yupResolver(contactEventSchema), })

  const { submit, ...states } = useFormSubmit<TContactEventForm>(getSendContactEventUrl(ongId, id))

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <ResponseMsg
        {...states}
        successMsg="Message sent successfully"
        errorMsg="Error sending message"
        successId={`contact-event-form-${id}`}
        errorId={`contact-event-form-${id}`}
      />
      <Input
        placeholder="Name"
        {...register('name')}
      />
      <ErrorMsg>{errors?.name?.message} </ErrorMsg>
      <Input
        mt={0}
        placeholder="Email"
        {...register('email')}
      />
      <ErrorMsg>{errors?.email?.message}</ErrorMsg>
      <TextArea
        placeholder="Message"
        rows={4}
        {...register('text')}
      />
      <ErrorMsg>{errors?.text?.message}</ErrorMsg>

      <Center>
        <Button px={2.4} type="submit">Send</Button>
      </Center>
    </Form>
  )
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: left;
`
