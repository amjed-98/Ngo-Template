import type { FC } from 'react'
import styled from 'styled-components'

const Divider: FC = () => <DividerDiv />

export default Divider

const DividerDiv = styled.div`
  width: 100vw;
  height: 11.6rem;
  background-color: ${({ theme }) => theme.primary};
`
