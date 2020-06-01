import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;

  h1 {
    text-align: center;
    height: 100%;
    flex: 1;
  }

  a {
    color: #ddd;
  }

  .users-counter {
    position: relative;
    p {
      font-size: 12px;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: -5px;
      right: 22px;
      width: 22px;
      height: 25px;
      border-radius: 50%;
      background: #312e38;
      border: 2px solid #ddd;
      font-weight: 500;
    }
  }
  svg {
    width: 32px;
    height: 32px;
  }
`;
