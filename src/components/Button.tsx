import styled from 'styled-components';

const ReviewButton = styled.button`
  background: rgba(34, 34, 34, 0.8);
  box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.1);
  transition: 0.5s;
  &:hover {
    box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.2);
  }
  font-family: 'Poppins';
`;

export function Button({ children, ...props }: any) {
  return <ReviewButton {...props}>{children}</ReviewButton>;
}
