import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { useMutation } from '@tanstack/react-query'

const useMutate = <TData, TMutate>(url: string) => useMutation<AxiosResponse<TData>, AxiosError, TMutate>(
  (data) => axios.post(url, data)
)

export default useMutate
