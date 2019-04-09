import styled from "styled-components";

const PanelWrapper = styled.div`
  .panel-title {
    cursor: pointer;
    color: #fff;
  }

  .panel-content {
    display: block;
    padding: 20px 10px;
  }

  .panel-content-inactive {
    display: none;
  }
`;

export default PanelWrapper;
