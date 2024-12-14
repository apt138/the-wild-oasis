import styled from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  padding: 0.8rem 0;
`;

const Label = styled.span`
  font-weight: 500;

  display: flex;
  align-items: center;
  gap: 1.8rem;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

export default function DataItem({ children, icon, label }) {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
}
