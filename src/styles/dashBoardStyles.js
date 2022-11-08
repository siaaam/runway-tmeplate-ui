import styled from 'styled-components';

export const FlexWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

export const MenuBar = styled.div`
  flex: 1;
  background: white;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  height: 80vh;

  ul {
    li {
      padding: 5px 10px;
      font-weight: 600;

      &:hover {
        background: #ddd;
      }

      a {
        color: #000;
        width: 100%;
      }
    }
  }
`;

export const Content = styled.div`
  flex: 2;

  table {
    border-radius: 0;
    &:hover {
      background-color: #ddd;
      color: black;
    }
  }
`;
