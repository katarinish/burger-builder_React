import React from 'react';

import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingredientsSummary = [];
    const ingredients = props.ingredients;
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
            <p><strong>Total price is: {props.price.toFixed(2)}</strong></p>
            <p>Continue to CheckOut?</p>
            <Button 
                type='Danger'
                click={props.handleRejectOrder}>CANCEL</Button>
            <Button 
                type='Success'
                click={props.handlePurchaseOrder}>CONTINUE</Button>
        
        </Aux>
    )
}

export default orderSummary;
