import styled from "styled-components";

// Be able to pass in the number of columns <Grid cols={3}>
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;
