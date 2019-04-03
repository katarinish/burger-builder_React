import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux/Aux';

class OrderSummary extends Component {

    render() {
        const ingredientsSummary = [];
        const ingredients = this.props.ingredients;
        for (let ing in ingredients) {
            const ingredient = (
                <li key={ing}>
                    <span style={{textTransform: 'capitalize'}}>{ing}: {ingredients[ing]}</span>
                </li>
            );

            ingredientsSummary.push(ingredient);
        }

        return (
            <Aux>
                <h3>Your order</h3>
                <p>Delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total price is: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to CheckOut?</p>
                <Button 
                    type='Danger'
                    click={this.props.handleRejectOrder}>CANCEL</Button>
                <Button 
                    type='Success'
                    click={this.props.handlePurchaseOrder}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default withRouter(OrderSummary);
