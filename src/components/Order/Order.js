import React from 'react';
import PropTypes from 'prop-types';

import styles from './Order.css';

const order = (props) => {
    let ingredients = [];
    for (let ing in props.ingredients) {
        let ingCnt = props.ingredients[ing];
        if (ingCnt <= 0) continue;

        const ingredient = (
            <li key={`${ing}${ingCnt}`}>
                {`${ing}: ${ingCnt}`}
            </li>
        );

        ingredients.push(ingredient);
    }

    return (
        <div className={styles.Order}>
            <ul>
                {ingredients}
            </ul>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
            <p>Delivery Method: <strong>{props.delivery}</strong></p>
        </div>
    )
}

order.propTypes = {
    ingredients: PropTypes.object,
    price: PropTypes.number.isRequired,
    delivery: PropTypes.string,
}

export default order;
