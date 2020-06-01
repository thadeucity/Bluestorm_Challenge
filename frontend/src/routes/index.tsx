import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import ProductConfigurator from '../pages/ProductConfigurator';
import PublicConfigurator from '../pages/PublicConfigurator';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/product_configurator" component={ProductConfigurator} />
    <Route path="/public_configurator" component={PublicConfigurator} />
  </Switch>
);

export default Routes;
