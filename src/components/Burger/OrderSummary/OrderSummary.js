import React from 'react';

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
            <p>Continue to CheckOut?</p>
        
        </Aux>
    )
}

export default orderSummary;
