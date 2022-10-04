import type { ReactElement } from 'react';
import styled from 'styled-components';
import { type TypeOf } from 'yup';
import { Button, Center, Input, TextArea, ErrorMsg, ResponseMsg } from 'components/common';
import { useFormSubmit, useManageForm, useNgoConfig } from 'hooks';
import { getSendContactEventUrl } from 'api/postApiServices';
import { contactEventSchema } from 'validation/schemas';

interface IProps {
  id: string;
}

type TFormSubmitData = TypeOf<typeof contactEventSchema>;

export function ContactEventForm({ id }: IProps): ReactElement {
  const { ngoId = '' } = useNgoConfig();

  const { register, handleSubmit, errors, reset } = useManageForm<TFormSubmitData>(contactEventSchema);

  const { submit, ...states } = useFormSubmit<TFormSubmitData>({ url: getSendContactEventUrl(ngoId, id) });

  const onSubmit = (data: TFormSubmitData) => {
    submit(data);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ResponseMsg
        {...states}
        successMsg='Message sent successfully'
        errorMsg='Error sending message'
        successId={`contact-event-form-${id}`}
        errorId={`contact-event-form-${id}`}
      />
      <Input placeholder='Name' {...register('name')} />
      <ErrorMsg>{errors?.name?.message} </ErrorMsg>
      <Input mt={0} placeholder='Email' {...register('email')} />
      <ErrorMsg>{errors?.email?.message}</ErrorMsg>
      <TextArea placeholder='Message' rows={4} {...register('text')} />
      <ErrorMsg>{errors?.text?.message}</ErrorMsg>

      <Center>
        <Button px={2.4} type='submit'>
          Send
        </Button>
      </Center>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
`;
