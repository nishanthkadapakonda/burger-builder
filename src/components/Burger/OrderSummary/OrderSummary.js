import React,{Component}from 'react';
import Aux from '../../../hoc/Aux1/Aux1';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component{
	//this could be a functional component, does'nt have to be a class
	componentWillUpdate(){
		console.log("ordersum will update");
	}
  render(){
		const ingredientSummary = Object.keys(this.props.ingredients).
	   map(igKey => {
		return (<li key={igKey}>
			      <span style={{textTransform:'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
						</li>);
	    });
	  return(
			<Aux>
				<h3>Your Order </h3>
				<p>A delicious burger with the following ingredients</p>
				<ul>
                  {ingredientSummary}
				</ul>
				<p>Total Price:{this.props.price.toFixed(2)}</p>
				<p>Continue to checkout? </p>
				<Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
      </Aux>
	  );
  }
}
export default OrderSummary;