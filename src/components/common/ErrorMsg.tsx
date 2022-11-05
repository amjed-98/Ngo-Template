import styled from 'styled-components';

type Props = {
  mt?: TMarginTop;
  align?: TAlignSelf;
};

const ErrorMsg = styled.p<Props>`
  color: red;
  margin-bottom: 0;
  margin-top: ${({ mt }) => mt && `${mt}rem`};
  align-self: ${({ align }) => align && align};
`;

export default ErrorMsg;
