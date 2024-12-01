import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";
import { HiChevronRight } from "react-icons/hi2";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  border: none;
  background-color: ${(props) =>
    props.active ? "var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? "var(--color-brand-50)" : "inherit")};
  padding: 0.6rem 1.2rem;
  border-radius: var(--border-radius-sm);
  font-size: 1.4rem;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

// switching to global constansts
// const PAGE_SIZE = 10;

export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const curPageString = searchParams.get("page");
  const curPage = curPageString ? Number(curPageString) : 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = curPage === pageCount ? curPage : curPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function previousPage() {
    const prev = curPage === 1 ? curPage : curPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(curPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>{curPage === pageCount ? count : curPage * PAGE_SIZE}</span> of{" "}
        <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton onClick={previousPage} disabled={curPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton onClick={nextPage} disabled={curPage === pageCount}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}
