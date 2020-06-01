import React, { useMemo } from 'react';

import { Container } from './styles';

import blankImage from '../../assets/blank.png';

interface ShowRoomProps {
  images: {
    paintImage?: string;
    wheelImage?: string;
    headlightImage?: string;
    packageImage?: string;
  };
}

const ShowRoom: React.FC<ShowRoomProps> = (props) => {
  const { images } = props;

  const paintImage = useMemo(() => {
    return images.paintImage ? images.paintImage : blankImage;
  }, [images.paintImage]);

  const wheelImage = useMemo(() => {
    return images.wheelImage ? images.wheelImage : blankImage;
  }, [images.wheelImage]);

  const headlightImage = useMemo(() => {
    return images.headlightImage ? images.headlightImage : blankImage;
  }, [images.headlightImage]);

  const packageImage = useMemo(() => {
    return images.packageImage ? images.packageImage : blankImage;
  }, [images.packageImage]);

  return (
    <Container>
      <div id="product-canvas">
        <img src={paintImage} alt="Car Base" />
        <img src={wheelImage} alt="Car Wheels" />
        <img src={headlightImage} alt="Car Wheels" />
        <img src={packageImage} alt="Car Package" />
      </div>
    </Container>
  );
};

export default ShowRoom;
