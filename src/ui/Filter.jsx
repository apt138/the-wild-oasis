import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  background-color: var(--color-grey-0);
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);

  border: 1px solid var(--color-grey-100);
  box-shadow: var(--shadow-sm);

  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  border: none;
  background-color: var(--color-grey-0);
  padding: 0.4rem 0.8rem;
  border-radius: var(--border-radius-sm);

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  font-weight: 500;
  font-size: 1.4rem;

  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ field, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(value) {
    searchParams.set(field, value);
    setSearchParams(searchParams);
  }
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={
            (searchParams.get(field) || options.at(0).value) === option.value
          }
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
