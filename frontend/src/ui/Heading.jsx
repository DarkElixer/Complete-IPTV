import styled, { css } from "styled-components";

const styles = {
  main: css`
    font-weight: 800;
    background-image: url("https://gradient.page/samples/vibrant-vista/vibrant-vista-004.jpg"),
      linear-gradient(to top left, #5614b0, #dbd65c);
    color: transparent;
    background-clip: text;
    background-size: contain;
  `,
  secondary: css`
    font-weight: 600;
    background-image: url("https://gradient.page/samples/vibrant-vista/vibrant-vista-002.jpg"),
      linear-gradient(to top left, #5614b0, #dbd65c);
    color: transparent;
    background-clip: text;
    background-size: contain;
    top: 10rem;
    z-index: 10;
    @media (max-width: 500px) {
      font-size: 2rem;
    }
    @media (max-width: 400px) {
      font-size: 1.5rem;
    }
  `,
  error: css`
    color: white;
    font-size: 4dvh;
    font-weight: 100;
    text-align: center;
  `,
};
const variation = {
  large: css`
    font-size: 8dvw;
    @media (max-width: 500px) {
      font-size: 4dvw;
    }
  `,
  medium: css`
    font-size: 8dvw;
    @media (max-width: 500px) {
      font-size: 6rem;
    }
  `,
};
export const Heading = styled.h1`
  margin: 0 1rem;
  display: inline-block;
  line-height: 1.6;
  background-color: black;
  z-index: -1000;
  ${(prop) => styles[prop.$type]}
  ${(prop) => variation[prop.$variation]}
`;
