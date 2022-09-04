import { useEffect } from 'react'
import useMutate from './useMutate'

type ReturnType = { transactionId:string; isLoading:boolean; isError:boolean }

interface IParameters<TParams> {
  params: TParams;
  url: string;
}

const useFinalizePayment = <TParams>({ params, url }:IParameters<TParams>):ReturnType => {
  const {
    mutateAsync, isError, isLoading, data
  } = useMutate<{ data:string }, TParams>(url)

  const getTransactionId = async ():Promise<void> => {
    await mutateAsync(params)
  }

  useEffect(() => {
    getTransactionId()
  }, [])

  const transactionId = data?.data.data || ''

  return { transactionId, isError, isLoading }
}

export default useFinalizePayment
