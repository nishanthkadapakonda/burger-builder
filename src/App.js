import React, { Component } from 'react';
import {Route,Switch,Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import NotFound from './components/NotFound';
class App extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Layout>
          <Switch>
            {/* <Route path="/checkout"  render={() => (<Redirect to="/"/>)}/> */}
            <Route path="/checkout"  component={Checkout}/>
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="*"  component={NotFound} />
          </Switch>
        </Layout>  
      </div>
    );
  }
}

export default App;
