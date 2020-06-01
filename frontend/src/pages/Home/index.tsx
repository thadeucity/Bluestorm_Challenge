import React from 'react';

import { Person, PeopleAlt } from '@material-ui/icons';

import { Container, Menu } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <h1>Product Configurator Web App</h1>
      <Menu>
        <a href="/product_configurator">
          <Person />
          <p>Single User</p>
        </a>
        <a href="/public_configurator">
          <PeopleAlt />
          <p>Multiple Users</p>
        </a>
      </Menu>
    </Container>
  );
};

export default Home;
