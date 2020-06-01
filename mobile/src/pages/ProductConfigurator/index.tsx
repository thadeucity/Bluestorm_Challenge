import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import io from 'socket.io-client';

import Icon from 'react-native-vector-icons/Feather';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Container,
  TopBar,
  Title,
  Showroom,
  SubTitle,
  Configurator,
  Category,
  PaintSelector,
  Paint,
  SelectorList,
  Package,
} from './styles';

interface ReceivedImage {
  type: string;
  data: string;
}

const socket = io.connect('http://localhost:3332', {
  forceNode: true,
});

const paintColors = [
  {name: 'blue', tagHex: '#085db2'},
  {name: 'black', tagHex: '#222222'},
  {name: 'green', tagHex: '#0bb40d'},
  {name: 'purple', tagHex: '#4a16c7'},
  {name: 'red', tagHex: '#cd0e1a'},
  {name: 'yellow', tagHex: '#c66c0d'},
];

const ProductConfigurator: React.FC = () => {
  const [paintImage, setPaintImage] = useState('../../assets/blank.png');
  const [packageImage, setPackageImage] = useState('../../assets/blank.png');

  function changePaint(paintName: string): void {
    socket.emit('changePaint', paintName);
  }

  function changePackage(packageName: string): void {
    socket.emit('changePackage', packageName);
  }

  useEffect(() => {
    socket.on('receivedImage', (recImage: ReceivedImage) => {
      switch (recImage.type) {
        case 'paint':
          setPaintImage(recImage.data);
          break;
        case 'package':
          setPackageImage(recImage.data);
          break;
        default:
          console.log(`type ${recImage.type} does not exist`);
          break;
      }
    });
  }, []);

  return (
    <Container>
      <TopBar>
        <Icon name="arrow-left" size={24} color="#ff9900" />
        <Title>Seven 275</Title>
      </TopBar>

      <Showroom>
        <Image
          source={{uri: paintImage}}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />
        <Image
          source={{uri: packageImage}}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 2,
          }}
        />
      </Showroom>

      <SubTitle>Configure your Caterham</SubTitle>

      <Configurator>
        <Category>Paint</Category>
        <PaintSelector>
          {paintColors.map((color) => (
            <TouchableOpacity
              key={color.name}
              onPress={() => changePaint(color.name)}>
              <Paint tagColor={color.tagHex} />
            </TouchableOpacity>
          ))}
        </PaintSelector>

        <Category>Package</Category>

        <SelectorList>
          <TouchableOpacity onPress={() => changePackage('standart')}>
            <Package>Standart</Package>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => changePackage('sport')}>
            <Package>Sport R</Package>
          </TouchableOpacity>
        </SelectorList>
      </Configurator>
    </Container>
  );
};

export default ProductConfigurator;
