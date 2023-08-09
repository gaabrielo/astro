import styled from 'styled-components';

export function MainButton({ onClick, icon, children, className = null }: any) {
  const ReviewButton = styled.button`
    background: rgba(34, 34, 34, 0.8);
    box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.1);
    transition: 0.5s;
    &:hover {
      box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.2);
    }
  `;

  return (
    <ReviewButton
      className={
        className ||
        'px-4 py-2 rounded-full text-sm flex items-center gap-1 text-[#EAEBED]'
      }
      onClick={onClick}
    >
      {icon}
      {children}
    </ReviewButton>
  );
}
