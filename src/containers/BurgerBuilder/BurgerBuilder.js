import React, {Component} from 'react';

import {connect } from 'react-redux';
import Aux from '../../hoc/Aux1/Aux1';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/witherrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

// const INGREDIENT_PRICES = {
//   salad: 0.5,
//   cheese:0.4,
//   meat: 1.3,
//   bacon: 0.7   
// };
class BurgerBuilder extends Component{
 
  state = {
    //  ingredients:{
    //    salad: 0,
    //    bacon: 0,
    //    cheese:0,
    //    meat: 0
    //  },
    //  ingredients : null,
    //  totalPrice: 4,
     purchasable: false,
     purchasing:false,
     loading: false,
     error: false

  }
  //getting dynamic burger from db on load 
  componentDidMount(){
    // axios.get('https://react-my-burger-7aa81.firebaseio.com/ingredients.json').then(response =>{
    //   this.setState({ingredients: response.data});
    // }).catch(error => {
    //   this.setState({error: true})
    // })
  }
  updatePurchaseState(ingredients){
    //  ingredients = {...this.state.ingredients};
    const sum = Object.keys(ingredients)
       .map(igKey =>{
          return ingredients[igKey]
       }).reduce((sum,el)=>{
          return  sum + el
       },0);
       return sum > 0;
       //this.setState({purchasable: sum>0})
  }
  // addIngredientHandler = (type) =>{
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCounted = oldCount+1;
  //   const updatedIngredients = {...this.state.ingredients};
  //   updatedIngredients[type] = updatedCounted ;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition; 
  //   this.setState({totalPrice: newPrice,ingredients:updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler =(type) =>{
  //   const oldCount = this.state.ingredients[type];
  //   if(oldCount <= 0){
  //     return;
  //   }
  //   const updatedCounted = oldCount-1;
  //   const updatedIngredients = {...this.state.ingredients};
  //   updatedIngredients[type] = updatedCounted ;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction; 
  //   this.setState({totalPrice: newPrice,ingredients:updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);
  // }
  purchaseHandler= () => {
    this.setState({purchasing:true});
  }
  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }
  purchaseContinueHandler = () => {
    //alert('You continue!');
    // const queryParams = [];
    // for(let i in this.state.ingredients){
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push('price='+ this.state.totalPrice);
    // const queryString = queryParams.join('&');
    // this.props.history.push(
    //   {
    //     pathname: '/checkout',
    //     search: '?' + queryString
    //   }
    // );
    console.log(this.props)
    this.props.history.push('/checkout');
  }
  
  render(){
     const disabledInfo = {
      //  ...this.state.ingredients
      ...this.props.ings
     }
     for(let key in disabledInfo){
       disabledInfo[key] = disabledInfo[key] <= 0
     }

     let orderSummary = null
      let burger = this.state.error? <p>Ingredients cannot be Loaded</p>:<Spinner/>
      if(this.props.ings){
        //change this.state.ingredients to this.state.ings as we are using redux state which is mapped to ings
        // name in mapStateToProps method below
        burger = (
          <Aux>
            <Burger ingredients={this.props.ings}/>
            <BuildControls 
              ingredientAdded = {this.props.onIngredientAdded}
              ingredientRemoved ={this.props.onIngredientRemoved}
              disabled = {disabledInfo}
              purchasable = {this.updatePurchaseState(this.props.ings)}
              ordered={this.purchaseHandler}
              price={this.props.price}
            />
          </Aux>
         );
         orderSummary = <OrderSummary 
                        ingredients={this.props.ings}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.props.price}/>
      }
      if(this.state.loading){
        orderSummary = <Spinner/>
      }
     
      return(
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
              {orderSummary}
            </Modal> 
            {burger}
        </Aux>  
      );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));