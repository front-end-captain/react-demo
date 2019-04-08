import styled from "styled-components";

const HomeWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .canvas-container {
    margin: 0 auto;

    > canvas {
      border-radius: 6px;
    }
  }
`;

export default HomeWrapper;
