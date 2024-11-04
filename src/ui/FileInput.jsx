import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font-family: inherit;
    cursor: pointer;
    font-weight: 500;
    border-radius: var(--border-radius-sm);
    border: none;

    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    transition: all 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

export default FileInput;
