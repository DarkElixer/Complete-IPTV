import { Link } from "react-router-dom";
import styled from "styled-components";

export const Box = styled(Link)`
  display: inline-block;
  position: relative;
  margin: 2rem;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: scale 0.5s ease-in-out;
  color: white;
  &:hover {
    scale: 1.1;
  }
  & img {
    position: relative;
    width: 100%;
    height: 100%;
    mask-image: linear-gradient(black, transparent 90%);
    background: rgba(255, 255, 255, 0.1);
    border-radius: inherit;
    z-index: 100;
  }
  & p {
    position: absolute;
    width: 100%;
    bottom: 1rem;
    text-align: center;
    padding: 1rem;
    font-size: 2.5vh;
  }
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;
