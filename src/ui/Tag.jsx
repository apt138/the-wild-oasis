import styled from "styled-components";

const Tag = styled.span`
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);

  width: fit-content;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
`;

export default Tag;
