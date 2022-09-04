import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { getAddVolunteerUrl } from '../../api/postApiServices'
import { Footer, Navbar } from '../../components'
import {
  Button, Center, Flex, SectionTitle, ErrorMsg, Input, ResponseMsg
} from '../../components/common'
import { CustomInputDiv } from '../../components/common/CustomInput'
import { useAppSelector, useFormSubmit } from '../../hooks'
import { volunteerSchema } from '../../validation/schemas'

type TVolunteerSubmitForm = {
  firstName: string
  lastName: string
  user_email: string
  home_address: string
}

function BecomeVolunteerForm() {
  const ongId = useAppSelector((state) => state.ong.ongId) || ''
  const {
    handleSubmit, register, formState: { errors }
  } = useForm<TVolunteerSubmitForm>({ resolver: yupResolver(volunteerSchema) })

  const { submit, ...states } = useFormSubmit<TVolunteerSubmitForm>(getAddVolunteerUrl())

  const onSubmit = (data: TVolunteerSubmitForm) => {
    const formData = { ...data, ong_id: ongId }
    submit(formData)
  }
  return (
    <>
      <Navbar />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ResponseMsg
          {...states}
          successMsg="Your request has been sent successfully"
          errorMsg="Something went wrong, please try again"
          successId="volunteer-form-success"
          errorId="volunteer-form-error"
        />
        <SectionTitle textAlign="center" fontSize={2.4}>
          I want to volunteer
        </SectionTitle>
        <Flex wrap="nowrap" justify="space-around" gap={2}>
          <CustomInputDiv>
            <Input placeholder="First Name" {...register('firstName')} />
            <ErrorMsg>{errors.firstName?.message}</ErrorMsg>
          </CustomInputDiv>

          <CustomInputDiv>
            <Input placeholder="Surname" {...register('lastName')} />
            <ErrorMsg>{errors.lastName?.message}</ErrorMsg>
          </CustomInputDiv>
        </Flex>

        <Input placeholder="Email" {...register('user_email')} />
        <ErrorMsg>{errors.user_email?.message}</ErrorMsg>
        <Input placeholder="Address" {...register('home_address')} />
        <ErrorMsg>{errors.home_address?.message}</ErrorMsg>

        <Center>
          <Button px="2.8rem" type="submit">
            Send
          </Button>
        </Center>
      </Form>
      <Footer />
    </>
  )
}

const Form = styled.form`
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`

export default BecomeVolunteerForm
