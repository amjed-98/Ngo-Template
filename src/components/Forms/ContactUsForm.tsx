import type { ReactElement } from 'react';
import { MailFilled, MailOutlined, PhoneFilled } from '@ant-design/icons';
import { type TypeOf } from 'yup';
import styled from 'styled-components';
import { getSendContactUrl } from 'api/postApiServices';
import { useGeocoding, useFormSubmit, useAllPlatformConfig, useManageForm } from 'hooks';
import { contactSchema } from 'validation/schemas';
import { RenderIf, Footer, Map, Navbar } from 'components';
import { Button, Center, Flex, Input, Label, TextArea, ErrorMsg, ResponseMsg } from 'components/common';

type TFormSubmitData = TypeOf<typeof contactSchema>;

function ContactUsForm(): ReactElement {
  const { contact: { phone = '', email = '', address = '' } = {} } = useAllPlatformConfig();

  const { lat, lng } = useGeocoding(address);

  const { register, handleSubmit, errors, reset } = useManageForm<TFormSubmitData>(contactSchema);

  const { submit, ...states } = useFormSubmit<TFormSubmitData>({ url: getSendContactUrl() });

  const onSubmit = (data: TFormSubmitData) => {
    const formData = { ...data, ongEmail: email };
    submit(formData);
    reset();
  };

  return (
    <>
      <ResponseMsg
        {...states}
        successMsg='Your message has been sent successfully'
        errorMsg='Something went wrong, please try again'
        successId='contact-success'
        errorId='contact-error'
      />
      <Navbar />

      <RenderIf if={!!(lat && lng)}>
        <Map lat={lat} lng={lng} height={28} />
      </RenderIf>

      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>Contact us</FormTitle>

          <FormRow>
            <Flex>
              <Input placeholder='Name' {...register('name')} />
              <ErrorMsg>{errors.name?.message}</ErrorMsg>
            </Flex>

            <Flex>
              <Input placeholder='Surname' {...register('lastName')} />
              <ErrorMsg>{errors.lastName?.message}</ErrorMsg>
            </Flex>
          </FormRow>

          <Input placeholder='Email' {...register('email')} />
          <ErrorMsg>{errors.email?.message}</ErrorMsg>

          <Input placeholder='Subject' {...register('subject')} />
          <ErrorMsg>{errors.subject?.message}</ErrorMsg>

          <TextArea placeholder='Message' rows={4} {...register('message')} />

          <ErrorMsg>{errors.message?.message}</ErrorMsg>

          <Label>
            <Input w='15px' mr={0.625} type='checkbox' {...register('terms')} />
            <span>I agree to the privacy policy</span>
            <ErrorMsg>{errors.terms?.message}</ErrorMsg>
          </Label>

          <Center>
            <Button type='submit'>Send Message</Button>
          </Center>
        </Form>

        <ContactDetailsBox>
          <BoxTitle>Contact info</BoxTitle>

          <InfoBox>
            <MailOutlined />
            <InfoText>
              <TextTitle>Our office</TextTitle>
              <TextHolder>{address}</TextHolder>
            </InfoText>
          </InfoBox>

          <InfoBox>
            <PhoneFilled />
            <InfoText>
              <TextTitle>Get in touch</TextTitle>
              <TextHolder>{phone}</TextHolder>
            </InfoText>
          </InfoBox>

          <InfoBox>
            <MailFilled />
            <InfoText>
              <TextTitle>Write to us</TextTitle>
              <TextHolder>{email}</TextHolder>
            </InfoText>
          </InfoBox>
        </ContactDetailsBox>
      </Container>

      <Footer />
    </>
  );
}

export default ContactUsForm;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 9.4rem;
  margin-top: -12.4rem;
  z-index: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 4.8rem;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: white;
`;

const FormTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;
const FormRow = styled.div`
  display: flex;
  gap: 1.2rem;
`;
const ContactDetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem 1.8rem;
  background-color: ${({ theme }) => theme.primary};

  align-items: center;
  width: 370px;
  gap: 1.2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const BoxTitle = styled.h1`
  align-self: flex-start;
  font-size: 1.4rem;
  color: white;
  margin-bottom: 2.4rem;
`;

const InfoBox = styled.div`
  display: flex;
  gap: 2.2rem;
  span {
    font-size: 2.8rem;
  }
`;

const InfoText = styled.p`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const TextHolder = styled.p`
  font-size: 0.8rem;
`;
const TextTitle = styled.p`
  color: white;
  margin-bottom: 0;
`;
