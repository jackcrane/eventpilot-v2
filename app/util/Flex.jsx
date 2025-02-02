import styled from "styled-components";

export const Grow = styled.div`
  flex-grow: 1;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify};
  gap: ${({ gap }) => gap * 8 || 0}px;
  flex-wrap: ${({ wrap }) => (wrap ? "wrap" : "nowrap")};
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
  gap: ${({ gap }) => gap * 8 || 0}px;
`;
