import styled, { css } from 'styled-components';
import { lighten } from 'polished';

interface TextButtonProps {
  selected?: boolean;
}

interface ButtonProps {
  tagColor: string;
  selected?: boolean;
}

export const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 64px auto;
  align-items: flex-start;
  background: #312e38;
  border-radius: 8px;

  color: #ddd;

  h1 {
    width: 100%;
    text-align: center;
    display: inline-block;
    margin: 16px 0;
  }
`;

export const Dashboard = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
`;

export const ShowRoom = styled.div`
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

export const Configurator = styled.div`
  padding: 0 24px;

  h2 {
    font-weight: 500;
    font-size: 18px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  h3 {
    border-top: 1px solid ${lighten(0.08, '#312e38')};
    padding-top: 8px;
    font-size: 16px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  h3 + h3 {
    margin-top: 8px;
  }

  div {
    margin-bottom: 8px;
  }

  .paint-colors {
    padding: 0 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  button {
    border-radius: 8px;
  }

  button + button {
    margin-left: 8px;
  }
`;

export const Button = styled.button<ButtonProps>`
  width: 24px;
  height: 24px;

  border: 2px solid #312e38;

${(props) =>
  props.selected &&
  css`
    border: 2px solid #ff9900;
  `}

  background: ${(props) => props.tagColor};
  ${(props) =>
    css`
      background: linear-gradient(
        315deg,
        ${props.tagColor} 0%,
        ${props.tagColor} 50%,
        ${lighten(0.5, props.tagColor)} 100%
      );
    `}
`;

export const TextButton = styled.button<TextButtonProps>`
  font-weight: 500;
  color: #999;

  ${(props) =>
    props.selected &&
    css`
      color: #ff9900;
    `}

  padding: 4px 12px;
  border: 0;

  background: ${lighten(0.08, '#312e38')};

  span {
    color: red;
  }
`;
