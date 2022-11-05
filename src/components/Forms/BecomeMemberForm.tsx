import { Radio } from 'antd';
import type { ReactElement } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import moment from 'moment';
import { type TypeOf } from 'yup';
import { Footer, Navbar } from 'components';
import { Button, Center, Input, ErrorMsg, ResponseMsg, CustomInputDiv } from 'components/common';
import { useFormSubmit, useManageForm, useNgoConfig } from 'hooks';
import { getBecomePartnerUrl } from 'api/postApiServices';
import { memberSchema } from 'schemas';

type TFormSubmitData = TypeOf<typeof memberSchema>;

export default function BecomeMemberForm(): ReactElement {
  const { ngoId = '' } = useNgoConfig();

  const { register, handleSubmit, errors, reset, control } = useManageForm<TFormSubmitData>(memberSchema);

  const { submit, ...states } = useFormSubmit<TFormSubmitData, true>({
    url: getBecomePartnerUrl(),
    redirectPath: 'partners',
  });

  const onSubmit = (data: TFormSubmitData) => {
    const formData = {
      ...data,
      birthDate: moment(data.birthDate).format('YYYY-MM-DD'),
      amount: 1,
      ong_id: ngoId,
    };
    submit(formData);
    reset();
  };
  return (
    <>
      <Navbar />
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ResponseMsg
            {...states}
            successMsg='Please navigate to PayPal to complete the payment'
            errorMsg='Something went wrong, please try again later'
            successId='success-become-member'
            errorId='error-become-member'
          />
          <FormTitle>Membership registration</FormTitle>
          <FormSubtitle>
            We are delighted to have you as a member, but in order to complete your membership, we need some information
            from you.
          </FormSubtitle>
          <FormRow>
            <CustomInputDiv>
              <Input placeholder='Name' {...register('firstName')} />
              <ErrorMsg mt={0.4}>{errors.firstName?.message}</ErrorMsg>
            </CustomInputDiv>
            <CustomInputDiv>
              <Input placeholder='Surname' {...register('lastName')} />
              <ErrorMsg mt={0.4}>{errors.lastName?.message}</ErrorMsg>
            </CustomInputDiv>
          </FormRow>
          <FormRow>
            <CustomInputDiv>
              <Input type='number' placeholder='DNI/NIF/Passport' {...register('nif')} />
              <ErrorMsg mt={0.4}>{errors.nif?.message}</ErrorMsg>
            </CustomInputDiv>
            <CustomInputDiv>
              <Input placeholder='Phone' {...register('phone')} />
              <ErrorMsg mt={0.4}>{errors.phone?.message}</ErrorMsg>
            </CustomInputDiv>
          </FormRow>
          <FormRow>
            <CustomInputDiv>
              <Input placeholder='Email' {...register('user_email')} />
              <ErrorMsg mt={0.4}>{errors.user_email?.message}</ErrorMsg>
            </CustomInputDiv>
            <CustomInputDiv>
              <Controller
                control={control}
                name='birthDate'
                render={({ field }: any) => (
                  <CustomDatePicker
                    name='birthDate'
                    placeholderText='Birth of Date'
                    selected={field.value}
                    onChange={(date: Date) => field.onChange(date)}
                    dateFormat='yyyy-MM-dd'
                    autoComplete='off'
                  />
                )}
              />
              <ErrorMsg mt={0.4}>{errors.birthDate?.message}</ErrorMsg>
            </CustomInputDiv>
          </FormRow>
          <Input placeholder='Address (street, city and postal code)' {...register('home_address')} />
          <ErrorMsg mt={0.4}>{errors.home_address?.message}</ErrorMsg>

          <RadioQuestion>I have read and accepted the NGOs privacy policy.</RadioQuestion>
          <Radio.Group {...register('terms')}>
            <CustomRadio style={{ marginTop: '1.2rem' }} value>
              I accept
            </CustomRadio>
            <CustomRadio value={false}>
              I dont accept (in this case, we will not be able to process your membership)
            </CustomRadio>
          </Radio.Group>
          <ErrorMsg mt={0.4}>{errors.terms?.message}</ErrorMsg>

          <RadioQuestion>Would you like us to process your registration as a member of the NGO?</RadioQuestion>
          <Radio.Group {...register('membership')}>
            <CustomRadio value>Yes</CustomRadio>
            <CustomRadio value={false}>No</CustomRadio>
          </Radio.Group>
          <ErrorMsg mt={0.4}>{errors.membership?.message}</ErrorMsg>

          <Center>
            <Button type='submit'>Submit</Button>
          </Center>
        </Form>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4.2rem;
  gap: 2.4rem;
`;

const Form = styled.form`
  padding-inline: 5.2rem;
  margin-block: 3.4rem;
`;

const FormTitle = styled.h1`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
`;

const FormSubtitle = styled.p`
  color: #8c8c8c;
  letter-spacing: 1.2px;
  margin: 2.8rem 0;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 0.8rem;
`;

const RadioQuestion = styled.p`
  color: #8c8c8c;
  letter-spacing: 1.2px;
  margin-top: 1.8rem;
  margin-bottom: 0;
  font-size: 1rem;
`;

const CustomRadio = styled(Radio)`
  display: block;
  span {
    font-weight: 600;
    font-size: 0.9rem;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: ${({ theme }) => theme.primary};
  }
  .ant-radio-inner::after {
    background-color: ${({ theme }) => theme.primary} !important;
  }
`;

const CustomDatePicker = styled(DatePicker)`
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  align-self: flex-start;
  box-shadow: ${({ theme }) => theme.primary};
  box-sizing: border-box !important;
  font-family: inherit;
  overflow: visible;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  min-width: 0;
  padding: 9.5px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
  -webkit-appearance: none;
  touch-action: manipulation;
  text-overflow: ellipsis;
  width: 100%;
  margin-top: 1rem;
  padding: 0.7rem;

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.primary} 0 0 0 2px;
  }
`;
