import styled from "styled-components";

const ButtonText = styled.button`
  border: none;
  background: none;
  color: var(--color-brand-600);
  text-align: center;
  font-weight: 500;
  border-radius: var(--border-radius-sm);

  transition: all 0.2s;

  &:hover,
  &:active {
    color: var(--color-brand-700);
  }
`;

export default ButtonText;
