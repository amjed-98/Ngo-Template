import type { AnyObjectSchema } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import type {
  UseFormHandleSubmit,
  UseFormRegister,
  FieldValues,
  FieldErrorsImpl,
  UseFormReset,
  Control,
} from 'react-hook-form'

type ReturnType<TFormSubmitData extends FieldValues> = {
  register: UseFormRegister<TFormSubmitData>;
  handleSubmit: UseFormHandleSubmit<TFormSubmitData>;
  errors: FieldErrorsImpl<TFormSubmitData>;
  reset: UseFormReset<TFormSubmitData>;
  control: Control<TFormSubmitData>;
};

const useManageForm = <TFormSubmitData extends FieldValues>(schema: AnyObjectSchema): ReturnType<TFormSubmitData> => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TFormSubmitData>({ resolver: yupResolver(schema) })

  return {
    register,
    handleSubmit,
    errors,
    reset,
    control,
  }
}

export default useManageForm
