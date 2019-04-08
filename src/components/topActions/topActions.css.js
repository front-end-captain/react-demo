import styled from "styled-components";

const TopActionsWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 0;

  > li {
    display: inline-block;
    list-style: none;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    background-color: #ccc;
    text-align: center;
    line-height: 30px;
    margin: 0 10px;
    cursor: pointer;

    > svg {
      color: #fff;
    }
  }
`;

export default TopActionsWrapper;
