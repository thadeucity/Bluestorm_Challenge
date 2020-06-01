import styled from 'styled-components';
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

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 16px 16px 32px;

  a {
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 200px;
    align-items: center;
    justify-content: center;
    margin: 16px;
    background: ${lighten(0.08, '#312e38')};
    border-radius: 8px;

    color: #ccc;
    text-decoration: none;

    svg {
      width: 50px;
      height: 50px;
    }
  }
`;
