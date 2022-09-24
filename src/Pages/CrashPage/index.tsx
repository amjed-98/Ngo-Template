import { Result } from 'antd'
import { type FC } from 'react'
import { useSetDocumentTitle } from '../../hooks'

const CrashPage:FC = () => {
  useSetDocumentTitle('Error')

  return (
    <Result
      status="500"
      title="500"
      subTitle="We apologize for the inconvenience. Please try again later."
      style={{ marginBlock: '3.8rem' }}
    />

  )
}

export default CrashPage
