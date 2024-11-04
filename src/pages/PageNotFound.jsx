import styled from "styled-components";
import Heading from "../ui/Heading";
import Button from "../ui/Button";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  padding: 4.8rem;
  text-align: center;
  flex: 0 1 96rem;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

export default function PageNotFound() {
  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">
          The page you are looking for could not be found! 😥
        </Heading>
        <Button size="large">&larr; Go back</Button>
      </Box>
    </StyledPageNotFound>
  );
}
