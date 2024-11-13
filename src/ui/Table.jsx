import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  background-color: var(--color-grey-0);
  font-size: 1.4rem;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-200);
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;

  background-color: var(--color-grey-50);
  color: var(--color-grey-600);

  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  padding: 1.2rem;

  display: flex;
  justify-content: center;

  &:not(:has(*)) {
    display: none;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

// Steps to create compound component pattern
// 1. Create a context to pass props to children
const TableContext = createContext();

// 2. Create a Parent Component
// A Provider
function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

// 3. Create child components
// The Consumers

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader columns={columns} as="header" role="row">
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow columns={columns} role="row">
      {children}
    </StyledRow>
  );
}
function Body({ data, render }) {
  if (data.length === 0) return <Empty>No data to show at the moment!</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

// 4. Bind child components as properties to parent
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
