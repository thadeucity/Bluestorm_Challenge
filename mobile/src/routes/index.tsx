import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProductConfigurator from '../pages/ProductConfigurator';
import Initial from '../pages/Initial';

const Base = createStackNavigator();

const BaseRoutes: React.FC = () => (
  <Base.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#312e38'},
    }}>
    <Base.Screen name="ProductConfigurator" component={ProductConfigurator} />
    <Base.Screen name="Initial" component={Initial} />
  </Base.Navigator>
);

export default BaseRoutes;
