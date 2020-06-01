import styled, {css} from 'styled-components/native';
import {lighten} from 'polished';

interface ButtonProps {
  tagColor: string;
  selected?: boolean;
}

export const Container = styled.ScrollView`
  height: 100%;
`;

export const TopBar = styled.View`
  background-color: #28252e;
  padding: 8px;
  elevation: 4;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  flex: 1;
  margin-left: -24px;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  color: #ff9900;
`;

export const Showroom = styled.View`
  position: relative;
  width: 100%;
  height: 200px;
`;

export const SubTitle = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  background-color: #28252e;
  color: #ccc;

  padding: 8px;
`;

export const Configurator = styled.View`
  padding: 16px;
`;

export const Category = styled.Text`
  color: #ccc;
  font-size: 20px;
`;

export const PaintSelector = styled.View`
  margin-top: 16px;
  margin-bottom: 8px;
  padding-bottom: 32px;
  border-bottom-color: #444;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Paint = styled.View<ButtonProps>`
  width: 50px;
  height: 50px;
  margin: 4px;
  border-radius: 16px;

  background-color: ${(props) => props.tagColor};
`;

export const SelectorList = styled.View`
  margin-top: 16px;
  margin-bottom: 8px;
  padding-bottom: 32px;
  border-bottom-color: #444;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const Package = styled.Text`
  padding: 16px 32px;
  font-size: 18px;
  border-radius: 16px;
  font-weight: bold;
  background-color: #413d4a;
  color: #ccc;
`;
