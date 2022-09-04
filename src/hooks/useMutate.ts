import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { useMutation } from '@tanstack/react-query'

function useMutate<TData, TMutate>(url: string) {
  return useMutation<AxiosResponse<TData>, AxiosError, TMutate>((data) => axios.post(url, data))
}

export default useMutate
