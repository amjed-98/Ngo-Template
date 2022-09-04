import styled from 'styled-components'
import { IErrorMsg } from '../../types/interfaces'

const ErrorMsg = styled.p<IErrorMsg>`
  color: red;
  margin-bottom: 0;
  margin-top: ${({ mt }) => mt && `${mt}rem`};
  align-self: ${({ align }) => align && align};
`

export default ErrorMsg
