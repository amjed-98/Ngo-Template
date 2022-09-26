import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { type TypeOf } from 'yup'
import styled from 'styled-components'
import { getAddVolunteerUrl } from 'api/postApiServices'
import { Footer, Navbar } from 'components'
import {
  Button,
  Center,
  Flex,
  SectionTitle,
  ErrorMsg,
  Input,
  ResponseMsg,
  CustomInputDiv,
} from 'components/common'
import { useAppSelector, useFormSubmit } from 'hooks'
import { volunteerSchema } from 'validation/schemas'

type TFormSubmitData = TypeOf<typeof volunteerSchema>

function BecomeVolunteerForm() {
  const ongId = useAppSelector((state) => state.ong.ongId) || ''
  const {
    handleSubmit, register, formState: { errors }
  } = useForm<TFormSubmitData>({ resolver: yupResolver(volunteerSchema) })

  const { submit, ...states } = useFormSubmit<TFormSubmitData>(getAddVolunteerUrl())

  const onSubmit = (data: TFormSubmitData) => {
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
