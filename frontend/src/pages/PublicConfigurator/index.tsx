import React, { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import { PeopleAlt } from '@material-ui/icons';

import ShowRoom from '../../components/ShowRoom';
import Header from '../../components/Header';

import {
  Container,
  Dashboard,
  Configurator,
  Button,
  TextButton,
} from './styles';

interface ReceivedImage {
  type: string;
  data: string;
  name: string;
}

interface ReceivedColorList {
  name: string;
  tagHex: string;
}

const socket = io(`http://localhost:3332/public`);

const ProductConfigurator: React.FC = () => {
  const [selectedPaint, setSelectedPaint] = useState('blue');
  const [selectedWheel, setSelectedWheel] = useState('orcus_silver');
  const [selectedHeadlight, setSelectedHeadlight] = useState('halogen');
  const [selectedPackage, setSelectedPackage] = useState('standart');

  const [paintImage, setPaintImage] = useState('');
  const [wheelImage, setWheelImage] = useState('');
  const [headlightImage, setHeadlightImage] = useState('');
  const [packageImage, setPackageImage] = useState('');

  const [paintColors, setPaintColors] = useState<ReceivedColorList[]>([
    { name: 'blue', tagHex: '#085db2' },
  ]);

  const [userNumber, setUserNumber] = useState(1);

  const changePaint = useCallback((paintName: string): void => {
    socket.emit('changePaint', paintName);
  }, []);

  const changePackage = useCallback((packageName: string): void => {
    socket.emit('changePackage', packageName);
  }, []);

  const changeWheels = useCallback((wheelName: string): void => {
    socket.emit('changeWheels', wheelName);
  }, []);

  const changeHeadlight = useCallback((headlightName: string): void => {
    socket.emit('changeHeadlight', headlightName);
  }, []);

  useEffect(() => {
    socket.on('availableColors', (colorList: ReceivedColorList[]) => {
      setPaintColors(colorList);
    });
  }, []);

  useEffect(() => {
    socket.on('connectedUsers', (numberOfUsers: number) => {
      setUserNumber(numberOfUsers);
    });
  }, []);

  useEffect(() => {
    socket.on('receivedImage', (recImage: ReceivedImage) => {
      switch (recImage.type) {
        case 'paint':
          setPaintImage(recImage.data);
          setSelectedPaint(recImage.name);
          break;
        case 'package':
          setPackageImage(recImage.data);
          setSelectedPackage(recImage.name);
          break;
        case 'wheel':
          setWheelImage(recImage.data);
          setSelectedWheel(recImage.name);
          break;
        case 'headlight':
          setHeadlightImage(recImage.data);
          setSelectedHeadlight(recImage.name);
          break;
        default:
          console.log(`type ${recImage.type} does not exist`);
          break;
      }
    });
  }, []);

  return (
    <Container>
      <Header title="Seven 275" users={userNumber} icon={PeopleAlt} />

      <Dashboard>
        <ShowRoom
          images={{ paintImage, wheelImage, headlightImage, packageImage }}
        />

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
