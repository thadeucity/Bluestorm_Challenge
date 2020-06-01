import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import {
  Container,
  Dashboard,
  ShowRoom,
  Configurator,
  Button,
  TextButton,
} from './styles';

import blankImage from '../../assets/blank.png';

interface ReceivedImage {
  type: string;
  data: string;
}

interface ReceivedColorList {
  name: string;
  tagHex: string;
}

const socket = io('http://localhost:3332');

const ProductConfigurator: React.FC = () => {
  const [selectedPaint, setSelectedPaint] = useState('blue');
  const [selectedWheel, setSelectedWheel] = useState('orcus_silver');
  const [selectedHeadlight, setSelectedHeadlight] = useState('halogen');
  const [selectedPackage, setSelectedPackage] = useState('standart');

  const [paintImage, setPaintImage] = useState(blankImage);
  const [wheelImage, setWheelImage] = useState(blankImage);
  const [headlightImage, setHeadlightImage] = useState(blankImage);
  const [packageImage, setPackageImage] = useState(blankImage);

  const [paintColors, setPaintColors] = useState<ReceivedColorList[]>([
    { name: 'blue', tagHex: '#085db2' },
  ]);

  function changePaint(paintName: string): void {
    socket.emit('changePaint', paintName);
    setSelectedPaint(paintName);
  }

  function changePackage(packageName: string): void {
    socket.emit('changePackage', packageName);
    setSelectedPackage(packageName);
  }

  function changeWheels(wheelName: string): void {
    socket.emit('changeWheels', wheelName);
    setSelectedWheel(wheelName);
  }

  function changeHeadlight(headlightName: string): void {
    socket.emit('changeHeadlight', headlightName);
    setSelectedHeadlight(headlightName);
  }

  useEffect(() => {
    socket.on('availableColors', (colorList: ReceivedColorList[]) => {
      setPaintColors(colorList);
    });
  }, []);

  useEffect(() => {
    socket.on('receivedImage', (recImage: ReceivedImage) => {
      switch (recImage.type) {
        case 'paint':
          setPaintImage(recImage.data);
          break;
        case 'package':
          setPackageImage(recImage.data);
          break;
        case 'wheel':
          setWheelImage(recImage.data);
          break;
        case 'headlight':
          setHeadlightImage(recImage.data);
          break;
        default:
          console.log(`type ${recImage.type} does not exist`);
          break;
      }
    });
  }, []);

  return (
    <Container>
      <h1>Seven 275</h1>

      <Dashboard>
        <ShowRoom>
          <div id="product-canvas">
            <img src={paintImage} alt="Car Base" />
            <img src={wheelImage} alt="Car Wheels" />
            <img src={headlightImage} alt="Car Wheels" />
            <img src={packageImage} alt="Car Package" />
          </div>
        </ShowRoom>

        <Configurator>
          <h2>Configure your Caterham</h2>

          <h3>Paint</h3>
          <div>
            {paintColors.map((color) => (
              <Button
                key={`${color.name}`}
                type="button"
                onClick={() => changePaint(`${color.name}`)}
                tagColor={color.tagHex}
                selected={selectedPaint === color.name}
              />
            ))}
          </div>

          <h3>Package</h3>
          <div>
            <TextButton
              type="button"
              onClick={() => changePackage(`standart`)}
              selected={selectedPackage === 'standart'}
            >
              Standart
            </TextButton>
            <TextButton
              type="button"
              onClick={() => changePackage(`sport`)}
              selected={selectedPackage === 'sport'}
            >
              Sport <span>R</span>
            </TextButton>
          </div>

          <h3>Wheels</h3>
          <div>
            <TextButton
              type="button"
              onClick={() => changeWheels(`orcus_silver`)}
              selected={selectedWheel === 'orcus_silver'}
            >
              Silver
            </TextButton>
            <TextButton
              type="button"
              onClick={() => changeWheels(`orcus_white`)}
              selected={selectedWheel === 'orcus_white'}
            >
              White
            </TextButton>
            <TextButton
              type="button"
              onClick={() => changeWheels(`orcus_dark`)}
              selected={selectedWheel === 'orcus_dark'}
            >
              Dark
            </TextButton>
          </div>

          <h3>Headlights</h3>
          <div>
            <TextButton
              type="button"
              onClick={() => changeHeadlight(`halogen`)}
              selected={selectedHeadlight === 'halogen'}
            >
              Halogen
            </TextButton>
            <TextButton
              type="button"
              onClick={() => changeHeadlight(`led`)}
              selected={selectedHeadlight === 'led'}
            >
              LED
            </TextButton>
            <TextButton
              type="button"
              onClick={() => changeHeadlight(`projector`)}
              selected={selectedHeadlight === 'projector'}
            >
              Projector
            </TextButton>
          </div>
        </Configurator>
      </Dashboard>
    </Container>
  );
};

export default ProductConfigurator;
