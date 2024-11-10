import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      border: 1px solid var(--color-grey-100);
      background-color: var(--color-grey-0);
      padding: 2.4rem 1.4rem;
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}

  overflow:hidden;
  font-size: 1.6rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
