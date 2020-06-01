import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  text-align: center;
  padding: 0 0 16px 16px;

  #product-canvas {
    position: relative;

    img {
      width: 100%;
      border-radius: 4px;
    }

    img + img {
      position: absolute;
      left: 0;
    }
  }
`;
