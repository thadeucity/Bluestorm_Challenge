import React from 'react';
import { ArrowBack } from '@material-ui/icons';

import { Container } from './styles';

interface ShowRoomProps {
  title: string;
  icon: React.ComponentType;
  users?: number;
}

const ShowRoom: React.FC<ShowRoomProps> = ({ title, icon: Icon, users }) => {
  return (
    <Container>
      <a href="/">
        <ArrowBack />
      </a>
      <h1>{title}</h1>
      <div className="users-counter">
        <Icon />
        {users && <p>{users}</p>}
      </div>
    </Container>
  );
};

export default ShowRoom;
