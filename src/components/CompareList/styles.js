import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;

  display: flex;
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      width: 50px;
    }

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n-1) {
        background: #f5f5f5;
      }
    }
  }

  button {
    width: 200px;
    height: 45px;
    margin: 10px auto;
    background: transparent;
    background-color: #f25;
    border: 0;
    border-radius: 10px;
    color: #f5f5f4;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background-color: #fff;
      color: #f25;
      border: 2px solid #f25;
    }
  }
`;
